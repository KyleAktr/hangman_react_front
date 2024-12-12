import React, { useState, useEffect } from "react";
import api from "./api";

function App() {
  const [game, setGame] = useState(null);
  const [letter, setLetter] = useState("");

  // Fonction pour démarrer une nouvelle partie
  const startGame = async () => {
    try {
      const response = await api.post("/start");
      setGame(response.data);
    } catch (error) {
      console.error("Error starting the game:", error);
    }
  };

  // Fonction pour deviner une lettre
  const guessLetter = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/guess", { letter });
      setGame(response.data);
      setLetter("");
    } catch (error) {
      console.error("Error guessing letter:", error);
    }
  };

  useEffect(() => {
    startGame();
  }, []);

  if (!game) return <div>Loading...</div>;

  return (
    <div>
      <h1>Hangman Game</h1>
      <p>
        Word:{" "}
        {game.word
          .split("")
          .map((l) => (game.guesses.includes(l) ? l : "_"))
          .join(" ")}
      </p>
      <p>Guesses: {game.guesses.join(", ")}</p>
      <p>Attempts remaining: {game.attempts}</p>
      <p>{game.message}</p>

      {!game.isCompleted && (
        <form onSubmit={guessLetter}>
          <input
            type="text"
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
            maxLength={1}
            required
          />
          <button type="submit">Guess</button>
        </form>
      )}
    </div>
  );
}

export default App;
