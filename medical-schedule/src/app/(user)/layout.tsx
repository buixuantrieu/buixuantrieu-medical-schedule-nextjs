"use client";

import { useGetUserInfo } from "@/api/user/queries";
import { ModeToggle } from "@/components/mode-toggle";
import { ROUTES } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const { data } = useGetUserInfo();

  return (
    <div className="flex flex-col min-h-[100vh]">
      <div className="fixed bottom-1 right-1 z-10">
        <ModeToggle />
      </div>
      <header className="px-12 py-5 border-b dark:border-[#6CACE4] flex justify-between items-center">
        <Link href={ROUTES.USER.HOME}>
          <Image src="/images/hellobacsi.webp" alt="Logo" width={107} height={24} priority className="" />
        </Link>
        <div className="flex gap-6">
          <Link href="/">Trang chủ</Link>
          <Link href="/">Cộng đồng</Link>
        </div>
        <div>login</div>
      </header>
      <main className="flex-1 relative">{children}</main>
    </div>
  );
};

export default AuthLayout;
