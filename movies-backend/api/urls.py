from django.urls import path
from rest_framework import routers
from django.conf.urls import include
from .views import MovieViewSet

from . import views

router = routers.DefaultRouter()
router.register('movies', MovieViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path("movie-import/", views.load_movies_from_file),
    path("genre-import/", views.load_genres_from_file),
]