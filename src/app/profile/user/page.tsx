"use client";
import UserProfileContent from "@/components/user-profile-components/UserProfileContent";
import { useAuth } from "@/context/AuthContext";
import { USER_PROFILE_VIEW_PRIVILEGE } from "@/utils/privileges";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserProfilePage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (
      user &&
      !user.privileges.includes(USER_PROFILE_VIEW_PRIVILEGE)
    ) {
      router.push("/");
    }
  }, [user, router]);

  return <UserProfileContent />;
}
