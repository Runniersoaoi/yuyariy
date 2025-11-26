"use client";

import { Header } from "@/components/header";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useClusterNotices } from "@/hooks/use-notice-cluster";
import * as Tabs from "@radix-ui/react-tabs";
import * as Separator from "@radix-ui/react-separator";
import { renderMedia } from "@/helpers/renderMedia";
import BiasDistribution from "@/components/bias-distribution";

// enum Newspapers {
//   eltiempo = "/eltiempo-logo-corto.jpg",
//   exitosa = "/exitosa-logo-corto.png",
//   diariocorreo = "/diariocorreo-logo-corto.png",
//   elcomercio = "/elcomercio-logo-corto.png",
//   larepublica = "/larepublica-logo-corto.png",
//   panamericana = "/panamericana-logo-corto.png",
//   peru21 = "/peru21-logo-corto.png",
//   rpp = "/rpp-logo-corto.png",
// }

export default function ArticlePage() {
  const { id } = useParams();
  const { data: articles, loading, error } = useClusterNotices(id as string);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading article...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load article: {error}</p>
      </div>
    );
  }

  const article = articles[0];

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">No article found</p>
      </div>
    );
  }

  const rigthInclination = articles[0].elementos.filter((elemento) =>
    elemento.inclinacion.includes("derecha")
  );
  const leftInclination = articles[0].elementos.filter((elemento) =>
    elemento.inclinacion.includes("izquierda")
  );
  const centerInclination = articles[0].elementos.filter((elemento) =>
    elemento.inclinacion.includes("centro")
  );
  const rigthPercentage = Math.round(
    (rigthInclination.length / articles[0].elementos.length) * 100
  );
  const leftPercentage = Math.round(
    (leftInclination.length / articles[0].elementos.length) * 100
  );
  const centerPercentage = Math.round(
    (centerInclination.length / articles[0].elementos.length) * 100
  );

  return (
    <div className="min-h-screen">
      <Header />

      <article className="container mx-auto px-4 py-12 max-w-7xl flex flex-col gap-10 lg:flex-row">
        <div className="lg:w-9/12 w-full">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">
              Inicio
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="hover:text-foreground transition-colors">
              {article.elementos[0].category}
            </span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium line-clamp-1">
              {article.titulo}
            </span>
          </nav>

          {/* Article Header */}
          <header className="mb-10 space-y-6">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
              {article.titulo}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed text-pretty">
              {article.resumen_general}
            </p>
          </header>

          {/* Featured Image */}
          {article.elementos[0] && (
            <div className="relative aspect-[16/9] mb-12 overflow-hidden bg-muted">
              {renderMedia(article.elementos[0].image) ? (
                <div className="w-full h-full">
                  {renderMedia(article.elementos[0].image)}
                </div>
              ) : (
                <img
                  src={article.elementos[0].image}
                  alt={article.titulo}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              )}
            </div>
          )}

          {/* Tabs Section - Resúmenes */}
          <Tabs.Root defaultValue="centro" className="w-full">
            <Tabs.List className="flex border-b border-border mb-6">
              <Tabs.Trigger
                value="izquierda"
                className="px-4 py-2 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                Izquierda
              </Tabs.Trigger>
              <Tabs.Trigger
                value="centro"
                className="px-4 py-2 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                Centro
              </Tabs.Trigger>
              <Tabs.Trigger
                value="derecha"
                className="px-4 py-2 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                Derecha
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content
              value="izquierda"
              className="prose prose-lg max-w-none"
            >
              <p>{article.resumen_izquierda}</p>
            </Tabs.Content>

            <Tabs.Content value="centro" className="prose prose-lg max-w-none">
              <p>{article.resumen_centro}</p>
            </Tabs.Content>

            <Tabs.Content value="derecha" className="prose prose-lg max-w-none">
              <p>{article.resumen_derecha}</p>
            </Tabs.Content>
          </Tabs.Root>

          {/* Separator */}
        </div>
        <section className="lg:w-4/12 w-full flex flex-col gap-6 text-sm">
          <div className="bg-white border p-4  rounded-xl">
            <h4 className="font-semibold pb-4 text-lg">
              Detalles de cobertura
            </h4>
            <div className="flex justify-between">
              <p>Total de noticias revisadas</p>{" "}
              <p>{article.elementos.length}</p>
            </div>
            <div className="flex justify-between">
              <p>Inclinadas a la izquierda</p> <p>{leftInclination.length}</p>
            </div>
            <div className="flex justify-between">
              <p>Inclinadas a la derecha</p> <p>{rigthInclination.length}</p>
            </div>
            <div className="flex justify-between">
              <p>De centro</p> <p>{centerInclination.length}</p>
            </div>
          </div>
          <div>
            <BiasDistribution
              leftPercentage={leftPercentage}
              centerPercentage={centerPercentage}
              rightPercentage={rigthPercentage}
            />
          </div>
        </section>
      </article>
      <div className="max-w-7xl mx-auto px-4">
        <Separator.Root decorative className="mb-10 h-px w-8/12 bg-border" />

        {/* Related Cluster News */}
        <section className="w-8/12">
          <h2 className="text-2xl mb-4 font-medium text-foreground">
            Diarios que mostraron esta noticia
          </h2>

          <Tabs.Root defaultValue="all" className="w-full">
            {/* Tabs de filtros */}
            <Tabs.List className="flex gap-4 border-b border-border mb-6">
              <Tabs.Trigger
                value="all"
                className="px-3 py-1 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                Todas
              </Tabs.Trigger>
            </Tabs.List>

            {/* Contenido de cada tab */}
            <Tabs.Content value="all" className="space-y-6">
              {articles.map((notice, idx) => (
                <div key={idx} className="space-y-4">
                  {notice.elementos?.map((el, i) => (
                    <div
                      key={i}
                      className="p-4 border rounded-lg bg-card shadow-sm flex flex-col gap-2"
                    >
                      {/* Diario */}
                      <p>{new URL(el.link).hostname}</p>

                      {/* Título */}
                      <h3 className="text-lg font-semibold">
                        {el.title.replace(/-/g, " ")}
                      </h3>

                      {/* Resumen central por defecto */}
                      <p className="text-muted-foreground text-sm">
                        2025-10-01
                      </p>

                      {/* Link */}
                      <a
                        href={el.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary text-sm hover:underline"
                      >
                        Leer artículo completo
                      </a>
                    </div>
                  ))}
                </div>
              ))}
            </Tabs.Content>
          </Tabs.Root>
        </section>
      </div>
    </div>
  );
}
