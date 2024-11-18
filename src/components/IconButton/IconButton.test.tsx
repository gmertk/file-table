import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import { IconButton } from "./IconButton";

describe("IconButton", () => {
  it("renders button with icon and text", () => {
    const mockIcon = <svg data-testid="test-icon" />;
    render(<IconButton icon={mockIcon}>Test Button</IconButton>);

    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    expect(screen.getByText("Test Button")).toBeInTheDocument();
  });

  it("handles click events", async () => {
    const handleClick = vi.fn();
    const mockIcon = <svg data-testid="test-icon" />;

    render(
      <IconButton icon={mockIcon} onClick={handleClick}>
        Test Button
      </IconButton>
    );

    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
