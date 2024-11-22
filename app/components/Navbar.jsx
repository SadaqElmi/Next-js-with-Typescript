import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <>
      <header className="p-4 flex justify-around items-center bg-black text-white">
        <h1>Navbar</h1>
        <nav className="">
          <ul className="flex gap-4">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/createuser">Create User</Link>
            </li>
            <li>
              <Link href="/updateuser">Update User</Link>
            </li>
            <li>
              <Link href="/deleteuser">Delete User</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
