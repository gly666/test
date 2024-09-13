import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import UserData from './components/UserData';

type User = {
  name: string;
  email: string;
}

function App() {
  const [fetchedUser, setFetchedUser] = useState<User | null>(null);

  const handleUserDataFetched = (user: User | null) => {
    setFetchedUser(user);
  };

  return (
    <div className="App">
      <header className="App-header">
        <UserData userId="123" onUserDataFetched={handleUserDataFetched} />
        {fetchedUser && (
          <div>
            <h2>Fetched User Information:</h2>
            <p>Name: {fetchedUser.name}</p>
            <p>Email: {fetchedUser.email}</p>
          </div>
        )}
      </header>
    </div>
  );
}
export default App;