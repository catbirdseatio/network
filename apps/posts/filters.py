import django_filters

from .models import Post


class PostFilter(django_filters.FilterSet):
    author_username = django_filters.CharFilter(
        field_name='author__username',
        lookup_expr="icontains"
    )
    
    class Meta:
        model = Post
        fields = ['author']
