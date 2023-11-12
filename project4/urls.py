from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", include("apps.core.urls")),
    path("api/v1/", include("apps.posts.urls")),
     path("api-auth/", include("rest_framework.urls"))
]
