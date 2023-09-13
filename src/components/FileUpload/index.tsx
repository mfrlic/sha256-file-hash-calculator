import { Button, Typography } from "@mui/material";
import DragAndDropContainer from "./DragAndDropContainer";
import type { DragEventHandler } from "react";
import { useCallback, useRef, useState } from "react";
import MaxFileSizeContainer from "./MaxFileSizeContainer";
import DragOverlay from "./DragOverlay";
import { MAX_FILE_SIZE } from "../../constants";
import formatFileSize from "../../utils/formatFileSize";

function FileUpload({
  processFileAndCalculateHash,
}: {
  processFileAndCalculateHash: (file: File) => void;
}) {
  const fileUploadRef = useRef<HTMLInputElement>(null);

  const [dragActive, setDragActive] = useState(false);
  const [maxSizeExceeded, setMaxSizeExceeded] = useState<boolean>(false);

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

  const checkFileSize = useCallback((file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      setMaxSizeExceeded(true);
      return false;
    }

    setMaxSizeExceeded(false);

    return true;
  }, []);

  const onFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (file && checkFileSize(file)) {
        processFileAndCalculateHash(file);
      }
    },
    [processFileAndCalculateHash, checkFileSize]
  );

  const onDrop = useCallback(
    (
      event: React.DragEvent<
        HTMLFormElement | HTMLInputElement | HTMLDivElement
      >
    ) => {
      event.preventDefault();
      const file = event.dataTransfer.files?.[0];

      if (file && checkFileSize(file)) {
        processFileAndCalculateHash(file);
      }
    },
    [processFileAndCalculateHash, checkFileSize]
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
          <MaxFileSizeContainer maxSizeExceeded={maxSizeExceeded}>
            {`Maximum file size: ${formatFileSize(MAX_FILE_SIZE)}`}
          </MaxFileSizeContainer>
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
