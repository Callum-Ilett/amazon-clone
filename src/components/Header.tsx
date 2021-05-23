import Image from "next/image";

import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";

import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";
import { useAppSelector } from "lib/hooks";
import { selectItems } from "lib/redux/slices/basketSlice";

const Header = () => {
  const [session] = useSession();
  const items = useAppSelector(selectItems);

  return (
    <header className="sticky top-0 z-50">
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Link href="/">
            <Image
              className="cursor-pointer"
              src="/images/logo.png"
              alt="Amazon Logo"
              width={150}
              height={40}
              objectFit="contain"
            />
          </Link>
        </div>

        <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
          <input
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
            type="text"
          />

          <SearchIcon className="h-12 p-4" />
        </div>

        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div
            className="link"
            onClick={() => (!session ? signIn() : signOut())}
          >
            <p>{session ? `Hello ${session.user?.name}` : "Sign In"}</p>
            <p className="font-extrabold md:text-small">Account &amp; Lists</p>
          </div>

          <Link href="/orders">
            <div className="link">
              <p>Returns</p>
              <p className="font-extrabold md:text-small">&amp; Orders</p>
            </div>
          </Link>

          <Link href="/checkout">
            <div className="relative link flex items-center">
              <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
                {items.length}
              </span>
              <ShoppingCartIcon className="h-10" />
              <p className="hidden md:inline font-extrabold md:text-sm mt-2">
                Basket
              </p>
            </div>
          </Link>
        </div>
      </div>

      <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
        <p className="link flex items-center">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>

        <p className="link">Prime Video</p>
        <p className="link">Amazon Buisness</p>
        <p className="link">Today's Deals</p>

        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Food &amp; Grocery</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
        <p className="link hidden lg:inline-flex">Health &amp; Personal Care</p>
      </div>
    </header>
  );
};

export default Header;
