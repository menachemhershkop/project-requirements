import type { ReactNode } from "react"
import { Link, Outlet } from "react-router-dom"

type LayoutProps = {
  children: ReactNode
}

function Layout() {
  return (
    <div>
      <div className="navbar">
        <button><Link to="/">Home</Link></button>
        <button><Link to='/LoginPage'>login</Link></button>
      </div>
        <main><Outlet /></main>
    </div>
  )
}

export default Layout
