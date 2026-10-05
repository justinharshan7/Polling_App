import { useState } from 'react';
import AuthForm from './components/Login';
import CreatePoll from './components/CreatePoll';

function App() {
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

export default App;