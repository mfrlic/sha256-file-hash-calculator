import { Button, Typography } from "@mui/material";
import DragAndDropContainer from "./DragAndDropContainer";
import type { DragEventHandler } from "react";
import { useCallback, useRef, useState } from "react";
import MaxFileSizeContainer from "./MaxFileSizeContainer";
import DragOverlay from "./DragOverlay";

function FileUpload({
  processFileAndCalculateHash,
}: {
  processFileAndCalculateHash: (file: File) => void;
}) {
  const fileUploadRef = useRef<HTMLInputElement>(null);

  const [dragActive, setDragActive] = useState(false);

  const onDrag: DragEventHandler<
    HTMLFormElement | HTMLInputElement | HTMLDivElement
  > = function (event) {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "dragenter" || event.type === "dragover") {
      setDragActive(true);
    } else if (event.type === "dragleave") {
      setDragActive(false);
    }
  };

  const onFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (file) {
        processFileAndCalculateHash(file);
      }
    },
    [processFileAndCalculateHash]
  );

  const onDrop = useCallback(
    (
      event: React.DragEvent<
        HTMLFormElement | HTMLInputElement | HTMLDivElement
      >
    ) => {
      event.preventDefault();
      const files = event.dataTransfer.files;

      if (files && files[0]) {
        processFileAndCalculateHash(files[0]);
      }
    },
    [processFileAndCalculateHash]
  );

  const onButtonClick = () => {
    fileUploadRef.current?.click();
  };

  return (
    <form onDragEnter={onDrag} onSubmit={(e) => e.preventDefault()}>
      <input
        data-testid="file-input"
        hidden
        id="input-file-upload"
        multiple
        onChange={onFileUpload}
        ref={fileUploadRef}
        type="file"
      />
      <label htmlFor="input-file-upload">
        <DragAndDropContainer dragActive={dragActive}>
          <Typography fontSize={18}>Drag and drop or</Typography>
          <Button
            onClick={onButtonClick}
            type="button"
            variant="contained"
            data-testid="upload-button"
          >
            Upload file
          </Button>
          <MaxFileSizeContainer>Maximum file size: 10 GB</MaxFileSizeContainer>
        </DragAndDropContainer>
      </label>
      {dragActive && (
        <DragOverlay
          onDragEnter={onDrag}
          onDragLeave={onDrag}
          onDragOver={onDrag}
          onDrop={onDrop}
        />
      )}
    </form>
  );
}

export default FileUpload;
