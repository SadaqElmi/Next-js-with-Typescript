"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import axios from "axios";

interface FormData {
  id: string; // Include ID for identifying the user to update
  username: string;
  email: string;
  password: string;
}

const UpdateUser = () => {
  const [updateUser, setUpdateUser] = useState<FormData>({
    id: "", // Initialize with an empty string
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.put("/api/users", updateUser);
      if (response.status === 200) {
        toast.success("User updated successfully");
        setUpdateUser({ id: "", username: "", email: "", password: "" }); // Reset form
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        toast.error("User not found");
      } else {
        console.error(error);
        toast.error("Failed to update user");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <h1 className="text-2xl mb-5 font-bold">Update User</h1>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Update User</CardTitle>
          <CardDescription>
            Fill in the form to update user details
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="id">User ID</Label>
                <Input
                  id="id"
                  name="id"
                  value={updateUser.id}
                  onChange={handleChange}
                  placeholder="Enter User ID"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">UserName</Label>
                <Input
                  id="username"
                  name="username"
                  value={updateUser.username}
                  onChange={handleChange}
                  placeholder="Enter Your Username"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={updateUser.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  value={updateUser.password}
                  onChange={handleChange}
                  placeholder="Enter Your Password"
                  type="password"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button className="w-full" type="submit">
              Update
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default UpdateUser;
