import { render, fireEvent } from "@testing-library/react";
import { describe, vi, it, expect } from "vitest";

import HistoryResult from "../HashingHistory/HistoryResult";

import "@testing-library/jest-dom/vitest";
import { mockCalculationResult } from "./constants";

describe("HistoryResult Component", () => {
  it("renders the component with the provided result", () => {
    const { getByText } = render(
      <HistoryResult result={mockCalculationResult} onClick={() => {}} />
    );

    // make sure that the file name and file size are displayed
    expect(getByText(mockCalculationResult.fileName)).toBeInTheDocument();
    expect(getByText("10 Bytes")).toBeInTheDocument();
  });

  it("calls the onClick callback when clicked", () => {
    const onClickMock = vi.fn();
    const { getByTestId } = render(
      <HistoryResult result={mockCalculationResult} onClick={onClickMock} />
    );

    const element = getByTestId("history-result");

    fireEvent.click(element);
    expect(onClickMock).toHaveBeenCalledWith(mockCalculationResult);
  });

  it("prevents calling onClick the delete button is clicked", () => {
    const onClickMock = vi.fn();
    const { getByTestId } = render(
      <HistoryResult result={mockCalculationResult} onClick={onClickMock} />
    );

    const deleteButton = getByTestId("delete-button");

    fireEvent.click(deleteButton);
    expect(onClickMock).not.toBeCalled();
  });
});
