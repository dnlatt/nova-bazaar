import { Store, User, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FC } from "react";
import Link from 'next/link'

const Header: FC = () => {
  return (
    <header className="flex justify-between items-center p-6 bg-[#1C1C24] max-container">
      <Link href="/">
        <div className="flex font-bold text-white">
          <Store className="text-secondary"/> &nbsp; Nova Bazaar
        </div>
      </Link>
      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-6 text-sm">
        <Link href="/marketplace" className="nav-a">Marketplace</Link>
        <Link href="/rankings" className="nav-a">Rankings</Link>
        <Link href="#" className="nav-a"><User /></Link>
      </nav>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <Menu className="text-white h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="left" className="bg-black text-white">
            <div className="flex flex-col gap-4 mt-10 text-sm">
              <Link href="/marketplace" className="nav-a">Marketplace</Link>
              <Link href="/rankings" className="nav-a">Rankings</Link>
              <Link href="#" className="nav-a"><User /></Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
