import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { useToast } from "../hooks/use-toast.ts";
import { Toaster } from "../components/ui/toaster";

import type { UserInterface } from "../@types/user";
import { fetchUserData } from "../api/github";
import handleError from "../utils/handleErrors.ts";

function Profile() {
  const params = useParams();

  const { toast } = useToast();

  const [user, setUser] = useState<UserInterface>();

  useEffect(() => {
    if (params.username) {
      fetchUserData(params.username)
        .then((userData) => {
          console.log(userData);
          if (userData) {
            setUser({
              name: userData.name,
              username: userData.login,
              image_url: userData.avatar_url,
              repo_num: userData.public_repos,
              followers_num: userData.followers,
              following_num: userData.following,
            });
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
  }, []);

  return (
    <>
      <div>{params.username}</div>
      <div>{user && user.repo_num}</div>
      <Toaster />
    </>
  );
}

export default Profile;
