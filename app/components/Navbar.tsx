import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  return (
    <nav className="w-full relative flex items-center justify-between max-w-96 mx-auto px-2 sm:max-w-2xl sm:px-4 lg:max-w-5xl lg:px-6 py-4">
    <Link href="/" className="font-bold text-3xl">  
    TS <span className="text-primary">BLOG</span>
    </Link>
    <ModeToggle/>
    </nav>
  )
}
