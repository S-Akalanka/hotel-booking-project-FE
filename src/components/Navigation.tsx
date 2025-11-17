import { useState } from "react";
import logo from "../images/logo.png";
import {
  Moon,
  Sun,
  Menu,
  User,
  Calendar,
  Settings,
  LogOut,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router";
import {
  SignedIn,
  SignedOut,
  SignOutButton,
  UserButton,
} from "@clerk/clerk-react";

function Navigation() {
  const navigate = useNavigate();
  const [isDark, setDark] = useState(false);

  const themeHandler = () => {
    setDark(!isDark);
  };

  return (
    <nav className="grid grid-cols-3 items-center px-7 py-4 text-base z-10 fixed w-full top-0">
      {/* Left Nav */}
      <div className="left-nav flex gap-9  justify-start text-white">
        <a
          href="#"
          className=" after:block after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
        >
          Experiences
        </a>
        <a
          href="#"
          className=" after:block after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
        >
          Foods & Drinks
        </a>
        <a
          href="#"
          className=" after:block after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
        >
          About
        </a>
      </div>

      {/* Center Logo */}
      <div className="center-logo flex justify-center text-white">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-16" />
        </Link>
      </div>

      {/* Right Nav */}
      <div className="right-nav flex justify-end items-center">
        {/* Desktop View */}
        <div className="right-nav-desktop flex gap-10 justify-end items-center">
          <button
            onClick={themeHandler}
            className="nav-theme-icon cursor-pointer text-white rounded-2xl"
          >
            {isDark ? <Moon size={20} /> : <Sun size={21} />}
          </button>
          {/* User Menu */}
          <SignedIn>
            <UserButton />
            <div className="account">
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  className="nav-dropdown border-none py-6.5 cursor-pointer px-3 rounded-2xl"
                >
                  <Button variant="ghost">
                    <User className="h-4 w-4 text-black" />
                    Profile
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="nav-dropdown-content w-56 text-black"
                >
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() =>
                      navigate("/users", { state: { tab: "profile" } })
                    }
                  >
                    <User className="mr-2 h-4 w-4 text-black" />
                    My Account
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() =>
                      navigate("/users", { state: { tab: "bookings" } })
                    }
                  >
                    <Calendar className="mr-2 h-4 w-4 text-black" />
                    My Bookings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() =>
                      navigate("/users", { state: { tab: "settings" } })
                    }
                  >
                    <Settings className="mr-2 h-4 w-4 text-black" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" asChild>
                    <SignOutButton>
                      <button className="flex items-center space-x-2 w-full text-black">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </SignOutButton>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SignedIn>

          <SignedOut>
            <div className="flex items-center space-x-2">
              <Button
                asChild
                className="sign-in-btn  bg-transparent size-[50px] cursor-pointer p-3 rounded-3xl min-w-24"
              >
                <Link to={"/sign-in"}> Sign In</Link>
              </Button>
              <Button className="sign-up-btn  size-[50px] cursor-pointer p-3 rounded-3xl min-w-24">
                <Link to={"/sign-up"}> Sign Up</Link>
              </Button>
            </div>
          </SignedOut>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="sheet">
            <Button className="sheet-btn bg-transparent h-12">
              <Menu className="size-[33px]" />
            </Button>
          </SheetTrigger>
          <SheetContent className="sheetContent w-60 border-none ">
            <ul className="text-white py-10 px-5 text-[24px] space-y-4">
              <Link to="/">
                <img src={logo} alt="Logo" className="w-24 m-auto pb-5" />
              </Link>
              <hr className="my-5"></hr>
              <li>
                <a href="#" className="sheet-main-content">
                  Experiences
                </a>
              </li>
              <li>
                <a href="#" className="sheet-main-content">
                  Foods & Drinks
                </a>
              </li>
              <li>
                <a href="#" className="sheet-main-content">
                  About
                </a>
              </li>
            </ul>

            <SheetFooter className="space-y-5">
              <button
                onClick={themeHandler}
                className="cursor-pointer text-white"
              >
                {isDark ? (
                  <a className="sheet-theme-icon flex items-center justify-center gap-4 p-4 mx-5 rounded-4xl">
                    <Moon size={25} />
                    <p>Dark Mode</p>
                  </a>
                ) : (
                  <a className="sheet-theme-icon flex items-center justify-center gap-4 p-4 mx-5 rounded-4xl">
                    <Sun size={26} />
                    <p>Light Mode</p>
                  </a>
                )}
              </button>
              <hr></hr>
              <SignedIn>
                <DropdownMenu>
                  <div className="flex gap-4 justify-center">
                    <UserButton />
                    <DropdownMenuTrigger
                      asChild
                      className="nav-dropdown border-none py-7.5 px-3 rounded-2xl"
                    >
                      <Button
                        variant="ghost"
                        className="flex items-center space-x-2 text-xl"
                      >
                        <User className="h-4 w-4 text-black" />
                        Profile
                      </Button>
                    </DropdownMenuTrigger>
                  </div>
                  <DropdownMenuContent
                    align="end"
                    className="nav-dropdown-content w-60 p-3"
                  >
                    <DropdownMenuItem
                      className="text-[1.3rem]"
                      onClick={() =>
                        navigate("/users", { state: { tab: "profile" } })
                      }
                    >
                      <User className="mr-2 h-4 w-4" />
                      My Account
                    </DropdownMenuItem>{" "}
                    <DropdownMenuItem
                      className="text-[1.3rem]"
                      onClick={() =>
                        navigate("/users", { state: { tab: "bookings" } })
                      }
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      My Bookings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-[1.3rem]"
                      onClick={() =>
                        navigate("/users", { state: { tab: "settings" } })
                      }
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-[1.3rem]">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SignedIn>

              <SignedOut>
                <div className="flex items-center space-x-2">
                  <ul className="text-white m-auto pb-5 text-[1.25rem] space-y-7 flex flex-col items-center">
                    <li>
                      <Link
                        to="/sign-in"
                        className="sheet-signin py-3 px-5 rounded-4xl"
                      >
                        Sign In
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="sign-up"
                        className="sheet-signup py-3 px-5 rounded-4xl"
                      >
                        Sign Up
                      </Link>
                    </li>
                  </ul>
                </div>
              </SignedOut>
            </SheetFooter>
            <SheetClose className="bg-white text-white" />
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

export default Navigation;
