import { render, fireEvent } from "@testing-library/react";
import { describe, vi, it, expect } from "vitest";

import SuccessView from "../SuccessView";
import { mockCalculationResult } from "./constants";

import "@testing-library/jest-dom/vitest";

// mock useResultHistory hook
vi.mock("../hooks/useResultHistory", () => ({
  __esModule: true,
  default: vi.fn(() => ({
    resultHistory: [mockCalculationResult],
    setResultHistory: vi.fn(),
  })),
}));

describe("SuccessView component", () => {
  it("renders the file information and hash correctly", () => {
    const description = "New description";
    const resetCallback = vi.fn();

    const { getByText } = render(
      <SuccessView
        currentResult={mockCalculationResult}
        description={description}
        resetCallback={resetCallback}
      />
    );

    // check if the file information is rendered correctly
    expect(getByText(mockCalculationResult.fileName)).toBeInTheDocument();
    expect(getByText(`${description}`)).toBeInTheDocument();
    expect(getByText(`10 Bytes`)).toBeInTheDocument();
    expect(getByText("12 milliseconds")).toBeInTheDocument();

    // check if the calculated hash is rendered correctly
    expect(getByText("Calculated hash")).toBeInTheDocument();
    expect(getByText(mockCalculationResult.hash)).toBeInTheDocument();
  });

  it('calls resetCallback when the "New file upload" button is clicked', () => {
    const description = "New description";
    const resetCallback = vi.fn();

    const { getByText } = render(
      <SuccessView
        currentResult={mockCalculationResult}
        description={description}
        resetCallback={resetCallback}
      />
    );

    // simulate a click on the "New file upload" button
    fireEvent.click(getByText("New file upload"));

    // check if resetCallback is called
    expect(resetCallback).toHaveBeenCalledTimes(1);
  });
});
