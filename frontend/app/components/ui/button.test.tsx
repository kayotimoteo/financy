import { render, screen } from "@testing-library/react";
import { Button } from "./button";

describe("Button", () => {
  it("renders default button styles and content", () => {
    render(<Button>Salvar</Button>);

    const button = screen.getByRole("button", { name: "Salvar" });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("data-variant", "default");
  });

  it("renders a child element when asChild is enabled", () => {
    render(
      <Button asChild variant="link">
        <a href="/dashboard">Dashboard</a>
      </Button>,
    );

    const link = screen.getByRole("link", { name: "Dashboard" });

    expect(link).toHaveAttribute("href", "/dashboard");
    expect(link).toHaveAttribute("data-variant", "link");
  });
});
