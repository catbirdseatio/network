from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Post


CustomUser = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    is_authenticated = serializers.SerializerMethodField(read_only=True)

    class Meta:
        fields = (
            "pk",
            "username",
            "is_authenticated",
        )
        model = CustomUser

    def get_is_authenticated(self, obj):
        """Determine if the user is authenticated. The obj is the user passed by the request."""
        return obj.is_anonymous == False


class UserProfileSerializer(serializers.ModelSerializer):
    followers = serializers.SerializerMethodField(read_only=True)
    following = serializers.SerializerMethodField(read_only=True)
    is_following = serializers.SerializerMethodField(read_only=True)

    class Meta:
        fields = ("pk", "username", "followers", "following", "is_following")
        model = CustomUser

    def get_followers(self, obj):
        return obj.count_followers()

    def get_following(self, obj):
        return obj.count_following()

    def get_is_following(self, obj):
        user = self.context.get("request").user
        if user.is_authenticated:
            return obj.followers.filter(pk=user.pk).exists()
        return False


class PostSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField(read_only=True)
    is_author = serializers.SerializerMethodField(read_only=True)
    is_liked = serializers.SerializerMethodField(read_only=True)
    like_count = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Post
        fields = ("pk", "author", "body", "created_at", "is_author", "is_liked", "like_count")

    def get_author(self, obj):
        return obj.author.username

    def get_is_author(self, obj):
        return obj.author == self.context.get("request").user

    def get_like_count(self, obj):
        print(obj.like_count)
        return obj.like_count()
    
    def get_is_liked(self, obj):
        user = self.context.get("request").user
        if user.is_authenticated:
            return user.likes.filter(pk=obj.pk).exists()
        return False