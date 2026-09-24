from django.contrib import admin
from django.urls import include, path
from django.views.generic import RedirectView

urlpatterns = [
    path("", RedirectView.as_view(url="/catalog/", permanent=True)),
    path("admin/", admin.site.urls),
    path("catalog/", include("catalog.urls")),
    path("oidc/", include("mozilla_django_oidc.urls")),
]
