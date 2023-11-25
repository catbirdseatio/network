from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import views, generics, permissions, exceptions, status
from rest_framework.response import Response
from django_filters import rest_framework as filters

from .models import Post
from .permissions import IsAuthorOrReadOnly
from .serializers import PostSerializer, UserSerializer, UserProfileSerializer
from .filters import PostFilter

User = get_user_model()


class CurrentUserDetail(views.APIView):
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class UserProfileDetail(generics.RetrieveAPIView):
    lookup_field = "username"
    serializer_class = UserProfileSerializer

    def get_queryset(self):
        username = self.kwargs["username"]
        model = User.objects.filter(username=username)
        return model


class PostList(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = Post.objects.select_related("author").prefetch_related("likes").all()
    serializer_class = PostSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = PostFilter

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class FeedList(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = PostSerializer

    def get_queryset(self):
        user = self.request.user
        following = user.following.values_list("pk", flat=True)
        return Post.objects.select_related("author").prefetch_related("likes").filter(author_id__in=following)


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = Post.objects.select_related("author").prefetch_related("likes").all()
    serializer_class = PostSerializer


class FollowUserView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def put(self, request, username):
        author = get_object_or_404(User, username=username)
        user = request.user

        if author.pk == user.pk:
            return Response(
                {"detail": "cannot follow self."}, status=status.HTTP_400_BAD_REQUEST
            )

        user.follow_author(author)
        return Response({}, status=status.HTTP_204_NO_CONTENT)

    def delete(self, request, username):
        author = get_object_or_404(User, username=username)
        user = request.user
        user.unfollow_author(author)
        return Response({}, status=status.HTTP_204_NO_CONTENT)


class PostLikeView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def put(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        user = request.user

        post.like_post(user)
        return Response({}, status=status.HTTP_204_NO_CONTENT)

    def delete(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        user = request.user
        
        post.unlike_post(user)
        return Response({}, status=status.HTTP_204_NO_CONTENT)
