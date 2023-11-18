from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Post


CustomUser = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    is_authenticated = serializers.SerializerMethodField(read_only=True)

    class Meta:
        fields = ("pk", "username", "is_authenticated",)
        model = CustomUser

    def get_is_authenticated(self, obj):
        """Determine if the user is authenticated. The obj is the user passed by the request."""
        return obj.is_anonymous == False


class UserProfileSerializer(serializers.ModelSerializer):
    follows = serializers.SerializerMethodField(read_only=True)
    following = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        fields = ("pk", "username", "follows", "following")
        model = CustomUser
    
    def get_follows(self, obj):
        return obj.count_follows()
    
    def get_following(self, obj):
        return obj.count_following()



class PostSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField(read_only=True)
    is_author = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Post
        fields = ("pk", "author", "body", "created_at", "is_author")

    def get_author(self, obj):
        return obj.author.username

    def get_is_author(self, obj):
        return obj.author == self.context.get("request").user
