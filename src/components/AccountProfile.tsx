import { use, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Edit } from "lucide-react";
import { motion } from "motion/react";
import { useGetUserQuery, useUpdateUserMutation } from "@/lib/api";

export function AccountProfile() {
  const { data: user, isLoading, isError, error } = useGetUserQuery(undefined);
  const [updateUser] = useUpdateUserMutation();

  const [editMode, setEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    nIdOrPassPortNum: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (!user) return;

    const defaultValue = editMode ? "" : "Not Provided";

    setUserInfo({
      firstName: user.firstName || defaultValue,
      lastName: user.lastName || defaultValue,
      dateOfBirth: user.dateOfBirth
        ? new Date(user.dateOfBirth).toISOString().split("T")[0]
        : "",
      nIdOrPassPortNum: user.nIdOrPassPortNum || defaultValue,
      email: user.email || defaultValue,
      phone: user.phoneNumbers[0] || defaultValue,
      address: user.address || defaultValue,
    });
  }, [user, editMode]);

  const handleSubmit = () => {
    updateUser({
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      dateOfBirth: userInfo.dateOfBirth,
      nIdOrPassPortNum: userInfo.nIdOrPassPortNum,
      email: userInfo.email,
      phone: [userInfo.phone],
      address: userInfo.address,
    });
    setEditMode(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {(error as any)?.data?.message || "Unknown error"}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Personal Information</CardTitle>
            <Button variant="outline" onClick={() => setEditMode(!editMode)}>
              <Edit className="w-4 h-4 mr-2" />
              {editMode ? "Cancel" : "Edit"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>First Name</Label>
              <Input
                value={userInfo.firstName}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, firstName: e.target.value })
                }
                disabled={!editMode}
              />
            </div>
            <div>
              <Label>Last Name</Label>
              <Input
                value={userInfo.lastName}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, lastName: e.target.value })
                }
                disabled={!editMode}
              />
            </div>
          </div>
          <div>
            <Label>Date of Birth</Label>
            <Input
              type="date"
              value={userInfo.dateOfBirth}
              onChange={(e) =>
                setUserInfo({ ...userInfo, dateOfBirth: e.target.value })
              }
              disabled={!editMode}
            />
          </div>
          <div>
            <Label>National ID / Passport number</Label>
            <Input
              value={userInfo.nIdOrPassPortNum}
              onChange={(e) =>
                setUserInfo({ ...userInfo, nIdOrPassPortNum: e.target.value })
              }
              disabled={!editMode}
            />
          </div>
          <div>
            <Label>Email Address</Label>
            <Input
              type="email"
              value={userInfo.email}
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
              disabled={!editMode}
            />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input
              type="tel"
              value={userInfo.phone}
              onChange={(e) =>
                setUserInfo({ ...userInfo, phone: e.target.value })
              }
              disabled={!editMode}
            />
          </div>
          <div>
            <Label>Address</Label>
            <Input
              value={userInfo.address}
              onChange={(e) =>
                setUserInfo({ ...userInfo, address: e.target.value })
              }
              disabled={!editMode}
            />
          </div>

          {editMode && (
            <div className="flex space-x-3">
              <Button
                className="luxury-gradient border-0"
                onClick={handleSubmit}
              >
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setEditMode(false)}>
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
