import { useState, useEffect } from 'react'
import { fetchUserData } from './api/github.ts'
import type { User } from './@types/user.d.ts'

import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Toaster } from "./components/ui/toaster"

import { useToast } from './hooks/use-toast.ts'

function App() {
  const [submitValue, setSubmitValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [users, setUsers] = useState<User[]>([])

  const { toast } = useToast()

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
      .catch((err) => {
        console.error(err.message);
        let message = ""
        if (err.response.status === 404) {
          message = "User doesn't exist"
        } else if (err.response.status === 403) {
          message = "API rate limit exceeded"
        } else {
          message = err.message
        }
        if (err.response) {
          toast({
            variant: "destructive",
            title: "Something went wrong!",
            description: message,
          })
        }
      });
    }
  }, [submitValue]);

  return (
    <div className="h-screen flex flex-col items-center gap-4 p-4">
      <form
        className="flex flex-col gap-6 max-w-1/4"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitValue(inputValue);
        }}
      >
        <Input
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button
          type="submit"
        >
          Add user
        </Button>
      </form>
      {
        users.map((user) => {
          return <div key={user.username}>
            <p>{user.name}</p>
            <img src={user.image_url} />
          </div>
        })
      }
      <Toaster />
    </div>
  )
}

export default App
