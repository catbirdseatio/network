from django.contrib.auth import get_user_model
import django_filters

from .models import Post


User = get_user_model()


class PostFilter(django_filters.FilterSet):
    author_username = django_filters.CharFilter(
        field_name="author__username", lookup_expr="contains"
    )

    class Meta:
        model = Post
        fields = ["author"]
