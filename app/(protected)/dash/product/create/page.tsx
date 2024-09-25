"use client";

import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const ProductSchema = z.object({
  name: z.string().min(1, { message: "Product name is required" }),
  price: z.string().min(1, { message: "Price is required" }),
});

type ProductType = z.infer<typeof ProductSchema>;

export default function CreateProductPage() {
  const form = useForm<ProductType>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      price: "",
    },
  });

  const onSubmit = (values: ProductType) => {
    console.log(values);
  };

  return (
    <section>
      <div className="container">
        <Form {...form}>
          <form onScroll={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
