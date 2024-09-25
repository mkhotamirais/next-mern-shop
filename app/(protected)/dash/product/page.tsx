import { Product } from "@/app/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const url = process.env.NEXT_PUBLIC_URL;

export default async function ProductPage() {
  const response = await fetch(`${url}/v1/product`);
  const data: Product[] = await response.json();
  return (
    <section>
      <div className="container">
        <div>
          <Button asChild>
            <Link href="/dash/product/create">Create Product</Link>
          </Button>
          {data?.map((item) => (
            <div key={item._id}>
              <div>{item.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
