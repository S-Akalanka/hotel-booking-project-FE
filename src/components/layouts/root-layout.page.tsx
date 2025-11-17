import { Outlet } from "react-router";
import Navigation from "../Navigation";
import Footer from "../Footer";
import { useUser } from "@clerk/clerk-react";
import { useCreateOrFetchUserMutation } from "@/lib/api";
import { useEffect, useRef } from "react";

export default function RootLayout() {
  const { user, isSignedIn, isLoaded } = useUser();
  const [createOrFetchUser] = useCreateOrFetchUserMutation();

const hasSyncedRef = useRef(false);

useEffect(() => {
  if (!isLoaded || !isSignedIn || !user) return;
  if (hasSyncedRef.current) return;

  createOrFetchUser({
    clerkId: user.id,
    role: user.publicMetadata.role || "user",
    fullName: user.fullName || "",
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.primaryEmailAddress?.emailAddress,
    imageUrl: user.imageUrl,
    phoneNumbers: user.phoneNumbers,
    address: "",
  });

  hasSyncedRef.current = true;
}, [isLoaded, isSignedIn, user?.id]);


  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
}
