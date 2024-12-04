import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card/Card.jsx";
import { Player } from "./components/Players/Player";

function App() {
  const [mark, setMark] = useState(Array(9).fill(null));
  const [bubble, setBubble] = useState(false);
  const [winner, setWinner] = useState();
  const [player1, setPlayer1] = useState({
    name: "Player1",
    win: false,
  });
  const [player2, setPlayer2] = useState({
    name: "Player2",
    win: false,
  });
  const [showMessage, setShowMessage] = useState(true); // State to control the visibility of the success message

  const winningCombos = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal 1
    [2, 4, 6], // Diagonal 2
  ];
  function checkWin(mark, winningCombos) {
    for (const combo of winningCombos) {
      const [a, b, c] = combo;

      // Check if all three positions in the combo are non-null and equal
      if (mark[a] && mark[a] === mark[b] && mark[a] === mark[c]) {
        return mark[a]; // Return the winner's symbol (e.g., "/cross.png" or "/circle.png")
      } else if (mark.every((item) => item !== null)) {
        return "Draw";
      }
    }

    return null; // No winner yet
  }

  useEffect(() => {
    const winner = checkWin(mark, winningCombos);
    if (winner) {
      if (winner.includes("cross")) {
        setPlayer1((prevplayer1) => ({ ...prevplayer1, win: true }));
        setPlayer2((prevplayer2) => ({ ...prevplayer2, win: false }));
        setWinner(player1.name);
      } else if (winner.includes("circle")) {
        setPlayer2((prevplayer2) => ({ ...prevplayer2, win: true }));
        setPlayer1((prevplayer1) => ({ ...prevplayer1, win: false }));
        setWinner(player2.name);
      } else if (winner.includes("Draw")) {
        setWinner("Draw");
      }
    } else {
      console.log("No winner yet!");
    }
  }, [mark]);

  const appendMark = (index) => {
    setMark((prevMark) => {
      const updateMarks = [...prevMark];
      if (bubble) {
        updateMarks[index] = "/circle.png";
      } else {
        updateMarks[index] = "/cross.png";
      }
      setBubble(!bubble);

      return updateMarks;
    });
  };
  const closeSuccessMessage = () => {
    setShowMessage(false); // Hide the success message when close button is clicked
    setMark(Array(9).fill(null));
  };
  return (
    <main>
      <header>
        <div className="logo-container">
          <img src="./public/game.png" alt="Logo" />
          <h1>Tic-Tac-Toe</h1>
        </div>
      </header>
      {winner && showMessage && (
        <div style={styles.successMessage}>
          <div style={styles.closeButton} onClick={closeSuccessMessage}>
            &times; {/* Cross mark symbol */}
          </div>
          {winner == "Draw" ? (
            <p>Match is Draw!</p>
          ) : (
            <p>Congratulations, {winner}! You won the game!</p>
          )}
        </div>
      )}
      <Card style={styles.mainbox}>
        <div className="playernames">
          <Player setPlayer={setPlayer1} name={player1.name} />
          <Player setPlayer={setPlayer2} name={player2.name} />
        </div>
        <Card style={styles.tictactoewhole}>
          {Array.from({ length: 9 }).map((_, index) => (
            <Card
              key={index}
              onClick={() => appendMark(index)}
              style={{
                ...styles.tictacbox,
                pointerEvents: mark[index] !== null ? "none" : "auto", // Disable pointer events if the box is already marked
                opacity: mark[index] !== null ? 0.5 : 1, // Optional: Add opacity to indicate it's disabled
              }}
            >
              {mark[index] != null ? <img src={mark[index]} alt="Mark" /> : ""}
            </Card>
          ))}
        </Card>
      </Card>
    </main>
  );
}
const styles = {
  mainbox: {
    background:
      "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
    maxWidth: "35%",
    margin: "auto",
  },
  tictactoewhole: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center", // Use "center" for consistent alignment
    gap: "10px", // Add spacing between items instead of relying on `space-between`
  },
  tictacbox: {
    width: "75px", // Use a fixed width
    height: "75px", // Set a fixed height for a square shape
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center", // Center the content inside vertically
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer", // Indicate it's clickable
    margin: "5px", // Add consistent spacing between boxes
  },
  successMessage: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)", // Center the message horizontally
    backgroundColor: "#4CAF50", // Green color for success
    color: "white",
    padding: "15px 30px",
    borderRadius: "10px",
    fontSize: "18px",
    fontWeight: "bold",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
    zIndex: 10,
    display: "flex",
    justifyContent: "center", // Align text and close button
    alignItems: "center",
    width: "300px", // Set a fixed width for better control
    transition: "top 0.3s ease-in-out", // Animation for sliding in
  },
};

export default App;
