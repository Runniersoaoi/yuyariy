"use client";

import { Header } from "@/components/header";
import { ArticleCard } from "@/components/article-card";
import { useGroupNotices } from "@/hooks/use-notice";
import { renderMedia } from "@/helpers/renderMedia";

export default function HomePage() {
  const { data: articles, loading, error } = useGroupNotices();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading articles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load articles: {error}</p>
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">No articles found</p>
      </div>
    );
  }

  // Tomamos el primero como destacado
  const featuredArticle = articles[0];
  const latestArticles = articles.slice(1);

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Featured Article */}
        {featuredArticle && (
          <section className="mb-16">
            <ArticleCard
              id={featuredArticle.cluster.toString()}
              title={featuredArticle.titulo}
              content={featuredArticle.resumen_general}
              excerpt={featuredArticle.resumen_centro}
              category={featuredArticle.elementos[0].category}
              date={featuredArticle.elementos[0].creation_date}
              media={renderMedia(featuredArticle.elementos[0].image)}
              featured
            />
          </section>
        )}

        {/* Latest Articles Grid */}
        <section>
          <h2 className="font-serif text-2xl font-bold mb-8 pb-4 border-b border-border">
            Latest Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {latestArticles.map((article) => (
              <ArticleCard
                key={article.cluster.toString()}
                id={article.cluster.toString()}
                title={article.titulo}
                content={article.resumen_general}
                excerpt={article.resumen_centro}
                category={article.elementos[0].category}
                date={article.elementos[0].creation_date}
                media={renderMedia(article.elementos[0].image)}
                featured
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 The Chronicle. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                About
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Contact
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
