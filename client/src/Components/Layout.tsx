import type { ReactNode } from "react"
import { Link } from "react-router-dom"

type LayoutProps = {
    children : ReactNode
}

function Layout({children}:LayoutProps) {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to='/LoginPage'>login</Link>
      <main>{children}</main>
    </div>
  )
}

export default Layout
