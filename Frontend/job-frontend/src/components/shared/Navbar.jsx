import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/authSlice";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex gap-5 font-medium items-center">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/jobs">Jobs</Link></li>
            <li><Link to="/browse">Browse</Link></li>
          </ul>

          {!user ? (
            <div className="flex gap-2">
              <Link to="/login">
                <Button className="bg-[#926dd0] hover:bg-[#8b65b4] text-white" variant="outline">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#71b6d6] hover:bg-[#4b7c8a] text-white" variant="outline">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profilePhoto || "https://github.com/shadcn.png"}
                    alt={user?.fullname || "User"}
                  />
                  <AvatarFallback>{user?.fullname?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage
                      src={user?.profilePhoto || "https://github.com/shadcn.png"}
                      alt={user?.fullname || "User"}
                    />
                    <AvatarFallback>{user?.fullname?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio || "No bio available"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col mt-3 space-y-1">
                  <div className="flex items-center gap-2">
                    <User2 size={18} />
                    <Button variant="link" className="p-0 h-6">
                      <Link to="/profile">View Profile</Link>
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <LogOut size={18} />
                    <Button variant="link" onClick={handleLogout} className="p-0 h-6">
                      Log Out
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
