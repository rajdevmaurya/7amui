"use client"

import { useSelector } from "react-redux";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Menu } from "@/components/Menu";




export const RootLayoutWrapper = ({ children }) => {
  const isLoggedIn = useSelector((state) => state?.appReducer?.isLoggedIn)
  return <div>
    <Header />
    {isLoggedIn && <Menu />}
    {children}
    <Footer />
  </div>
}


