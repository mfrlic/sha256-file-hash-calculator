import { render, fireEvent } from "@testing-library/react";
import { describe, vi, it, expect } from "vitest";

import FileUpload from "../FileUpload";
import { ThemeProvider } from "@mui/material";
import theme from "../../theme";

import "@testing-library/jest-dom/vitest";

describe("FileUpload component", () => {
  const processFileAndCalculateHashMock = vi.fn();

  const defaultProps = {
    processFileAndCalculateHash: processFileAndCalculateHashMock,
  };

  it("renders the component with correct elements", () => {
    const { getByText, getByTestId } = render(
      <ThemeProvider theme={theme}>
        <FileUpload {...defaultProps} />
      </ThemeProvider>
    );

    // check if the "Upload file" button exists
    const uploadButton = getByTestId("upload-button");
    expect(uploadButton).toBeInTheDocument();

    // check if the "Drag and drop or" text exists
    const dragText = getByText("Drag and drop or");
    expect(dragText).toBeInTheDocument();

    // check if the maximum file size text exists
    const maxFileSizeText = getByText("Maximum file size: 10 GB");
    expect(maxFileSizeText).toBeInTheDocument();

    // check if the input element is hidden
    const inputElement = getByTestId("file-input");
    expect(inputElement).toBeInTheDocument();
  });

  it("calls processFileAndCalculateHash when a file is selected via file input", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <FileUpload {...defaultProps} />
      </ThemeProvider>
    );
    const inputElement = getByTestId("file-input");

    const file = new File(["test content"], "testfile.txt", {
      type: "text/plain",
    });

    fireEvent.change(inputElement, { target: { files: [file] } });
    expect(processFileAndCalculateHashMock).toHaveBeenCalledWith(file);
  });

  it("calls processFileAndCalculateHash when a file is dropped onto the component", () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <FileUpload {...defaultProps} />
      </ThemeProvider>
    );

    const file = new File(["test content"], "testfile.txt", {
      type: "text/plain",
    });

    const dropEvent = new Event("drop", {
      bubbles: true,
    });

    Object.defineProperty(dropEvent, "dataTransfer", {
      value: { files: [file] },
    });

    fireEvent(container, dropEvent);
    expect(processFileAndCalculateHashMock).toHaveBeenCalledWith(file);
  });
});
