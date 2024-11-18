import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Table } from "./Table";

type TestItem = {
  id: string;
  name: string;
  age: number;
};

const mockData: TestItem[] = [
  { id: "1", name: "John Doe", age: 30 },
  { id: "2", name: "Jane Smith", age: 25 },
  { id: "3", name: "Bob Johnson", age: 45 },
];

const mockColumns = [
  { key: "name", header: "Name" },
  { key: "age", header: "Age" },
];

const defaultProps = {
  data: mockData,
  columns: mockColumns,
  keyExtractor: (item: TestItem) => item.id,
};

describe("Table", () => {
  it("renders table headers and data correctly", () => {
    render(<Table {...defaultProps} />);

    // Check headers
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();

    // Check data
    mockData.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(item.age.toString())).toBeInTheDocument();
    });
  });

  it("handles custom render functions", () => {
    const customColumns = [
      ...mockColumns,
      {
        key: "custom",
        header: "Custom",
        render: (item: TestItem) => <span>Custom-{item.id}</span>,
      },
    ];

    render(<Table {...defaultProps} columns={customColumns} />);

    mockData.forEach((item) => {
      expect(screen.getByText(`Custom-${item.id}`)).toBeInTheDocument();
    });
  });

  it("handles row selection correctly", () => {
    const onSelectionChange = vi.fn();
    const selectedRows = new Set(["1"]);

    render(
      <Table
        {...defaultProps}
        selectedRows={selectedRows}
        onSelectionChange={onSelectionChange}
      />
    );

    // Check initial selection
    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes[0]).toBeChecked();

    // Toggle selection on (add item)
    fireEvent.click(checkboxes[1]);
    expect(onSelectionChange).toHaveBeenCalled();
    expect(onSelectionChange.mock.calls[0][0]).toEqual(expect.any(Set));
    expect(Array.from(onSelectionChange.mock.calls[0][0])).toEqual(
      expect.arrayContaining(["1", "2"])
    );
  });
});
