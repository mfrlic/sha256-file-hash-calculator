import { render, fireEvent } from "@testing-library/react";
import { describe, vi, it, expect } from "vitest";
import CalculatingHash from "../CalculatingHash";

import "@testing-library/jest-dom/vitest";

const mockSetDescription = vi.fn();

const defaultProps = {
  fileName: "example.txt",
  description: "Initial description",
  setDescription: mockSetDescription,
  timeRemaining: 60 * 1000, // milliseconds
  progress: 50, // percentage
};

describe("CalculatingHash component", () => {
  it("renders with the correct title, file name and description", () => {
    const { getByText, getByTestId } = render(
      <CalculatingHash {...defaultProps} />
    );

    // check if the title, file name and description are rendered correctly
    expect(getByText("Calculating hash for")).toBeInTheDocument();
    expect(getByText("example.txt")).toBeInTheDocument();
    expect(getByTestId("description-input")).toBeInTheDocument();
  });

  it("calls setDescription when input value changes", () => {
    const { getByTestId } = render(<CalculatingHash {...defaultProps} />);

    const descriptionInput = getByTestId("description-input");

    // simulate user input
    fireEvent.change(descriptionInput, {
      target: { value: "new test" },
    });

    // check if setDescription is called with the updated value
    expect(mockSetDescription).toHaveBeenCalledWith("new test");
  });

  it("displays time remaining correctly", () => {
    const { getByText } = render(<CalculatingHash {...defaultProps} />);

    expect(getByText("Time remaining: 1 minute")).toBeInTheDocument();
  });

  it("displays progress correctly", () => {
    const { getByRole } = render(<CalculatingHash {...defaultProps} />);

    const progressBar = getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute("aria-valuenow", "50");
  });
});
