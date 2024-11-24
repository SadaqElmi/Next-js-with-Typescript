"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const GetAllUsers = () => {
  const GetAllUsers = async () => {
    const res = await axios.get("/api/users");
    return res.data;
  };
  const [users, setUsers] = useState([]);

  useEffect(() => {
    GetAllUsers().then((res) => {
      setUsers(res);
    });
  }, []);
  return (
    <>
      <div className="flex flex-col justify-center items-center mx-auto">
        <>
          <h1>Users as a Table</h1>
          <Table className="mx-auto px-5">
            <TableCaption>A list of Users</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">UserName</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user: any) => (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      </div>
    </>
  );
};

export default GetAllUsers;
