"use client";

import React, { useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { cn } from "@/utilities/helper";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

function SideBar({ isMenuOpen }: { isMenuOpen: boolean }) {
  const realPath = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const [isNestedOpen, setIsNestedOpen] = useState<boolean[]>([false]);

  function handleNestedOpen(value: number) {
    setIsNestedOpen(isNestedOpen.map((item, index) => (index === value ? !item : item)));
  }

  return (
    <Box
      component="aside"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn("h-full p-3 !shadow-lg z-10 bg-white transition-all duration-300", {
        "w-64": isMenuOpen,
        "w-20 hover:w-64 group": !isMenuOpen,
      })}>
      <Box className="text-center">Logo</Box>

      <List dense component="nav">
        <ListItemButton component={Link} href="/" selected={realPath === "/"}>
          <ListItemIcon className={cn({ "min-w-0 group-hover:min-w-14": !isMenuOpen })}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            primary="Home"
            className={cn("h-6 m-0 py-1 transition-all", {
              "block duration-300": isMenuOpen,
              "hidden duration-100 group-hover:block": !isMenuOpen,
            })}
          />
        </ListItemButton>

        <ListItemButton onClick={() => handleNestedOpen(0)}>
          <ListItemIcon className={cn({ "min-w-0 group-hover:min-w-14": !isMenuOpen })}>
            <SettingsIcon />
          </ListItemIcon>
          <Box
            className={cn("flex-row justify-between align-middle w-full transition-all duration-100", {
              flex: isMenuOpen,
              "hidden group-hover:flex": !isMenuOpen,
            })}>
            <ListItemText primary="Settings" className="h-6 m-0 py-1" />
            {isNestedOpen[0] ? <ExpandLess /> : <ExpandMore />}
          </Box>
        </ListItemButton>
        <Collapse in={isMenuOpen || isHovered ? isNestedOpen[0] : false} timeout="auto" unmountOnExit>
          <List dense disablePadding component="div">
            <ListItemButton
              component={Link}
              href="/settings/member"
              selected={realPath === "/settings/member"}
              className="pl-8">
              <ListItemIcon className={cn({ "min-w-0 group-hover:min-w-14": !isMenuOpen })}>
                <ArrowRightIcon />
              </ListItemIcon>
              <ListItemText
                primary="Member"
                className={cn("h-6 m-0 py-1 transition-all", {
                  "block duration-300": isMenuOpen,
                  "hidden duration-100 group-hover:block": !isMenuOpen,
                })}
              />
            </ListItemButton>
            <ListItemButton component={Link} href="/settings/role" selected={realPath === "/settings/role"} className="pl-8">
              <ListItemIcon className={cn({ "min-w-0 group-hover:min-w-14": !isMenuOpen })}>
                <ArrowRightIcon />
              </ListItemIcon>
              <ListItemText
                primary="Role"
                className={cn("h-6 m-0 py-1 transition-all", {
                  "block duration-300": isMenuOpen,
                  "hidden duration-100 group-hover:block": !isMenuOpen,
                })}
              />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Box>
  );
}

function Header({ isMenuOpen, setIsMenuOpen }: { isMenuOpen: boolean; setIsMenuOpen: (open: boolean) => void }) {
  return (
    <Box component="header" className="w-full h-16 flex justify-between px-4">
      <Box className="flex items-center">
        <IconButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Box className="flex items-center">
        <IconButton>
          <Badge badgeContent={4}>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton>
          <Avatar>P</Avatar>
        </IconButton>
      </Box>
    </Box>
  );
}

function Main({ children }: { children: React.ReactNode }) {
  return (
    <Box component="main" className="flex-1 bg-gray-100 p-4">
      {children}
    </Box>
  );
}

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <Box className="flex h-screen">
      <SideBar isMenuOpen={isMenuOpen} />
      <Box className="flex flex-col flex-1">
        <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <Main>{children}</Main>
      </Box>
    </Box>
  );
}
