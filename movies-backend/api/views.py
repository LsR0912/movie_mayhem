import json
from .models import Movie, Rating, Genre
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.decorators import action
from .serializers import MovieSerializer


# Create your views here.
class MovieViewSet(viewsets.ModelViewSet):
      queryset = Movie.objects.all()
      serializer_class = MovieSerializer

def load_movies_from_file(request):
    if request.method == 'POST' and 'json_file' in request.FILES:
        json_file = request.FILES['json_file']
        data = json.load(json_file.file)
        for item in data:
            # Use get with default values to prevent None for not null fields
            tmdb_id = item.get('id',0)
            title = item.get('title', '')
            overview = item.get('overview', '')
            release_date = item.get('release_date', '0000-00-00')
            poster_path = item.get('poster_path', '')
            vote_average = item.get('vote_average', 0)
            vote_count = item.get('vote_count', 0)

            if not Movie.objects.filter(title=title).exists():
                movie = Movie(
                    tmdb_id=tmdb_id,
                    title=title,
                    overview=overview,
                    release_date=release_date,
                    poster_path=poster_path,
                    vote_average=vote_average,
                    vote_count=vote_count
                )
                movie.save()
        return render(request, 'success.html')
    return render(request, 'form.html')

def load_genres_from_file(request):
        if request.method == 'POST' and request.FILES['json_file']:
            json_file = request.FILES['json_file']
            data = json.load(json_file)
            for item in data['genres']:
                genre = Genre(
                    id=item['id'],
                    name=item['name']
                )
                genre.save()
            return render(request, 'success.html')
        return render(request, 'form.html')