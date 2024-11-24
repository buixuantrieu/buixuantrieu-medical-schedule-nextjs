"use client";

import { useRouter } from "next/navigation";
import { LoginUser } from "@/api/auth/queries";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ROLE } from "@/type/enum";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { QueryKeys } from "@/api/user/queries";
import { ROUTES } from "@/constants/routes";
import toast from "react-hot-toast";

export default function LoginForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: loginUser } = LoginUser();
  const formSchema = z.object({
    email: z.string().min(1, "Vui lòng nhập email!").max(50).email("Không phải định dạng email!"),
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
    loginUser(
      { email: values.email, password: values.password },
      {
        onSuccess: async (result) => {
          localStorage.setItem("accessToken", result.data.accessToken);
          document.cookie = `refreshToken=${result.data.refreshToken}; max-age=${
            7 * 24 * 60 * 60
          }; path=/; secure; samesite=strict`;
          await queryClient.invalidateQueries({
            queryKey: [QueryKeys.GET_USER_INFO],
          });
          toast.success("Đăng nhập thành công!");
          if (result.data.user.roleId === ROLE.ADMIN) {
            router.push(ROUTES.ADMIN.DASHBOARD);
          } else if (result.data.user.roleId === ROLE.DOCTOR) {
            console.log("doctor");
          } else {
            router.push(ROUTES.USER.HOME);
          }
        },
        onError: () => {
          form.setError("password", { message: "Sai email hoặc mật khẩu!" });
        },
      }
    );
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
