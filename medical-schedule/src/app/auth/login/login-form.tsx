"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function LoginForm() {
  const formSchema = z.object({
    email: z.string().max(50).email("Không phải định dạng email!"),
    password: z.string().trim().min(1, "Vui lòng nhập mật khẩu!"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <h1 className="w-[300px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          <div className="grid grid-cols-12 sm:gap-4">
            <div className="col-span-12 mt-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px]">Email:</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-12 mt-1">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px]">Mật khẩu:</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Password..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-12 mt-1">
              <div className="flex justify-end text-[12px] mb-2">
                <Link className="hover:text-[#69b1ff]" href="/auth/register">
                  Bạn chưa có tài khoản?
                </Link>
              </div>
              <Button type="submit" className="w-full rounded">
                Đăng nhập
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </h1>
  );
}
