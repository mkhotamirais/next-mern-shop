"use client";

import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { url } from "@/lib/constants";
import { Loader2 } from "lucide-react";

const LoginSchema = z
  .object({
    name: z.string().min(1, { message: "Please enter your name" }),
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
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "", confPassword: "" },
  });

  const onSubmit = async (values: LoginType) => {
    setPending(true);
    axios
      .post(`${url}/v1/signup`, values)
      .then((res) => {
        toast.success(res?.data?.message);
        router.refresh();
        router.push("/sign-in");
      })
      .catch((err) => {
        toast.error(err.response.data.error || err.message);
      })
      .finally(() => setPending(false));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input disabled={pending} placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input disabled={pending} type="email" placeholder="Email" {...field} />
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
                <Input disabled={pending} type="password" placeholder="******" {...field} />
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
        <Button disabled={pending} type="submit" className="w-full">
          {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
