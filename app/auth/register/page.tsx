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

const Register = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-5">
        <h1 className="text-2xl mb-5 font-bold">Sing Up</h1>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle> User Register</CardTitle>
            <CardDescription>Fill in the form to Register</CardDescription>
          </CardHeader>
          <form>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Username</Label>
                  <Input
                    id="username"
                    type="username"
                    name="username"
                    placeholder="Enter Your Username"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter Your Password"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Confirm Password</Label>
                  <Input
                    id="Confirm-password"
                    type="Confirm-password"
                    name="Confirm-password"
                    placeholder="Enter Your Confirm Password"
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

export default Register;
