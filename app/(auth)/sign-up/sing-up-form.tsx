"use client";

import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

const LoginSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Please enter your email address" })
      .email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(1, { message: "Please enter your password" })
      .min(6, { message: "Please enter at least 6 characters" }),
    confPassword: z
      .string()
      .min(1, { message: "Please enter your password" })
      .min(6, { message: "Please enter at least 6 characters" }),
  })
  .refine((data) => data.password === data.confPassword, {
    path: ["confPassword"],
    message: "Passwords do not match",
  });

type LoginType = z.infer<typeof LoginSchema>;

export default function SignUpForm() {
  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "", confPassword: "" },
  });

  const onSubmit = (values: LoginType) => {
    console.log(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
        <div className="flex justify-center">
          <Button asChild variant="link">
            <Link href="/sign-in">Already have an accout?</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
