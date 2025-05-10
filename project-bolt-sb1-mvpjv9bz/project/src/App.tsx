import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import GameBoard from './components/GameBoard';
import QuestionScreen from './components/QuestionScreen';
import GameEnd from './components/GameEnd';
import { GameProvider } from './context/GameContext';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-950 text-white">
      <GameProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<GameBoard />} />
          <Route path="/question" element={<QuestionScreen />} />
          <Route path="/end" element={<GameEnd />} />
        </Routes>
      </GameProvider>
    </div>
  );
}

export default App;