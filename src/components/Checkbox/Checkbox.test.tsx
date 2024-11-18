import { render, screen, fireEvent } from "@testing-library/react";
import { Checkbox } from "./Checkbox";
import { vi } from "vitest";

describe("Checkbox", () => {
  it("handles changes correctly", () => {
    const onChange = vi.fn();
    render(<Checkbox checked={false} onChange={onChange} />);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(onChange).toHaveBeenCalled();
  });

  it("can be disabled", () => {
    const onChange = vi.fn();
    render(<Checkbox checked={false} onChange={onChange} disabled />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeDisabled();
  });

  it("renders in indeterminate state correctly", () => {
    const onChange = vi.fn();
    render(<Checkbox checked={false} onChange={onChange} indeterminate />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveProperty("indeterminate", true);
  });
});
