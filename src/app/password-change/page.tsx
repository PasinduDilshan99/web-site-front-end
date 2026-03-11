import PasswordChangePage from '@/pages/PasswordChangePage'
import React from 'react'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Password Change",
};
const page = () => {
  return (
    <div><PasswordChangePage/></div>
  )
}

export default page