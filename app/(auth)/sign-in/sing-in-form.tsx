"use client";

import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { url } from "@/lib/constants";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Please enter your email address" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(1, { message: "Please enter your password" })
    .min(6, { message: "Please enter at least 6 characters" }),
});

type LoginType = z.infer<typeof LoginSchema>;

export default function SignInForm() {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginType) => {
    setPending(true);
    axios
      .create({ withCredentials: true })
      .patch(`${url}/v1/signin`, values)
      .then((res) => {
        toast.success(res?.data?.message);
        router.refresh();
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.error || err.message);
      })
      .finally(() => setPending(false));
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
                <Input disabled={pending} type="password" placeholder="Password" {...field} />
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
            <Link href="/sign-up">Do not have an accout?</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
