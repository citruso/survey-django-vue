from django.db.models import fields
from rest_framework import serializers

from .models import Answer
from .models import Slide
from .models import Poll
from .models import User


class AnswerSerializer(serializers.ModelSerializer):
  class Meta:
    model = Answer
    exclude = ('id',)


class PollSerializer(serializers.ModelSerializer):
  class Meta:
    model = Poll
    fields = '__all__'


class SlideSerializer(serializers.ModelSerializer):
  class Meta:
    model = Slide
    exclude = ('id',)


class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = '__all__'

  def validate_password(self, password):
    if self.data['password']:
      try:
        assert password == self.data['password'], 'Invalid password'
      except AssertionError:
        return False
    return password