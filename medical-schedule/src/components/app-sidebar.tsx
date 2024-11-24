"use client";

import { SearchForm } from "@/components/search-form";
import { VersionSwitcher } from "@/components/version-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/constants/routes";

const data = {
  navMain: [
    {
      title: "Hello bác sĩ",
      items: [
        {
          title: "Trang chủ",
          url: ROUTES.ADMIN.DASHBOARD,
        },
      ],
    },
    {
      title: "Chuyên khoa",
      items: [
        {
          title: "Danh sách chuyên khoa",
          url: ROUTES.ADMIN.SPECIALTY,
        },
        {
          title: "Thêm chuyên mục khoa",
          url: ROUTES.ADMIN.NEW_SPECIALTY,
        },
      ],
    },
    {
      title: "Bài Viết Sức Khỏe",
      items: [
        {
          title: "Danh sách bài Viết",
          url: "#",
        },
        {
          title: "Thêm bài Viết mới",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items?.map((item) => (
                  <SidebarMenuItem
                    className={`dark:hover:bg-white hover:bg-black dark:hover:text-black hover:text-white ${
                      item.url == pathname && "dark:bg-white bg-black dark:text-black text-white"
                    }`}
                    key={item.title}
                  >
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
