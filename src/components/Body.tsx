import { useState, useEffect } from "react";
import { fetchUserData } from "../api/github.ts";
import type { UserInterface } from "../@types/user.d.ts";

import { UserCard } from "./UserCard";

import { useToast } from "../hooks/use-toast.ts";
import handleError from "../utils/handleErrors.ts";

type BodyProps = {
  submitValue: string;
};

export function Body({ submitValue }: BodyProps) {
  const [users, setUsers] = useState<UserInterface[]>([]);

  const { toast, dismiss } = useToast();

  useEffect(() => {
    const storage_users = localStorage.getItem("users");
    if (storage_users) {
      setUsers(JSON.parse(storage_users));
    }
    console.log("user stored");
  }, []);

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
              const updatedUsers = [
                ...users,
                {
                  name: userData.name,
                  username: userData.login,
                  image_url: userData.avatar_url,
                  repo_num: userData.public_repos,
                  followers_num: userData.followers,
                  following_num: userData.following,
                },
              ];
              setUsers(updatedUsers);
              localStorage.setItem("users", JSON.stringify(updatedUsers));
            }
          })
          .catch((err) => {
            const message = handleError(err);
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
    <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(288px,4fr))] sm:grid-cols-[repeat(auto-fill, minmax(400px,4fr))] gap-4 items-center justify-items-center">
      {users.map((user) => (
        <UserCard key={user.username} user={user} />
      ))}
    </div>
  );
}
