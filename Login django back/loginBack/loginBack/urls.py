from django.contrib import admin
from django.urls import path, include
from login.views import LoginViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'logins', LoginViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls))
]
