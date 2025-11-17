import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { User, Settings, Calendar } from "lucide-react";
import { motion } from "motion/react";
import { AccountProfile } from "./AccountProfile";
import { AccountBooking } from "./AccountBooking";
import { AccountSettings } from "./AccountSettings";
import { useGetUserQuery } from "@/lib/api";
import { useLocation } from "react-router";

export function AccountContent() {
  const location = useLocation();
  
  const { data: user, isLoading, isError, error } = useGetUserQuery(undefined);

  const [activeTab, setActiveTab] = useState(location.state?.tab ||"profile");
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    imageUrl: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setUserInfo({
        firstName: user.firstName || "Not Provided",
        lastName: user.lastName || "Not Provided",
        email: user.email || "Not Provided",
        phone: user.phoneNumber || "Not Provided",
        imageUrl: user.imageUrl || "",
        address: user.address || "Not Provided",
      });
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gray-500 py-12 pt-32">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-6"
          >
            <Avatar className="w-24 h-24 max-[748px]:w-18 max-[748px]:h-18">
              <AvatarImage src={userInfo.imageUrl} />
              <AvatarFallback className="text-4xl bg-gray-300 text-black max-[748px]:text-2xl">
                {userInfo.firstName[0]}
                {userInfo.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-playfair text-3xl md:text-4xl max-[748px]:text-2xl mb-2">
                Welcome back, {userInfo.firstName}
              </h1>
              <p className="text-black max-[748px]:text-[15px]">
                Manage your bookings, preferences, and account settings
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger
              value="profile"
              className="flex items-center space-x-2"
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger
              value="bookings"
              className="flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>My Bookings</span>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="flex items-center space-x-2"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <AccountProfile />
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <AccountBooking />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <AccountSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
