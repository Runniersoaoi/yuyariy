"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/context/AuthContext";

const categories = [
  { name: "Mundo", href: "/category/mundo" },
  { name: "Politica", href: "/category/politica" },
  { name: "Economia", href: "/category/economia" },
];

export function Header() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          <Link
            href={"/platform"}
            className="font-serif text-3xl font-bold tracking-tight text-foreground"
          >
            Yuyariy
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {category.name}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <Link
                  href="/profile"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Mi perfil
                </Link>
                <button
                  onClick={logout}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/register"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Registrarse
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
                <hr className="my-4" />
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/profile"
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                    >
                      Mi Perfil
                    </Link>
                    <button
                      onClick={logout}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors text-left"
                    >
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                    >
                      Register
                    </Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
