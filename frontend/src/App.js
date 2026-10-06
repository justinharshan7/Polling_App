import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthForm from './components/Login';
import CreatePoll from './components/CreatePoll';
import VotingPage from './components/VotingPage';

function Home() {
  const [username, setUsername] = useState(localStorage.getItem('username'));

  if (!username) {
    return <AuthForm onLogin={setUsername} />;
  }

  return (
    <div>
      <p>Logged in as {username}</p>
      <CreatePoll />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/poll/:id" element={<VotingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;