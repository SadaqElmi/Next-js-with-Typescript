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
              <Link href="/">Products</Link>
            </li>
            <li>
              <Link href="/">Categories</Link>
            </li>
            <li>
              <Link href="/">Contact</Link>
            </li>
            <li>
              <Link href="/">About</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
