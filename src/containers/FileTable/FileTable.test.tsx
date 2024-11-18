import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FileTable, FileData } from "./FileTable";
import { vi } from "vitest";

const mockFiles: FileData[] = [
  {
    name: "document.pdf",
    device: "Device 1",
    path: "/docs/document.pdf",
    status: "available",
  },
  {
    name: "image.jpg",
    device: "Device 2",
    path: "/images/image.jpg",
    status: "available",
  },
  {
    name: "pending.txt",
    device: "Device 3",
    path: "/texts/pending.txt",
    status: "scheduled",
  },
];

describe("FileTable", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should handle file selection and display correct selection count", async () => {
    const user = userEvent.setup();
    render(<FileTable files={mockFiles} />);

    // Initially shows "None Selected"
    expect(screen.getByText("None Selected")).toBeInTheDocument();

    // Select first available file
    const rows = screen.getAllByRole("row");
    const firstFileCheckbox = within(rows[1]).getByRole("checkbox");
    await user.click(firstFileCheckbox);

    // Shows correct selection count
    expect(screen.getByText("Selected 1")).toBeInTheDocument();

    const selectAllCheckbox = screen.getByLabelText(
      "Select all available files"
    );
    await user.click(selectAllCheckbox);

    // Shows count of all available files
    expect(screen.getByText("Selected 2")).toBeInTheDocument();
  });

  it("should not allow scheduled file to be selected", async () => {
    const user = userEvent.setup();
    render(<FileTable files={mockFiles} />);

    const rows = screen.getAllByRole("row");

    // Third file is scheduled
    const scheduledFileRow = rows[3];
    expect(within(scheduledFileRow).getByText("Scheduled")).toBeInTheDocument();

    const checkbox = within(scheduledFileRow).getByRole("checkbox");
    await user.click(checkbox);

    // Third file's checkbox is not checked
    expect(checkbox).not.toBeChecked();
  });
});
