import { Outlet, useLocation } from "react-router-dom"
import { Navbar } from "../components/shared/Navbar"
import { Footer } from "../components/shared/Footer"
import { Banner } from "../components/home/Banner"
import { Newsletter } from "../components/home/Newsletter"

export const RootLayout = () => {

  const { pathname } = useLocation()

  return (
    <div className="flex flex-col h-screen font-montserrat">

        <Navbar />

        {
          pathname === '/' && (
            <Banner />
          )
        }

        <main className="container flex-1 my-8">
        <Outlet />
        </main>

        {
          pathname === '/' && (
            <Newsletter />
          )
        }

        <Footer />

    </div>
  )
}
