"use client";

import { useGetUserInfo } from "@/api/user/queries";
import { ModeToggle } from "@/components/mode-toggle";
import { ROUTES } from "@/constants/routes";
import { MessageSquareMore } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import BoxChat from "./box-chat";
import io from "socket.io-client";
const socket = io("http://localhost:8080");

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  const { data } = useGetUserInfo();
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    if (data?.data.id) {
      socket.emit("login", data.data.id);
    }
  }, [data]);

  const renderBoxChat = useMemo(
    () => <BoxChat socket={socket} isShow={isShow} userId={data?.data.id} />,
    [isShow, data]
  );
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
        <div>
          <span className="cursor-pointer">
            <MessageSquareMore onClick={() => setIsShow(true)} />
          </span>
        </div>
      </header>
      <main className="flex-1 relative">{children}</main>
      <div className="fixed right-[44px] bottom-2">{renderBoxChat}</div>
    </div>
  );
};

export default UserLayout;
