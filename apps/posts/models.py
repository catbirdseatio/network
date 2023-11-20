from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models


class Post(models.Model):
    body = models.TextField()
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="posts")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        if len(self.body) > 25:
            return f"{self.body[:25]}..."
        return self.body

    def clean(self):
        if len(self.body) > 128:
            raise ValidationError("Post cannot exceed 128 characters.")
