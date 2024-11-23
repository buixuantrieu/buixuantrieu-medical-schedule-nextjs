"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { VerifyAccount } from "@/api/auth/queries";
import { useFetchUser } from "@/api/user/queries";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export default function VerifyForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");

  const { mutate: verifyAccount } = VerifyAccount();
  const { data, error } = useFetchUser(email as string);
  const [countdown, setCountdown] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (error) {
      if (error instanceof AxiosError) {
        if (error.status === 404) {
          router.push("/notfound");
        }
      }
    }
  }, [error]);

  function calculateCountdown(expireTime: string) {
    const expirationDate = new Date(expireTime);
    const currentTime = new Date();
    const timeDiff = expirationDate.getTime() - currentTime.getTime();

    return Math.max(0, Math.floor(timeDiff / 1000));
  }

  function formatCountdown(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }

  useEffect(() => {
    const expireTime = data?.data.codeVerifyExpiresAt;
    if (expireTime) {
      let initialCountdown = calculateCountdown(expireTime);
      if (initialCountdown <= 0) {
        router.push("/notfound");
      }
      setCountdown(initialCountdown);
      const interval = setInterval(() => {
        initialCountdown = calculateCountdown(expireTime);
        setCountdown(initialCountdown);
        if (initialCountdown <= 0) {
          clearInterval(interval);
        }
      }, 1000);
      setTimer(interval);
      return () => {
        if (timer) {
          clearInterval(timer);
        }
      };
    }
  }, [data?.data.codeVerifyExpiresAt]);

  const FormSchema = z.object({
    otp: z
      .string()
      .min(6, {
        message: "Mã OTP gồm 6 số!",
      })
      .regex(/^\d{6}$/, { message: "Mã OTP không hợp lệ!" }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  function onSubmit(value: z.infer<typeof FormSchema>) {
    if (value.otp == data?.data.codeVerify) {
      verifyAccount(email as string, {
        onSuccess: () => {
          toast.success("Kích hoạt tài khoản thành công!");
          router.push("/auth/login");
        },
      });
    } else {
      form.setError("otp", {
        message: "Mã OTP sai!",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-max flex flex-col gap-4 justify-center items-center">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-4 text-center text-sm text-gray-600">
          <p>Thời gian còn lại: {formatCountdown(countdown)}</p>
        </div>

        <Button className="w-full" type="submit">
          Xác thực
        </Button>
      </form>
    </Form>
  );
}
