import { Outlet } from "react-router";
import Navigation from "../Navigation";
import Footer from "../Footer";
import { useUser } from "@clerk/clerk-react";
import { useCreateOrFetchUserMutation } from "@/lib/api";
import { useEffect } from "react";

export default function RootLayout() {
  const { user, isSignedIn } = useUser();
  const [createOrFetchUser] = useCreateOrFetchUserMutation();

  useEffect(() => {
    if (isSignedIn && user) {
      createOrFetchUser({
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName,
        imageUrl: user.imageUrl,
      });
    }
  }, [isSignedIn, user]);

  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
}
