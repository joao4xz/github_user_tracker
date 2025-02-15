import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { useToast } from "../hooks/use-toast.ts";
import { Toaster } from "../components/ui/toaster";

import { fetchUserData } from "../api/github";
import handleError from "../utils/handleErrors.ts";
import { Header } from "../components/Profile/Header.tsx";
import { Body } from "../components/Profile/Body.tsx";

interface UserProfileInfoInterface {
  username: string;
  image_url: string;
}

function Profile() {
  const params = useParams();

  const { toast } = useToast();

  const [userProfileInfo, setUserProfileInfo] = useState<UserProfileInfoInterface>();

  useEffect(() => {
    if (params.username) {
      fetchUserData(params.username)
        .then((userData) => {
          console.log(userData);
          if (userData) {
            setUserProfileInfo({
              username: userData.login,
              image_url: userData.avatar_url,
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
    <div className="min-h-screen sm:pb-4">
      {
        userProfileInfo &&
        <div className="flex flex-col items-center gap-24">
          <Header image_url={userProfileInfo.image_url} username={userProfileInfo.username} />
          <Body username={userProfileInfo.username} />
        </div>
      }
      <Toaster />
    </div>
  );
}

export default Profile;
