from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    follows = models.ManyToManyField("self", related_name="following", symmetrical=False, blank=True)

    def __str__(self):
        return self.username
    
    def count_follows(self):
        return self.follows.count()
    
    def count_following(self):
        return self.following.count()
    
    def follow_author(self, author):
        self.follows.add(author)
    
    def unfollow_author(self, author):
        self.follows.remove(author)
    