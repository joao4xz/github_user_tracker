import { ChevronLeft } from "lucide-react"
import { NavLink } from "react-router";
import { Navigate } from "react-router";

type HeaderProps = {
  image_url: string;
  username: string
}

export function Header({ image_url, username }: HeaderProps) {
  return (
    <div className="relative w-full h-36 bg-primary" >
      <NavLink to="/" className="absolute top-full -translate-y-14 left-4">
        <ChevronLeft className="text-white w-12 h-12" />
      </NavLink>
      <div className="w-32 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2 text-center">
        <img className="w-32 rounded-full border-2 border-secondary" src={image_url} alt="User profile picture" />
        <p className="text-xl text-gray-800">{username}</p>
      </div>
    </div>
  );
}
