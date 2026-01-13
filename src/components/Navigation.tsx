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
import { useEffect, useRef, useState } from "react";

function Navigation(props: any) {
  const navigate = useNavigate();
  const lastScrollY = useRef(0);
  const [hidden, setHidden] = useState(false);

  const themeHandler = () => {
    props.setTheme(props.theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`
        grid grid-cols-3 items-center px-7 py-4 text-base
        fixed w-full top-0 z-10
        transition-transform duration-300 ease-in-out
        ${hidden ? "-translate-y-full" : "translate-y-0"}
      `}
    >
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
            className="nav-theme-icon cursor-pointer text-white rounded-2xl hover:bg-[var(--nav-theme-icon-hover)]"
          >
            {props.theme === "light" ? <Moon size={20} /> : <Sun size={21} />}
          </button>
          {/* User Menu */}
          <SignedIn>
            <UserButton />
            <div className="account">
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  className=" border-none p-6 cursor-pointer rounded-3xl bg-[var(--nav-dropdown)] hover:bg-[var(--nav-dropdown-hover)]"
                >
                  <Button className="text-white">
                    <User className="h-4 w-4 " />
                    Profile
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className=" w-56"
                >
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() =>
                      navigate("/users", { state: { tab: "profile" } })
                    }
                  >
                    <User className="mr-2 h-4 w-4" />
                    My Account
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() =>
                      navigate("/users", { state: { tab: "bookings" } })
                    }
                  >
                    <Calendar className="mr-2 h-4 w-4 " />
                    My Bookings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() =>
                      navigate("/users", { state: { tab: "settings" } })
                    }
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer w-full" asChild>
                    <SignOutButton>
                      <button className="flex items-center justify-center space-x-2 w-full">
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
              <Button asChild
                className="sign-in-btn text-white bg-transparent size-[22px] cursor-pointer p-6 rounded-4xl min-w-24 hover:bg-[var(--nav-signin-hover)]"
              >
                <Link to={"/sign-in"}> Sign In</Link>
              </Button>
              <Button className="text-white size-[22px] cursor-pointer p-6 rounded-4xl min-w-24 bg-[var(--nav-signup)] hover:bg-[var(--nav-signup-hover)]">
                <Link to={"/sign-up"}> Sign Up</Link>
              </Button>
            </div>
          </SignedOut>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="sheet">
            <Button className="sheet-btn bg-transparent h-12 hover:bg-[var(--sheet-btn-hover)]">
              <Menu className="size-[33px] text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent className="sheetContent w-60 border-none ">
            <ul className="text-white py-10 px-5 text-[20px] space-y-4">
              <Link to="/">
                <img src={logo} alt="Logo" className="w-24 m-auto pb-5" />
              </Link>
              <hr className="my-5"></hr>
              <li>
                <a href="#" className="sheet-main-content hover:bg-[var(--sheet-main-content-hover)]">
                  Experiences
                </a>
              </li>
              <li>
                <a href="#" className="sheet-main-content hover:bg-[var(--sheet-main-content-hover)]">
                  Foods & Drinks
                </a>
              </li>
              <li>
                <a href="#" className="sheet-main-content hover:bg-[var(--sheet-main-content-hover)]">
                  About
                </a>
              </li>
            </ul>

            <SheetFooter className="space-y-5">
              <button
                onClick={themeHandler}
                className="cursor-pointer text-white text-[15px]"
              >
                {props.theme === "light" ? (
                  <a className="sheet-theme-icon flex border items-center justify-center gap-3 p-4 mx-5 rounded-4xl hover:bg-[var(--sheet-theme-icon-hover)]">
                    <Moon size={24} />
                    <p>Dark Mode</p>
                  </a>
                ) : (
                  <a className="sheet-theme-icon flex border items-center justify-center gap-3 p-4 mx-5 rounded-4xl hover:bg-[var(--sheet-theme-icon-hover)]">
                    <Sun size={24} />
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
                      className=" border-none py-6 px-7 rounded-2xl bg-[var(--nav-dropdown)] hover:bg-[var(--nav-dropdown-hover)]"
                    >
                      <Button
                        className="flex items-center space-x-2 text-[1.25rem] text-white "
                      >
                        Profile
                      </Button>
                    </DropdownMenuTrigger>
                  </div>
                  <DropdownMenuContent
                    align="end"
                    className=" w-60 p-3"
                  >
                    <DropdownMenuItem
                      className="text-[1rem]"
                      onClick={() =>
                        navigate("/users", { state: { tab: "profile" } })
                      }
                    >
                      <User className="mr-2 h-4 w-4" />
                      My Account
                    </DropdownMenuItem>{" "}
                    <DropdownMenuItem
                      className="text-[1rem]"
                      onClick={() =>
                        navigate("/users", { state: { tab: "bookings" } })
                      }
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      My Bookings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-[1rem]"
                      onClick={() =>
                        navigate("/users", { state: { tab: "settings" } })
                      }
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-[1rem]">
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
                        className="sheet-signin py-3 px-10 rounded-4xl hover:bg-[var(--nav-signin-hover)]"
                      >
                        Sign In
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="sign-up"
                        className="sheet-signup py-3 px-8 rounded-4xl bg-[var(--nav-signup)] hover:bg-[var(--nav-signup-hover)]"
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
