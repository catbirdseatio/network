from django.urls import path 

from .views import PostList, PostDetail

app_name="posts"

urlpatterns = [
    path('posts/<int:pk>/', PostDetail.as_view(), name="detail"),
    path("posts/", PostList.as_view(), name="list")
]
