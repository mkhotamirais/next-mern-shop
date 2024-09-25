import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashPage() {
  return (
    <section>
      <div className="container">
        <Button asChild>
          <Link href="/dash/product">Product</Link>
        </Button>
        DashPage
      </div>
    </section>
  );
}
