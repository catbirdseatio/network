from django.urls import path

from .views import PostList, PostDetail, CurrentUserDetail, UserProfileDetail

app_name = "posts"

urlpatterns = [
    path("users/user", CurrentUserDetail.as_view(), name="current_user"),
    path("users/<str:username>", UserProfileDetail.as_view(), name="user_profile"),
    path("posts/<int:pk>/", PostDetail.as_view(), name="detail"),
    path("posts/", PostList.as_view(), name="list"),
]
