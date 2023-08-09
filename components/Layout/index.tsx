import { ReactNode } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

interface IProps {
  children: ReactNode
}

const Layout = ({ children }: IProps) => {
  return <>
    <Navbar />
    <main>{children}</main>
    <Footer />
  </>
}

export default Layout;