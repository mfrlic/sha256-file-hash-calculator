import { render, fireEvent } from "@testing-library/react";
import { describe, vi, it, expect } from "vitest";

import ErrorView from "../ErrorView";

import "@testing-library/jest-dom/vitest";

describe("ErrorView component", () => {
  it("renders with the provided error message", () => {
    const errorMessage = "An error occurred. Please try again.";
    const { getByText } = render(
      <ErrorView
        errorMessage={errorMessage}
        retryCallback={() => {}}
        resetCallback={() => {}}
      />
    );

    const errorText = getByText(errorMessage);
    expect(errorText).toBeInTheDocument();
  });

  it('calls retryCallback when the "Retry" button is clicked', () => {
    const retryCallback = vi.fn();
    const { getByText } = render(
      <ErrorView
        errorMessage="An error occurred."
        retryCallback={retryCallback}
        resetCallback={() => {}}
      />
    );

    // click on the retry button and check if retryCallback is called
    fireEvent.click(getByText("Retry"));
    expect(retryCallback).toHaveBeenCalledTimes(1);
  });

  it('calls resetCallback when the "New file upload" button is clicked', () => {
    const resetCallback = vi.fn();
    const { getByText } = render(
      <ErrorView
        errorMessage="An error occurred."
        retryCallback={() => {}}
        resetCallback={resetCallback}
      />
    );

    // click on the New button and check if resetCallback is called
    fireEvent.click(getByText("New file upload"));
    expect(resetCallback).toHaveBeenCalledTimes(1);
  });
});
