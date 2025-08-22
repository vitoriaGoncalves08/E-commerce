"use client";

import { LogInIcon, LogOutIcon, MenuIcon, Search, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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

          <div className="flex items-center gap-4">

            <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="h-5 w-5" />
            </Button>


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
              <SheetContent side="left">
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
