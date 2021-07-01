from django.urls import path

from .views import Register
from .views import Login
from .views import CreatePoll
from .views import GetPoll
from .views import GetPolls
from .views import DeletePoll
from .views import UpdateUser
from .views import CreateAnswer

urlpatterns = [
  path('polls/create', CreatePoll.as_view()),
  path('polls/all', GetPolls.as_view()),
  path('polls/<int:id>', GetPoll.as_view()),
  path('polls/<int:id>/delete', DeletePoll.as_view()),
  path('answers/create', CreateAnswer.as_view()),
  path('users/update', UpdateUser.as_view()),
  path('users/login', Login.as_view()),
  path('users/register', Register.as_view()),
]