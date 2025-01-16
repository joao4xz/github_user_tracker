import { Card, CardContent, CardHeader } from "./ui/card"
import { User, Users, BookMarked } from 'lucide-react'

import type { UserInterface } from '../@types/user'

export function UserCard({ user }: { user: UserInterface }) {
  return (
    <Card className="w-full max-w-md mx-auto border-primary">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <img className="w-16 h-16 rounded-full" src={user.image_url} />
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold">{user.name ?? user.username}</h2>
          <p className="text-muted-foreground">@{user.username}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="flex flex-col items-center">
            <BookMarked className="mb-2" />
            <p className="text-lg font-semibold">{user.repo_num}</p>
            <p className="text-sm text-muted-foreground">Repositories</p>
          </div>
          <div className="flex flex-col items-center">
            <Users className="mb-2" />
            <p className="text-lg font-semibold">{user.followers_num}</p>
            <p className="text-sm text-muted-foreground">Followers</p>
          </div>
          <div className="flex flex-col items-center">
            <User className="mb-2" />
            <p className="text-lg font-semibold">{user.following_num}</p>
            <p className="text-sm text-muted-foreground">Following</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}