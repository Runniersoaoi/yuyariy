import { render, screen } from "@testing-library/react";
import { ArticleCard } from "@/components/article-card";

// Mock de next/link
jest.mock("next/link", () => {
  return ({ href, children, ...rest }: any) => (
    <a href={href} {...rest}>
      {children}
    </a>
  );
});

// Mock de TODOS los íconos usados por ArticleCard
jest.mock("lucide-react", () => ({
  ArrowRight: () => <svg data-testid="arrow-icon" />,
  Heart: () => <svg data-testid="heart-icon" />,
}));

// Mock de AuthContext
jest.mock("@/context/AuthContext", () => ({
  useAuth: () => ({
    user: null,
    loading: false,
    login: jest.fn(),
    logout: jest.fn(),
  }),
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

    expect(screen.getByText("Testing Next Components")).toBeInTheDocument();
    expect(screen.getByText("Testing")).toBeInTheDocument();
    expect(screen.getByText("2025-10-06")).toBeInTheDocument();

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/test-image.jpg");
    expect(img).toHaveAttribute("alt", "Testing Next Components");

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/article/123");

    expect(screen.getByText(/test excerpt/i)).toBeInTheDocument();
  });

  it("renderiza correctamente la versión featured", () => {
    render(<ArticleCard {...baseProps} featured />);

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Testing Next Components");

    expect(screen.getByText(/Leer más/i)).toBeInTheDocument();
    expect(screen.getByTestId("arrow-icon")).toBeInTheDocument();
  });
});
