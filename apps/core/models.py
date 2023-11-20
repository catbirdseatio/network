from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    followers = models.ManyToManyField("self", related_name="following", symmetrical=False, blank=True)

    def __str__(self):
        return self.username
    
    def count_followers(self):
        return self.followers.count()
    
    def count_following(self):
        return self.following.count()
    
    def follow_author(self, author):
        self.followers.add(author)
    
    def unfollow_author(self, author):
        self.followers.remove(author)
    