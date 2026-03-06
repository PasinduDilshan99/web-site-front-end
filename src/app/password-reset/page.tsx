import PasswordResetPage from '@/pages/PasswordResetPage'
import React from 'react'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Password Reset",
};
const page = () => {
  return (
    <div><PasswordResetPage/></div>
  )
}

export default page