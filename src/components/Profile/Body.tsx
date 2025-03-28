import { useEffect, useState } from "react";
import handleError from "../../utils/handleErrors.ts";

import { useToast } from "../../hooks/use-toast.ts";
import { Toaster } from "../../components/ui/toaster";

import GitHubRepoCard from "../RepositoryCard";
import { GitHubRepoCardProps } from "../../@types/repository";
import { fetchUserRepoData } from "../../api/github";

type BodyProps = {
  username: string
}


export function Body({ username }: BodyProps) {
  const { toast } = useToast();

  const [repositories, setRepositories] = useState<GitHubRepoCardProps[]>([]);

  useEffect(() => {
    if (username) {
      fetchUserRepoData(username)
        .then((repoData) => {
          if (repoData) {
            const filteredRepositories = repoData.map((repository: GitHubRepoCardProps) => ({
              name: repository.name,
              stargazers_count: repository.stargazers_count,
              updated_at: repository.updated_at,
              html_url: repository.html_url,
              id: repository.id
            }));
            setRepositories(filteredRepositories);
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
    <div className="w-full px-4 grid grid-cols-[repeat(auto-fill,minmax(288px,4fr))] sm:grid-cols-[repeat(auto-fill,minmax(400px,4fr))] gap-4 items-center justify-items-center">
      {
        repositories.map((repository) =>
          <GitHubRepoCard
            name={repository.name}
            stargazers_count={repository.stargazers_count}
            updated_at={repository.updated_at}
            html_url={repository.html_url}
            id={repository.id}
            key={repository.id}
          />
        )
      }
      <Toaster />
    </div>
  );
}
