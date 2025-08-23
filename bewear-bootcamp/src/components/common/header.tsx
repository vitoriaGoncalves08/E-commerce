"use client";

import { LogInIcon, LogOutIcon, MenuIcon, Search, UserIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Cart } from "./cart";

export const Header = () => {
  const { data: session } = authClient.useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close search when route changes
  useEffect(() => {
    setIsSearchOpen(false);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };  

  return (
    <header className="mt-4 mb-4">
      <div className="container mx-auto px-4">
        <div className="hidden md:flex items-center justify-between py-3">

          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 rounded-full">
                <UserIcon className="h-5 w-5" />
                <span className="text-sm text-gray-600">
                  {session?.user ? `Olá, ${session.user.name?.split(' ')[0] || 'Usuário'}` : 'Entrar'}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {session?.user ? (
                <DropdownMenuItem onClick={() => authClient.signOut()}>
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem asChild>
                  <Link href="/authentication" className="flex items-center">
                    <LogInIcon className="mr-2 h-4 w-4" />
                    <span>Entrar</span>
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/" className="flex-shrink-0">
            <Image src="/logo.svg" alt="BEWEAR" width={120} height={31.37} />
          </Link>

          <div className="flex items-center gap-4 relative">
            <div className="relative" ref={searchInputRef}>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full"
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  if (!isSearchOpen) {
                    setTimeout(() => {
                      document.getElementById('search-input')?.focus();
                    }, 0);
                  }
                }}
              >
                {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
              </Button>
              
              {isSearchOpen && (
                <form 
                  onSubmit={handleSearch}
                  className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg p-2 z-50"
                >
                  <div className="relative">
                    <input
                      id="search-input"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Buscar produtos..."
                      className="w-full pl-3 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                      autoComplete="off"
                    />
                    <button 
                      type="submit"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
                    >
                      <Search className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>

            <Cart />
          </div>
        </div>

        {/* Mobile Header - Visible on mobile */}
        <div className="flex items-center justify-between p-4 md:hidden">
          <Link href="/">
            <Image src="/logo.svg" alt="BEWEAR" width={100} height={26.14} />
          </Link>
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <MenuIcon className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="py-6">
                  {session?.user ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={session.user.image as string | undefined} />
                          <AvatarFallback>
                            {session.user.name?.split(' ')[0]?.[0]}
                            {session.user.name?.split(' ')[1]?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{session.user.name}</h3>
                          <p className="text-sm text-muted-foreground">{session.user.email}</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => authClient.signOut()}
                      >
                        <LogOutIcon className="mr-2 h-4 w-4" />
                        Sair
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h2 className="text-lg font-medium">Olá. Faça seu login!</h2>
                      <Button asChild className="w-full">
                        <Link href="/authentication">
                          <LogInIcon className="mr-2 h-4 w-4" />
                          Entrar
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
            <Cart />
          </div>
        </div>
      </div>
    </header>
  );
};
