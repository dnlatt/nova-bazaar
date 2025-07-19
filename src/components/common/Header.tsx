import { Store, User, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
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
      <SheetTitle className="sr-only">Mobile Menu</SheetTitle> {/* Using sr-only for screen reader only */}
      <SheetTrigger asChild>
        <button aria-label="Open mobile menu">
          <Menu className="text-white h-6 w-6" />
        </button>
      </SheetTrigger>
      
      <SheetContent side="left" className="bg-black text-white w-full p-8">
        
        <SheetHeader>
          {/* You can optionally add a visible title here if desired,
            e.g., <SheetTitle className="text-2xl font-bold mb-6">Navigation</SheetTitle>
            For this example, we're relying on the sr-only title for accessibility.
          */}
        </SheetHeader>

        <div className="flex flex-col gap-6 mt-10 text-xl p-4">
          <Link href="/marketplace" className="nav-a hover:text-gray-400 transition-colors duration-200 text-2xl uppercase">
            Marketplace
          </Link>
          <Link href="/rankings" className="nav-a hover:text-gray-400 transition-colors duration-200 text-2xl uppercase">
            Rankings
          </Link>
        
          <Link href="#" className="nav-a flex items-center gap-2 hover:text-gray-400 transition-colors duration-200">
            <User className="h-6 w-6" />
            <span className="sr-only md:not-sr-only">Profile</span> {/* Optional: Add visible text for larger screens, or keep sr-only */}
          </Link>
        </div>
      </SheetContent>
    </Sheet>
      </div>
    </header>
  );
};

export default Header;
