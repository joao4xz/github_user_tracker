import { useState, useEffect } from 'react'
import { fetchUserData } from './api/github.ts'
import type { User } from './@types/user.d.ts'

function App() {
  const [submitValue, setSubmitValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    if (submitValue) {
      fetchUserData(submitValue).then(userData => {
        console.log(userData);
        if (userData) {
          setUsers([...users, {
            name: userData.name,
            username: userData.login,
            image_url: userData.avatar_url,
            repo_num: userData.public_repos,
            followers_num: userData.followers,
            following_num: userData.following,
          }]);
        }
      })
    }
  }, [submitValue]);

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
        onClick={() => setSubmitValue(inputValue)}
      >
        Add user
      </button>
      {
        users.map((user) => {
          return <div key={user.username}>
            <p>{user.name}</p>
            <img src={user.image_url} />
          </div>
        })
      }
    </div>
  )
}

export default App
