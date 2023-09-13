import { render, fireEvent } from "@testing-library/react";
import { expect, it, describe, vi } from "vitest";
import HashingHistory from "../HashingHistory";
import type { HashCalculationResult } from "../../types";

import "@testing-library/jest-dom/vitest";
import { mockCalculationResult } from "./constants";

const mockCalculationResult2: HashCalculationResult = {
  hash: "01d448afd92806sad8cf670b60f5a594d735af0172c8d67f22a81680132681ca",
  fileName: "mock-file-name-2",
  fileSize: 12,
  timeElapsed: 12,
  description: "desc",
};

vi.mock("../../hooks/useResultHistory", () => ({
  __esModule: true,
  default: vi.fn(() => ({
    resultHistory: [mockCalculationResult, mockCalculationResult2],
  })),
}));

describe("HashingHistory component", () => {
  it("renders the list of history results correctly", () => {
    const onResultClickMock = vi.fn();
    const { getByText } = render(
      <HashingHistory onResultClick={onResultClickMock} />
    );

    expect(getByText(mockCalculationResult.fileName)).toBeInTheDocument();
    expect(getByText("10 Bytes")).toBeInTheDocument();

    expect(getByText(mockCalculationResult.fileName)).toBeInTheDocument();
    expect(getByText("12 Bytes")).toBeInTheDocument();
  });

  it("calls onResultClick when a history result is clicked", () => {
    const onResultClickMock = vi.fn();
    const { getByText } = render(
      <HashingHistory onResultClick={onResultClickMock} />
    );

    // click on the first history result
    fireEvent.click(getByText("mock-file-name"));
    // check if onResultClick is called with the correct result
    expect(onResultClickMock).toHaveBeenCalledWith(mockCalculationResult);
  });
});
