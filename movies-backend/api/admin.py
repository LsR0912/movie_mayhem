from django.contrib import admin
from .models import Movie, Rating, Genre

# Register your models here.
admin.site.register(Movie)
admin.site.register(Rating)
admin.site.register(Genre)