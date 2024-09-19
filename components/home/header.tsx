import React from "react";
import { ModeToggle } from "../mode-toggle";
import Link from "next/link";
import { Button } from "../ui/button";

export function Header() {
  return (
    <header className="border-b">
      <div className="container">
        <div className="h-16 flex justify-between items-center">
          <div>
            <Logo />
          </div>
          <nav className="flex gap-4 items-center">
            <div>nav</div>
            <div className="flex gap-2">
              <Button asChild variant={"outline"}>
                <Link href="/sign-in">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/sign-up">Register</Link>
              </Button>
            </div>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}

export function Logo() {
  return (
    <Link href="/" className="font-bold text-xl">
      MERN<span className="text-primary">SHOP</span>
    </Link>
  );
}
