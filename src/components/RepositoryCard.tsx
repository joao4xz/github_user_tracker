import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Star, Calendar, ExternalLink } from "lucide-react"
import { GitHubRepoCardProps } from "../@types/repository"


export default function GitHubRepoCard({ name, stargazers_count, updated_at, html_url, id }: GitHubRepoCardProps) {
  return (
    <Card id={id.toString()} className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-2xl font-bold">{name}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-start">
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-yellow-400" />
            <span>{stargazers_count} stars</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-gray-500" />
          <span>Last updated: {new Date(updated_at).toLocaleDateString()}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => window.open(html_url, "_blank")}>
          <ExternalLink className="mr-2 h-4 w-4" />
          Open Repository
        </Button>
      </CardFooter>
    </Card>
  )
}


