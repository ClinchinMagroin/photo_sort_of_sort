'use client';

import * as React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  LayoutGrid,
  Folder,
  Calendar,
  MapPin,
  Star,
  Trash2,
  Users,
  Sun,
  Camera,
  Settings,
  GanttChartSquare,
  Search,
  Image as ImageIcon,
} from 'lucide-react';

const Logo = () => (
    <div className="flex items-center gap-2.5 font-semibold text-lg tracking-tighter text-primary">
        <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
            <ImageIcon size={20} />
        </div>
        PicSort Pro
    </div>
);

interface DashboardLayoutProps {
    children: React.ReactNode;
    activePage: string;
    setActivePage: (page: string) => void;
}

export function DashboardLayout({ children, activePage, setActivePage }: DashboardLayoutProps) {
  
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Main</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActivePage('Library')} isActive={activePage === 'Library'} tooltip="Library">
                  <LayoutGrid />
                  Library
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup>
             <SidebarGroupLabel>Sort by</SidebarGroupLabel>
            <SidebarMenu>
               <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActivePage('Date')} isActive={activePage === 'Date'} tooltip="Date">
                  <Calendar />
                  Date
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActivePage('Location')} isActive={activePage === 'Location'} tooltip="Location">
                  <MapPin />
                  Location
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Smart Albums</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActivePage('Summer')} isActive={activePage === 'Summer'} tooltip="Last Summer">
                  <Sun />
                  Last Summer
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActivePage('Family')} isActive={activePage === 'Family'} tooltip="Family Photos">
                  <Users />
                  Family Photos
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActivePage('Camera')} isActive={activePage === 'Camera'} tooltip="From my Canon">
                  <Camera />
                  From my Canon
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

           <SidebarGroup>
            <SidebarGroupLabel>Manage</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActivePage('Rules')} isActive={activePage === 'Rules'} tooltip="Custom Rules">
                  <GanttChartSquare />
                  Custom Rules
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActivePage('Settings')} isActive={activePage === 'Settings'} tooltip="Settings">
                  <Settings />
                  Settings
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://placehold.co/40x40.png" alt="User" data-ai-hint="user avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">User</span>
              <span className="text-xs text-muted-foreground">user@example.com</span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b">
          <SidebarTrigger className="md:hidden" />
          <div className="relative flex-1 max-w-md ml-4 md:ml-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search photos..." className="pl-9" />
          </div>
          <Button variant="primary" className="ml-4">
            Find Duplicates
          </Button>
        </header>
        <main className="p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
