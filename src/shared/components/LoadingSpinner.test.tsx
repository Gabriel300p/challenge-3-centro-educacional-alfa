import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LoadingSpinner } from "@shared/components";

describe("LoadingSpinner", () => {
  it("renders with default props", () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByRole("status", { hidden: true });
    expect(spinner).toBeInTheDocument();
  });

  it("renders with custom text", () => {
    const text = "Carregando dados...";
    render(<LoadingSpinner text={text} />);
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const customClass = "custom-spinner";
    render(<LoadingSpinner className={customClass} />);
    const spinner = document.querySelector(`.${customClass}`);
    expect(spinner).toBeInTheDocument();
  });
});
