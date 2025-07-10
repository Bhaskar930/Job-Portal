import React from "react";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { useSelector } from "react-redux";



const Navbar = () => {
  
  const {user}=useSelector(store=>store.auth);
  return (
    <div className="bg-white" div>
      <div className="flex items-centers justify-between mx-auto max-w-7xl h-16">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">
            Job
            <span className="text-[#F83002]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex gap-5 font-medium items-center ">
            <li> <Link to="/home">Home</Link></li>
            <li> <Link to="/jobs">Jobs</Link></li>
            <li> <Link to="/browse">Browse</Link></li>
            
          </ul>
          {!user ? (
            <div className="flex gap-2">
              <Link to="/login">
                <Button
                  className="bg-[#926dd0] hover:bg-[#8b65b4] text-white"
                  variant="outline"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  className="bg-[#71b6d6] hover:bg-[#4b7c8a] text-white"
                  variant="outline"
                >
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex  gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="">
                    <h4 className="font-medium">Bhaskar</h4>
                    <p className="text-sm text-muted-foregroundforeground">
                      Lorem ipsum, dolor sit amet consectetur adipisicing{" "}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col mt-3">
                  <div className="flex items-center">
                    <User2 width={20} />
                    <Button variant="link">
                      <Link to="/profile">View Profile</Link>
                      </Button>
                  </div>
                  <div className="flex items-center p-0 m-0">
                    <LogOut width={20} />
                    <Button variant="link">LogOut</Button>
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
