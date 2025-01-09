import { useState, useEffect } from 'react'
import { fetchUserData } from './api/github.ts'

function App() {
  const [name, setName] = useState('');

  useEffect(() => {
    fetchUserData('joao4xz').then(userData => {
      console.log(userData);
      userData.name && setName(userData.name);
    });
  }, []);

  return (
    <div className="text-red-500">
      {name}
    </div>
  )
}

export default App
