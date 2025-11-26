import { render, screen } from "@testing-library/react";
import { ArticleCard } from "@/components/article-card";

// Mock de next/link (importante para evitar errores de routing en Jest)
jest.mock("next/link", () => {
  return ({ href, children, ...rest }: any) => (
    <a href={href} {...rest}>
      {children}
    </a>
  );
});

// Mock opcional de ArrowRight (no afecta visualmente el test)
jest.mock("lucide-react", () => ({
  ArrowRight: () => <svg data-testid="arrow-icon" />,
}));

const baseProps = {
  id: "123",
  title: "Testing Next Components",
  content: "contenido",
  excerpt: "This is a test excerpt for the article component.",
  category: "Testing",
  date: "2025-10-06",
  image: "/test-image.jpg",
};

describe("ArticleCard Component", () => {
  it("renderiza correctamente la versión normal", () => {
    render(<ArticleCard {...baseProps} />);

    // Verifica que el título, categoría y fecha aparecen
    expect(screen.getByText("Testing Next Components")).toBeInTheDocument();
    expect(screen.getByText("Testing")).toBeInTheDocument();
    expect(screen.getByText("2025-10-06")).toBeInTheDocument();

    // Verifica que la imagen tenga el alt correcto
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/test-image.jpg");
    expect(img).toHaveAttribute("alt", "Testing Next Components");

    // Verifica que el enlace apunta al artículo correcto
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/article/123");

    // Verifica que el excerpt se muestra
    expect(screen.getByText(/test excerpt/i)).toBeInTheDocument();
  });

  it("renderiza correctamente la versión featured", () => {
    render(<ArticleCard {...baseProps} featured />);

    // Verifica que el título ahora sea de mayor tamaño (h2 en lugar de h3)
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Testing Next Components");

    // Verifica que el texto "Read more" aparece en la versión destacada
    expect(screen.getByText(/read more/i)).toBeInTheDocument();

    // Verifica que el ícono se renderiza
    expect(screen.getByTestId("arrow-icon")).toBeInTheDocument();
  });

  it("usa una imagen placeholder si no se pasa ninguna", () => {
    render(<ArticleCard {...baseProps} image="" />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/placeholder.svg");
  });
});
