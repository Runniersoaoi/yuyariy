"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F3F4F1] flex flex-col">
      {/* Top Bar */}
      <div className="w-full py-2 px-4 flex justify-center border-b border-gray-200 bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <Link
          href="/platform"
          className="text-sm font-medium hover:underline text-gray-600"
        >
          Ingresar a la plataforma de noticias
        </Link>
      </div>

      <main className="flex-1 flex flex-col lg:flex-row">
        {/* Left Content */}
        <div className="flex-1 flex flex-col justify-center px-8 lg:px-24 py-12 lg:py-0">
          <div className="max-w-xl">
            <h1 className="font-serif text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Vea cada lado de cada historia
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Únase a nuestra comunidad de lectores de noticias inteligentes y bien informados.
              <br />
              <br />
              Obtenga acceso ilimitado a nuestro servicio de noticias de puntos ciegos, desbloquee calificaciones de sesgo y factualidad para miles de fuentes de noticias y mucho más.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/register">
                <Button className="bg-[#2D2D2D] hover:bg-black text-white px-8 py-6 text-lg rounded-md w-full sm:w-auto">
                  Registrarme
                </Button>
              </Link>
            </div>

          
          </div>
        </div>

        {/* Right Content - Visuals */}
        <div className="flex-1 bg-gray-100 relative overflow-hidden hidden lg:block">
          <div className="absolute inset-0 flex items-center justify-center p-8">
            {/* We will use a grid of mock cards here to simulate the image */}
            <div className="grid grid-cols-2 gap-4 transform rotate-3 scale-110 opacity-90">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white p-4 rounded-lg shadow-lg w-64 h-48 flex flex-col justify-between border border-gray-200"
                >
                  <div className="h-24 bg-gray-200 rounded mb-2 animate-pulse" />
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          </div>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#F3F4F1] w-32" />
        </div>
      </main>
    </div>
  );
}
