from django.urls import path

from .views import PostList, PostDetail, CurrentUserDetail, UserProfileDetail, FeedList, FollowUserView

app_name = "posts"

urlpatterns = [
    path("users/user", CurrentUserDetail.as_view(), name="current_user"),
    path("users/<str:username>", UserProfileDetail.as_view(), name="user_profile"),
    path("users/<str:username>/follow", FollowUserView.as_view(), name="follow"),
    path("posts/<int:pk>", PostDetail.as_view(), name="detail"),
    path("posts/feed", FeedList.as_view(), name="feed"),
    path("posts/", PostList.as_view(), name="list"),
]
