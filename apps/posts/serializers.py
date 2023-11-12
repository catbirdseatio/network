from rest_framework import serializers

from .models import Post


class PostSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        fields = (
            "pk",
            "author",
            "body",
            "created_at"
        )

    def get_author(self, obj):
        return obj.author.username