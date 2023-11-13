from django.contrib import admin
from django.conf import settings
from django.urls import path, include, re_path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("apps.core.urls")),
    path("api/v1/", include("apps.posts.urls")),
    path("api-auth/", include("rest_framework.urls")),
    re_path(r'^(?:.*)/?$', include('apps.core.urls')),
]

if settings.DEBUG:
    urlpatterns += [
        path("__debug__/", include("debug_toolbar.urls")),
    ]
