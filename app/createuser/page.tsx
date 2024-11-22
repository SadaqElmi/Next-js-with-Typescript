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
  username: string;
  email: string;
  password: string;
}

const CreateUser: React.FC = () => {
  const [user, setUser] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users", user);
      if (response.status === 201) {
        toast.success("User Created Successfully");
        setUser({ username: "", email: "", password: "" });
      }
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        toast.error("User already exists");
      } else {
        console.error(error);
        toast.error("Failed  to create user");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-5">
        <h1 className="text-2xl mb-5 font-bold">Create User</h1>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Create User</CardTitle>
            <CardDescription>Fill in the form to register</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username">UserName</Label>
                  <Input
                    id="username"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    placeholder="Enter Your Username"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Enter Your Email"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    placeholder="Enter Your Password"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button className="w-full" type="submit">
                Register
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
};

export default CreateUser;
