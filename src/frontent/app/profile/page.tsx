"use client";

import { useAuth } from "@/context/AuthContext";
import { useGroupNotices } from "@/hooks/use-notice";
import { ArticleCard } from "@/components/article-card";
import { renderMedia } from "@/helpers/renderMedia";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Header } from "@/components/header";

export default function ProfilePage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { data: articles, loading: articlesLoading } = useGroupNotices();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  if (authLoading || articlesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Cargando...</p>
      </div>
    );
  }

  if (!user) return null;

  const favoriteArticles = articles?.filter((article) =>
    user.favorites?.includes(article.cluster.toString())
  );

  const historyArticles = articles?.filter((article) =>
    user.history?.includes(article.cluster.toString())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h1 className="text-3xl font-serif font-bold mb-2">
            Bienvenido nuevamente, {user.name}
          </h1>
          <p className="text-muted-foreground">{user.email}</p>
        </div>

        <div className="space-y-12">
          {/* Favorites Section */}
          <section>
            <h2 className="text-2xl font-serif font-bold mb-6 pb-2 border-b">
              Tus noticias favoritas
            </h2>
            {favoriteArticles && favoriteArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {favoriteArticles.map((article) => (
                  <ArticleCard
                    key={article.cluster.toString()}
                    id={article.cluster.toString()}
                    title={article.titulo}
                    content={article.resumen_general}
                    excerpt={article.resumen_centro}
                    category={article.elementos[0].category}
                    date={article.elementos[0].creation_date}
                    media={renderMedia(article.elementos[0].image)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">
                No has añadido ningun favorito aún
              </p>
            )}
          </section>

          {/* History Section */}
          <section>
            <h2 className="text-2xl font-serif font-bold mb-6 pb-2 border-b">
              Tu historial de lectura
            </h2>
            {historyArticles && historyArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {historyArticles.map((article) => (
                  <ArticleCard
                    key={article.cluster.toString()}
                    id={article.cluster.toString()}
                    title={article.titulo}
                    content={article.resumen_general}
                    excerpt={article.resumen_centro}
                    category={article.elementos[0].category}
                    date={article.elementos[0].creation_date}
                    media={renderMedia(article.elementos[0].image)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">
                No has visto ninguna noticia aún
              </p>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
