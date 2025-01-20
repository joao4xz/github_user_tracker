import { useState, useEffect } from "react";
import { fetchUserData } from "./api/github.ts";
import type { UserInterface } from "./@types/user.d.ts";

import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Toaster } from "./components/ui/toaster";
import { UserCard } from "./components/UserCard";

import { useToast } from "./hooks/use-toast.ts";

function App() {
  const [submitValue, setSubmitValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [users, setUsers] = useState<UserInterface[]>([]);

  const { toast, dismiss } = useToast();

  useEffect(() => {
    dismiss();
    if (submitValue) {
      if (users.some((user) => user.username == submitValue)) {
        toast({
          variant: "destructive",
          title: "User already exists!",
          description: "This user has already been added.",
        });
      } else {
        fetchUserData(submitValue)
          .then((userData) => {
            console.log(userData);
            if (userData) {
              setUsers([
                ...users,
                {
                  name: userData.name,
                  username: userData.login,
                  image_url: userData.avatar_url,
                  repo_num: userData.public_repos,
                  followers_num: userData.followers,
                  following_num: userData.following,
                },
              ]);
            }
          })
          .catch((err) => {
            let message = "";
            console.error(err.message);
            if (err.response?.status === 404) {
              message = "User doesn't exist";
            } else if (err.response?.status === 403) {
              message = "API rate limit exceeded";
            } else {
              message = err.message;
            }
            if (err.response) {
              toast({
                variant: "destructive",
                title: "Something went wrong!",
                description: message,
              });
            }
          });
      }
    }
  }, [submitValue]);

  return (
    <div className="min-h-screen flex flex-col items-center gap-4 p-4">
      <form
        className="flex flex-col gap-6 max-w-1/4"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitValue(inputValue);
        }}
      >
        <Input onChange={(e) => setInputValue(e.target.value)} />
        <Button type="submit">Add user</Button>
      </form>
      <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(288px,4fr))] sm:grid-cols-[repeat(auto-fill, minmax(400px,4fr))] gap-4 items-center justify-items-center">
        {users.map((user) => (
          <UserCard key={user.username} user={user} />
        ))}
      </div>
      <Toaster />
    </div>
  );
}

export default App;
