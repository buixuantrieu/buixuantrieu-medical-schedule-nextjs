"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RegisterUser } from "@/api/auth/queries";

const formSchema = z
  .object({
    email: z.string().max(50).email("Không phải định dạng email!"),
    fullName: z.string().trim().min(1, "Không được để trống!").max(255),
    cityId: z.string().trim().min(1, "Vui lòng chọn tỉnh/ thành phố!"),
    address: z.string().trim().min(1, "Vui lòng nhập số nhà, tên đường!"),
    districtId: z.string().trim().min(1, "Vui lòng chọn quận/ huyện!"),
    phone: z
      .string()
      .trim()
      .min(1, "Vui lòng nhập số điện thoại!")
      .regex(/^(0[3-9])(\d{8})$|^(0[1-9]{1}[0-9]{1,2})(\d{7})$/, "Không đúng định dạng!"),
    wardId: z.string().trim().min(1, "Vui lòng chọn phường/xã!"),
    password: z
      .string()
      .trim()
      .min(8, "Mật khẩu ít nhất 8 kí tự!")
      .max(255)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
        "Mật khẩu phải chứa ít nhất một chữ cái viết hoa, một chữ cái viết thường, một chữ số và một ký tự đặc biệt!"
      ),
    confirmPassword: z.string(),
    genre: z.string().min(1, "Vui lòng chọn giới tính!"),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Mật khẩu và mật khẩu xác nhận không khớp!",
    path: ["confirmPassword"],
  });

export default function RegisterForm() {
  const { mutate: registerUser } = RegisterUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      fullName: "",
      cityId: "",
      districtId: "",
      wardId: "",
      password: "",
      confirmPassword: "",
      genre: "",
      address: "",
      phone: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    registerUser({ userName: values.fullName, password: values.password });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <div className="grid grid-cols-12 sm:gap-4">
          <div className="col-span-12 mt-1 sm:col-span-7">
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
          <div className="col-span-12 mt-1 sm:col-span-5">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px]">Họ và tên:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter first and last name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-12 mt-1 sm:col-span-4">
            <FormField
              control={form.control}
              name="cityId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tỉnh/ Thành phố:</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Province/city" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem className="text-[13px]" value="1">
                        Quảng Nam
                      </SelectItem>
                      <SelectItem className="text-[13px]" value="2">
                        Huế
                      </SelectItem>
                      <SelectItem className="text-[13px]" value="3">
                        Bình Định
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-12 mt-1 sm:col-span-4">
            <FormField
              control={form.control}
              name="districtId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quận/ huyện:</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="District" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem className="text-[13px]" value="1">
                        Quảng Nam
                      </SelectItem>
                      <SelectItem className="text-[13px]" value="2">
                        Huế
                      </SelectItem>
                      <SelectItem className="text-[13px]" value="3">
                        Bình Định
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-12 mt-1 sm:col-span-4">
            <FormField
              control={form.control}
              name="wardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phường xã:</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Ward/commune" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem className="text-[13px]" value="1">
                        Quảng Nam
                      </SelectItem>
                      <SelectItem className="text-[13px]" value="2">
                        Huế
                      </SelectItem>
                      <SelectItem className="text-[13px]" value="3">
                        Bình Định
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-12 mt-1 sm:col-span-7">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px]">Địa chỉ (số nhà/ đường):</FormLabel>
                  <FormControl>
                    <Input placeholder="House/street number..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-12 mt-1 sm:col-span-5">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px]">Số điện thoại:</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone number..." {...field} />
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px]">Nhập lại mật khẩu:</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Confirm password..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-12 mt-1">
            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Giới tính</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="nam" />
                        </FormControl>
                        <FormLabel className="font-normal">Nam</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="nu" />
                        </FormControl>
                        <FormLabel className="font-normal">Nữ</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-12 mt-1">
            <div className="flex justify-end text-[12px] mb-2">
              <Link className="hover:text-[#69b1ff]" href="/auth/login">
                Bạn đã có tài khoản?
              </Link>
            </div>
            <Button type="submit" className="w-full rounded">
              Đăng kí
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
