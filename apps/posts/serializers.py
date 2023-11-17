from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Post


CustomUser = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            "pk",
            "username",
        )
        model = CustomUser


class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(many=False, read_only=True)
    
    class Meta:
        model = Post
        fields = (
            "pk",
            "author",
            "body",
            "created_at"
        )
