import React, { useState, useEffect } from 'react';

type User = {
  name: string;
  email: string;
};

interface UserDataProps {
  userId: string;
  onUserDataFetched: (user: User | null) => void;
}

const UserData: React.FC<UserDataProps> = ({ userId, onUserDataFetched}) => {
  const [user, setUser] = useState<User | null>(null);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://secret.url/user/${userId}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data: User = await response.json();
        setUser(data);
        onUserDataFetched(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();


    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [userId, onUserDataFetched]); 

  return (
    <div>
      <h1>User Data Component</h1>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <p>Timer: {seconds} seconds</p>
    </div>
  );
};

export default UserData;
