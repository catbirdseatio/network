from rest_framework import views, generics, permissions
from rest_framework.response import Response
from django_filters import rest_framework as filters

from .models import Post
from .permissions import IsAuthorOrReadOnly
from .serializers import PostSerializer, UserSerializer
from .filters import PostFilter


class CurrentUserDetail(views.APIView):
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class PostList(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = Post.objects.select_related("author").all()
    serializer_class = PostSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = PostFilter

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = Post.objects.select_related("author").all()
    serializer_class = PostSerializer
