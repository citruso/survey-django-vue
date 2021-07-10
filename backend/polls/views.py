from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import SlideSerializer
from .serializers import PollSerializer
from .serializers import UserSerializer

from .models import Answer
from .models import Slide
from .models import Poll
from .models import User


class GetPolls(APIView):
  def get(self, request):
    pollSet = Poll.objects.all()
    return Response(PollSerializer(pollSet, many=True).data)


class GetPoll(APIView):
  def post(self, request, id):
    data = request.data

    try:
      poll = Poll.objects.get(id=int(data['poll_id']))
    except (ValueError, Poll.DoesNotExist):
      return Response(status=404)

    user = User.objects.get(id=int(data['user_id']))
    result = PollSerializer(poll).data

    if poll.id in user.completed:
      result['slides'] = Answer.objects.get(
        poll_id=data['poll_id'],
        user_id=data['user_id']
      ).answers
    else:
      result['slides'] = []
      slidesSet = Slide.objects.filter(poll_id=data['poll_id'])

      for slide in slidesSet:
        result['slides'].append(SlideSerializer(slide).data)

    return Response(result)


class CreatePoll(APIView):
  def post(self, request):
    data = request.data

    poll = Poll(
      name=data['name'],
      desc=data['desc']
    )
    poll.save()

    slides = data['slides']
    for slideData in slides:
      slide = Slide(
        poll_id=poll,
        **slideData
      )
      slide.save()

    return Response(status=200)


class DeletePoll(APIView):
  def delete(self, request, id):
    poll = Poll.objects.get(id=id)
    slides = Slide.objects.filter(poll_id=id)
    answers = Answer.objects.filter(poll_id=id)

    for slide in slides:
      slide.delete()
    for answer in answers:
      answer.delete()

    poll.delete()

    return Response(status=200)


class CreateAnswer(APIView):
  def post(self, request):
    data = request.data
    user = User.objects.get(id=data['user_id'])
    poll = Poll.objects.get(id=int(data['poll_id']))

    Answer(
      user_id=user,
      poll_id=poll,
      answers=data['answers']
    ).save()

    return Response(status=200)


class UpdateUser(APIView):
  def post(self, request):
    data = request.data
    user = User.objects.get(username=data['username'])

    user.completed = data['completed']
    user.favs = data['favs']
    user.save()

    return Response(status=200)


class Register(APIView):
  def post(self, request):
    data = request.data

    try:
      User.objects.get(username=data['username'])
    except User.DoesNotExist:
      pass
    else:
      return Response('User is already exist', status=400)

    user = User(
      username=data['username'],
      password=data['password'],
      is_admin=True if data['username'] == 'admin' else False
    )

    user.save()

    return Response(UserSerializer(user).data)


class Login(APIView):
  def post(self, request):
    data = request.data

    try:
      user = User.objects.get(username=data['username'])
    except User.DoesNotExist:
      return Response('User does not exist', status=404)

    serializer = UserSerializer(user)

    if serializer.validate_password(data['password']):
      return Response(serializer.data)
    else:
      return Response('Invalid password', status=403)