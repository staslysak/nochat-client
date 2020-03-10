import React from "react";
import {
  Group as GroupIcon,
  Settings as SettingsIcon,
  TouchApp as TouchAppIcon
} from "@material-ui/icons";

export const menuSchema = [
  {
    title: "New Group",
    link: "/create_team",
    action: ({ onToggle }) => onToggle,
    icon: <GroupIcon />
  },
  {
    title: "New Channel",
    link: "/create_channel",
    action: ({ onToggle }) => onToggle,
    icon: <TouchAppIcon />
  },
  {
    title: "Settings",
    link: "/settings",
    action: ({ onToggle }) => onToggle,
    icon: <SettingsIcon />
  },
  {
    title: "Log Out",
    action: ({ onLogout }) => onLogout
  }
];
