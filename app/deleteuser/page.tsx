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

const DeleteUser = () => {
  const [username, setUsername] = useState("");

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username.trim()) {
      toast.error("Username is required");
      return;
    }

    try {
      const response = await axios.delete("/api/users", {
        data: { username }, // Send the username as the request body
      });

      if (response.status === 200) {
        toast.success("User deleted successfully");
        setUsername(""); // Reset the input field
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        toast.error("User not found");
      } else {
        console.error(error);
        toast.error("Failed to delete user");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-5">
        <h1 className="text-2xl mb-5 font-bold">Delete User</h1>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Delete User</CardTitle>
            <CardDescription>Fill in the form to delete a user</CardDescription>
          </CardHeader>
          <form onSubmit={handleDelete}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username">UserName</Label>
                  <Input
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter the Username"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button className="w-full" type="submit">
                Delete
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
};

export default DeleteUser;
