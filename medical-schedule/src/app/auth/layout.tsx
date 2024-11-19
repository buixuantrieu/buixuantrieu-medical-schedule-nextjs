import { ModeToggle } from "@/components/mode-toggle";
import { ROUTES } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-[100vh]">
      <div className="fixed bottom-1 right-1">
        <ModeToggle />
      </div>
      <header className="pb-2 border-b dark:border-[#6CACE4] ">
        <Link href={ROUTES.USER.HOME}>
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={100}
            height={50}
            priority
            className="aspect-[2/1] xl:w-[150px] xl:h-[75px]"
          />
        </Link>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default AuthLayout;
