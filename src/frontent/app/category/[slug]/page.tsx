"use client";

import { Header } from "@/components/header";
import { ArticleCard } from "@/components/article-card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { renderMedia } from "@/helpers/renderMedia";
import { useGroupNotices } from "@/hooks/use-notice";
import { useCategoryNotices } from "@/hooks/use-notice-category";

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const categoryName =
    params.slug.charAt(0).toUpperCase() + params.slug.slice(1);

  const {
    data: articles,
    loading,
    error,
  } = useCategoryNotices(categoryName.toLowerCase());

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-muted-foreground">
        Cargando artículos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Ocurrió un error al cargar los artículos.
      </div>
    );
  }

  // Filtrar artículos por categoría (ignorando mayúsculas/minúsculas)
  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">
            Inicio
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">{categoryName}</span>
        </nav>

        {/* Category Header */}
        <div className="mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-balance">
            {categoryName}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Mantente informado con las últimas noticias, análisis y perspectivas
            de {categoryName.toLowerCase()} a nivel global.
          </p>
        </div>

        {/* Articles Grid */}
        {articles.length === 0 ? (
          <p className="text-muted-foreground text-center">
            No hay artículos disponibles para esta categoría.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {articles.map((article) => (
              <ArticleCard
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
        )}
      </main>
    </div>
  );
}
