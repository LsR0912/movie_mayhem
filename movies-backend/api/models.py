from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.
class Movie(models.Model):
    tmdb_id = models.IntegerField(unique=True)
    title = models.CharField(max_length=200)
    overview = models.TextField()
    release_date = models.DateField()
    poster_path = models.CharField(max_length=200)
    vote_average = models.DecimalField(max_digits=8 ,decimal_places=1)
    vote_count = models.IntegerField()

    def __str__(self):
        return f"{self.title}"
    
class Rating(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stars = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])

class Genre(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)
