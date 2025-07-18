from rest_framework import serializers
from .models import Movie, Rating, Genre

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('tmdb_id','title','overview','release_date','poster_path','vote_average','vote_count')