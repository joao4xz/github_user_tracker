import { useState, useEffect } from 'react'
import { fetchUserData } from './api/github.ts'

function App() {
  const [userName, setUsername] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (userName) {
      fetchUserData(userName).then(userData => {
        console.log(userData);
        userData.name && setName(userData.name);
        userData.avatar_url && setImage(userData.avatar_url);
      });
    }
  }, [userName]);

  return (
    <div className="h-screen flex flex-col items-center gap-4 p-4">
      <input
        className="border-2 border-sky-600"
        type="text"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        className="bg-sky-600 rounded px-8 py-2 hover:bg-sky-700 text-sky-50"
        type="submit"
        onClick={() => setUsername(inputValue)}
      >
        Add user
      </button>
      <p>{name}</p>
      <img src={image} />
    </div>
  )
}

export default App
