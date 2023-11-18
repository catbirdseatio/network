from django.urls import path

from .views import PostList, PostDetail, CurrentUserDetail

app_name = "posts"

urlpatterns = [
    path("users/user", CurrentUserDetail.as_view(), name="current_user"),
    path("posts/<int:pk>/", PostDetail.as_view(), name="detail"),
    path("posts/", PostList.as_view(), name="list"),
]
