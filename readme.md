# MovieRater

MovieRater is a full-stack web application for browsing, rating, and favoriting movies. It features a React + TypeScript frontend and a Django REST backend.

## Features

- Browse a list of movies with posters, overviews, and ratings
- Filter movies by release year
- Like/unlike (favorite) movies (saved in localStorage)
- Rate movies with a 1-5 star system (saved in localStorage)
- Custom filter to show movies with vote average < 8.9 and released before 2025-12-31

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Bootstrap
- **Backend:** Django, Django REST Framework, SQLite

## Getting Started

### Backend

1. Navigate to the backend directory:
   ```sh
   cd movies-backend
   ```
2. Install dependencies:
   ```sh
   pip install -r ../requirements.txt
   ```
3. Run migrations:
   ```sh
   python manage.py migrate
   ```
4. Start the server:
   ```sh
   python manage.py runserver
   ```

### Frontend

1. Navigate to the frontend directory:
   ```sh
   cd movies-frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

The frontend will be available at `http://localhost:5173` and the backend API at `http://127.0.0.1:8000/api/movies/`.

## Project Structure

```
movies-backend/
  api/
    models.py
    views.py
    serializers.py
    ...
  movierater/
    settings.py
    urls.py
    ...
  db.sqlite3
  manage.py

movies-frontend/
  src/
    components/
      Movielist.tsx
    App.tsx
    main.tsx
  public/
  package.json
  ...
requirements.txt
```

## Environment Variables

- The frontend expects the backend API at `http://127.0.0.1:8000/api/movies/`. Update `API_URL` in [`Movielist.tsx`](movies-frontend/src/components/Movielist.tsx) if needed.

## License

MIT License

---

\*\*Developed with ❤️ using React and
