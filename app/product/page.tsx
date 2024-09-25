import { Product } from "../types";

const url = process.env.NEXT_PUBLIC_URL;

export default async function ProductPage() {
  const response = await fetch(`${url}/v1/product`);
  const data: Product[] = await response.json();

  return (
    <div>
      <div className="container">
        {data?.map((item) => (
          <div key={item?._id}>
            <div>{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
