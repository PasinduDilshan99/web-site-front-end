// app/profile/page.tsx
import { UNIQUE_CODE_NAME } from "@/utils/constant";
import { redirect } from "next/navigation";

export default function ProfilePage() { 
  redirect("/profile/user");
}
