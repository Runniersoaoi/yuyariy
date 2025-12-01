"use client";

import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";

interface ArticleCardProps {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  date: string;
  image?: string;
  media?: React.ReactNode; // 👈 nueva prop
  featured?: boolean;
}

export function ArticleCard({
  id,
  title,
  content,
  excerpt,
  category,
  date,
  image,
  media,
  featured = false,
}: ArticleCardProps) {
  const { user, updateUser, isAuthenticated } = useAuth();
  const [isFavorite, setIsFavorite] = useState(
    user?.favorites?.includes(id) || false
  );

  // Update local state when user changes (e.g. login/logout)
  useEffect(() => {
    setIsFavorite(user?.favorites?.includes(id) || false);
  }, [user, id]);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated || !user) {
      alert("Please login to add favorites");
      return;
    }

    const newFavorites = isFavorite
      ? user.favorites?.filter((fav) => fav !== id) || []
      : [...(user.favorites || []), id];

    // Optimistic update
    setIsFavorite(!isFavorite);
    updateUser({ ...user, favorites: newFavorites });

    try {
      await fetch(`https://yuyariy-backend-production.up.railway.app/api/users/${user.email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ favorites: newFavorites }),
      });
    } catch (error) {
      console.error("Failed to update favorites", error);
      // Revert on error
      setIsFavorite(isFavorite);
      updateUser(user);
    }
  };

  const addToHistory = async () => {
    if (!isAuthenticated || !user) return;

    // Avoid duplicates at the end of the list, move to front or end?
    // Let's just add to the end if not already the last one
    const history = user.history || [];
    if (history[history.length - 1] === id) return;

    const newHistory = [...history, id];
    updateUser({ ...user, history: newHistory });

    try {
      await fetch(`https://yuyariy-backend-production.up.railway.app/api/users/${user.email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history: newHistory }),
      });
    } catch (error) {
      console.error("Failed to update history", error);
    }
  };

  const CardContent = () => (
    <article className="space-y-4 relative group">
      <div className="relative aspect-[16/9] overflow-hidden bg-muted rounded-lg">
        {media ? (
          <div className="w-full h-full">{media}</div>
        ) : (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}
        {/* Favorite Button */}
        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors z-10"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          <span>{category}</span>
          <span>•</span>
          <time dateTime={date}>{date}</time>
        </div>
        <h2
          className={`font-serif font-bold leading-tight text-balance group-hover:text-primary transition-colors ${
            featured ? "text-3xl md:text-4xl line-clamp-3" : "text-xl md:text-2xl"
          }`}
        >
          {title}
        </h2>
        <p
          className={`text-muted-foreground leading-relaxed text-pretty ${
            featured ? "text-lg line-clamp-3" : "text-sm line-clamp-2"
          }`}
        >
          {featured ? content : excerpt}
        </p>
        {featured && (
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            Leer más
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        )}
      </div>
    </article>
  );

  return (
    <Link href={`/article/${id}`} className="block" onClick={addToHistory}>
      <CardContent />
    </Link>
  );
}
