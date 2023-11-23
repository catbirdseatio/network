from django.contrib import admin
from django.conf import settings
from django.urls import path, include, re_path
from apps.core.views import IndexView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("apps.core.urls")),
    path("api/v1/", include("apps.posts.urls")),
    path("api-auth/", include("rest_framework.urls")),
]

if settings.DEBUG:
    urlpatterns += [
        path("__debug__/", include("debug_toolbar.urls")),
    ]

# Fallback url must be addded after all urls;
# DDT malfunctions if fallback comes before url
urlpatterns += [
    re_path(r'^.*/$', IndexView.as_view(), name='fallback'),
]
