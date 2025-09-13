import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gamepad2, Trophy, RotateCcw } from 'lucide-react';

type GameType = 'tictactoe' | 'memory' | 'wordguess';

const MiniGames: React.FC = () => {
  const [activeGame, setActiveGame] = useState<GameType | null>(null);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [gamesWon, setGamesWon] = useState(0);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gradient flex items-center justify-center gap-2">
          <Gamepad2 className="h-6 w-6" />
          Wellness Games
        </h2>
        <p className="text-muted-foreground">Fun activities to boost your mood! 🎮</p>
        <div className="flex justify-center gap-4 text-sm">
          <Badge variant="secondary" className="gap-1">
            <Trophy className="h-3 w-3" />
            {gamesWon} Wins
          </Badge>
          <Badge variant="outline">{gamesPlayed} Games Played</Badge>
        </div>
      </div>

      {!activeGame ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <GameCard
            title="Tic Tac Toe"
            description="Classic strategy game"
            emoji="⭕"
            onPlay={() => setActiveGame('tictactoe')}
          />
          <GameCard
            title="Memory Match"
            description="Test your memory"
            emoji="🧠"
            onPlay={() => setActiveGame('memory')}
          />
          <GameCard
            title="Word Guess"
            description="Guess the wellness word"
            emoji="💭"
            onPlay={() => setActiveGame('wordguess')}
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">
              {activeGame === 'tictactoe' && 'Tic Tac Toe'}
              {activeGame === 'memory' && 'Memory Match'}
              {activeGame === 'wordguess' && 'Word Guess'}
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveGame(null)}
            >
              Back to Games
            </Button>
          </div>

          {activeGame === 'tictactoe' && (
            <TicTacToe
              onGameEnd={(won) => {
                setGamesPlayed(prev => prev + 1);
                if (won) setGamesWon(prev => prev + 1);
              }}
            />
          )}

          {activeGame === 'memory' && (
            <MemoryGame
              onGameEnd={(won) => {
                setGamesPlayed(prev => prev + 1);
                if (won) setGamesWon(prev => prev + 1);
              }}
            />
          )}

          {activeGame === 'wordguess' && (
            <WordGuess
              onGameEnd={(won) => {
                setGamesPlayed(prev => prev + 1);
                if (won) setGamesWon(prev => prev + 1);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

const GameCard: React.FC<{
  title: string;
  description: string;
  emoji: string;
  onPlay: () => void;
}> = ({ title, description, emoji, onPlay }) => (
  <Card className="wellness-card group hover:scale-105 transition-transform">
    <div className="text-center space-y-4">
      <div className="text-4xl">{emoji}</div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Button onClick={onPlay} className="w-full">
        Play Now
      </Button>
    </div>
  </Card>
);

const TicTacToe: React.FC<{ onGameEnd: (won: boolean) => void }> = ({ onGameEnd }) => {
  const [board, setBoard] = useState<string[]>(Array(9).fill(''));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const checkWinner = (squares: string[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;
    
    const newBoard = [...board];
    newBoard[index] = isXTurn ? 'X' : 'O';
    setBoard(newBoard);
    
    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      onGameEnd(gameWinner === 'X');
    } else if (newBoard.every(square => square)) {
      setWinner('draw');
      onGameEnd(false);
    } else {
      setIsXTurn(!isXTurn);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setIsXTurn(true);
    setWinner(null);
  };

  return (
    <Card className="wellness-card">
      <div className="text-center space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-sm">
            {winner 
              ? winner === 'draw' 
                ? "It's a draw! 🤝" 
                : `${winner} wins! 🎉`
              : `${isXTurn ? 'X' : 'O'}'s turn`
            }
          </div>
          <Button variant="outline" size="sm" onClick={resetGame}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-3 gap-2 max-w-48 mx-auto">
          {board.map((square, index) => (
            <button
              key={index}
              className="w-16 h-16 border-2 border-border rounded-lg text-2xl font-bold hover:bg-accent transition-colors"
              onClick={() => handleClick(index)}
            >
              {square}
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
};

const MemoryGame: React.FC<{ onGameEnd: (won: boolean) => void }> = ({ onGameEnd }) => {
  const emojis = ['😊', '🌟', '💚', '🌸', '☀️', '🦋', '🎈', '🌈'];
  const [cards, setCards] = useState<{ id: number; emoji: string; flipped: boolean; matched: boolean }[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  React.useEffect(() => {
    const shuffledCards = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        flipped: false,
        matched: false
      }));
    setCards(shuffledCards);
  }, []);

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2) return;
    
    const newCards = cards.map(card =>
      card.id === id ? { ...card, flipped: true } : card
    );
    setCards(newCards);
    
    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);
    
    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      const [first, second] = newFlippedCards;
      const firstCard = newCards.find(card => card.id === first);
      const secondCard = newCards.find(card => card.id === second);
      
      if (firstCard?.emoji === secondCard?.emoji) {
        setTimeout(() => {
          setCards(prev => prev.map(card =>
            card.id === first || card.id === second
              ? { ...card, matched: true }
              : card
          ));
          setFlippedCards([]);
          
          // Check if game is won
          const allMatched = newCards.every(card => 
            card.matched || card.id === first || card.id === second
          );
          if (allMatched) {
            onGameEnd(true);
          }
        }, 1000);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(card =>
            card.id === first || card.id === second
              ? { ...card, flipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <Card className="wellness-card">
      <div className="text-center space-y-4">
        <div className="text-sm text-muted-foreground">Moves: {moves}</div>
        <div className="grid grid-cols-4 gap-2 max-w-64 mx-auto">
          {cards.map((card) => (
            <button
              key={card.id}
              className={`w-14 h-14 rounded-lg border-2 text-xl transition-all ${
                card.flipped || card.matched
                  ? 'bg-primary/20 border-primary'
                  : 'bg-muted hover:bg-accent border-border'
              }`}
              onClick={() => handleCardClick(card.id)}
              disabled={card.flipped || card.matched}
            >
              {(card.flipped || card.matched) ? card.emoji : '?'}
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
};

const WordGuess: React.FC<{ onGameEnd: (won: boolean) => void }> = ({ onGameEnd }) => {
  const words = ['PEACE', 'HAPPY', 'CALM', 'SMILE', 'HOPE', 'LOVE', 'JOY'];
  const [currentWord, setCurrentWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const maxWrongGuesses = 6;

  React.useEffect(() => {
    setCurrentWord(words[Math.floor(Math.random() * words.length)]);
  }, []);

  const handleLetterGuess = (letter: string) => {
    if (guessedLetters.includes(letter)) return;
    
    const newGuessedLetters = [...guessedLetters, letter];
    setGuessedLetters(newGuessedLetters);
    
    if (!currentWord.includes(letter)) {
      const newWrongGuesses = wrongGuesses + 1;
      setWrongGuesses(newWrongGuesses);
      
      if (newWrongGuesses >= maxWrongGuesses) {
        onGameEnd(false);
      }
    } else {
      // Check if word is complete
      const isComplete = currentWord.split('').every(char => 
        newGuessedLetters.includes(char)
      );
      if (isComplete) {
        onGameEnd(true);
      }
    }
  };

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  return (
    <Card className="wellness-card">
      <div className="text-center space-y-4">
        <div className="text-sm text-muted-foreground">
          Wrong guesses: {wrongGuesses}/{maxWrongGuesses}
        </div>
        
        <div className="text-2xl font-mono tracking-wider">
          {currentWord.split('').map((letter, index) => (
            <span key={index} className="mx-1">
              {guessedLetters.includes(letter) ? letter : '_'}
            </span>
          ))}
        </div>
        
        <div className="grid grid-cols-6 gap-1 max-w-80 mx-auto">
          {alphabet.split('').map((letter) => (
            <button
              key={letter}
              className={`w-10 h-10 text-sm rounded border-2 transition-colors ${
                guessedLetters.includes(letter)
                  ? currentWord.includes(letter)
                    ? 'bg-success/20 border-success text-success'
                    : 'bg-destructive/20 border-destructive text-destructive'
                  : 'border-border hover:bg-accent'
              }`}
              onClick={() => handleLetterGuess(letter)}
              disabled={guessedLetters.includes(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default MiniGames;