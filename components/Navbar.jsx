import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex fixed top-0 left-0 px-8 w-screen h-16 justify-between items-center bg-transparent backdrop-blur-lg z-20">
      <div>
        <Link href="/" className="text-3xl font-bold">
          Estate City
        </Link>
      </div>

      <div className="flex h-full ">
        <ul className="flex ">
          <li>
            <Link href="/" passHref>
              <div className="h-full flex items-center justify-center ">
                <h3 className="text-xl">Home</h3>
              </div>
            </Link>
          </li>

          <li>
            <Link href="/search" passHref>
              <div className="h-full flex items-center justify-center ">
                <h3 className="text-xl ">Search</h3>
              </div>
            </Link>
          </li>

          <li>
            <Link href="/search?purpose=for-sale" passHref>
              <div className="h-full flex items-center justify-center ">
                <h3 className="text-xl">Buy</h3>
              </div>
            </Link>
          </li>

          <li>
            <Link href="/search?purpose=for-rent" passHref>
              <div className="h-full flex items-center justify-center ">
                <h3 className="text-xl">Rent</h3>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
