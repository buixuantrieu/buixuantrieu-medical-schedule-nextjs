"use client";

import { BookOpen, Bot, ChevronRight, Settings2, HeartHandshake, ChartBarDecreasing } from "lucide-react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/constants/routes";

export function NavMain() {
  const pathname = usePathname();
  const navMain = [
    {
      title: "Chuyên khoa",
      icon: HeartHandshake,
      items: [
        {
          title: "Danh sách chuyên khoa",
          url: ROUTES.ADMIN.SPECIALTY,
        },
        {
          title: "Thêm chuyên khoa mới",
          url: ROUTES.ADMIN.NEW_SPECIALTY,
        },
      ],
    },

    {
      title: "Bài viết",
      url: "#",
      icon: ChartBarDecreasing,
      items: [
        {
          title: "Danh sách bài viết",
          url: ROUTES.ADMIN.POST,
        },
        {
          title: "Thêm bài viết",
          url: ROUTES.ADMIN.NEW_POST,
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ];
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Website designed by Xuan Trieu.</SidebarGroupLabel>
      <SidebarMenu>
        {navMain.map((item) => (
          <Collapsible key={item.title} asChild className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem
                      key={subItem.title}
                      className={`${
                        pathname == subItem.url && "bg-black text-white dark:text-black dark:bg-white"
                      } hover:bg-black hover:text-white hover:dark:text-black hover:dark:bg-white`}
                    >
                      <SidebarMenuSubButton asChild>
                        <Link href={subItem.url}>
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
