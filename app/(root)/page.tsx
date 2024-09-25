"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="py-32">
      <div className="container flex items-center justify-center">
        <div className="flex flex-col justify-center items-center space-y-4">
          <h1 className="text-3xl mx-auto font-semibold">Welcome</h1>
          <p>ini adalah website shop denga next dan express</p>
          <Button asChild size={"lg"}>
            <Link href="/product">Product</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
