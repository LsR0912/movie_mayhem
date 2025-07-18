import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import MovieList from "./components/Movielist";

function App() {
  const [count, setCount] = useState(0);

  return <MovieList />;
}

export default App;
