from django.db import models

class Poll(models.Model):
  name = models.CharField(max_length=100)
  desc = models.CharField(max_length=500)
  time = models.DateTimeField(auto_now_add=True)


class Slide(models.Model):
  poll_id = models.ForeignKey('Poll', on_delete=models.CASCADE)
  type = models.CharField(max_length=30)
  question = models.CharField(max_length=100)
  choices = models.JSONField(default=list)
  answers = models.JSONField(default=list)
  answerText = models.CharField(max_length=500)


class User(models.Model):
  username = models.CharField(max_length=16)
  password = models.CharField(max_length=64)
  is_admin = models.BooleanField()
  completed = models.JSONField(default=list)
  favs = models.JSONField(default=list)


class Answer(models.Model):
  user_id = models.ForeignKey('User', on_delete=models.CASCADE)
  poll_id = models.ForeignKey('Poll', on_delete=models.CASCADE)
  answers = models.JSONField(default=list)