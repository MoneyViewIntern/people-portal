"use client";

import { useEffect, useState } from "react";
import { SettingsModal } from "@/components/modals/settings-modal";
import LoginModal from "@/components/modals/login-modal";
import { ProfileModal } from "../modals/profile-modal";
import { ProfileEditModal } from "../modals/profile-edit-modal";
import { DownloadModal } from "../modals/download-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return(
    <>
    <SettingsModal />
    <ProfileModal />
    <LoginModal />
    <ProfileEditModal/>
    <DownloadModal/>
  </>
  )
};
