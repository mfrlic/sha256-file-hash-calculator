import { expect, describe, it, vi } from "vitest";
import calculateHash from "../calculateHash";
import { CHUNK_SIZE } from "../../constants";
import fs from "fs";
import path from "path";

// mock the arrayBuffer method, otherwise tests will fail
class MockBlob extends Blob {
  async arrayBuffer(): Promise<ArrayBuffer> {
    const fileReader = new FileReader();

    return new Promise((resolve, reject) => {
      fileReader.onload = () => {
        if (fileReader.result) {
          resolve(fileReader.result as ArrayBuffer);
        } else {
          reject(new Error("FileReader result is null"));
        }
      };

      fileReader.onerror = () => {
        reject(new Error("FileReader error"));
      };

      fileReader.readAsArrayBuffer(this);
    });
  }
}

class MockFile extends File {
  constructor(data: BlobPart[], fileName: string, options?: FilePropertyBag) {
    const mockBlob = new MockBlob(data, options);
    super([mockBlob], fileName, options);
  }

  // arrayBuffer is called on each chunk, so we need to override it here
  slice(start?: number, end?: number, contentType?: string): MockBlob {
    const slicedBlob = super.slice(start, end, contentType);
    return new MockBlob([slicedBlob], { type: contentType });
  }
}

type FileSize = "empty" | "10b" | "10kb" | "10mb";

function getFile(fileSize: FileSize) {
  const fileName = `${fileSize}-file`;
  const mockDirPath = path.join(__dirname, "../../../mockFiles");
  const filePath = path.join(mockDirPath, fileName);

  const file = fs.readFileSync(filePath);

  return new MockFile([file], fileName);
}

// these are the hashes of the mock files, verified with the `shasum -a 256 <file>` command
const mockFileHashes: Record<FileSize, string> = {
  empty: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "10b": "01d448afd928065458cf670b60f5a594d735af0172c8d67f22a81680132681ca",
  "10kb": "84ff92691f909a05b224e1c56abb4864f01b4f8e3c854e4bb4c7baf1d3f6d652",
  "10mb": "e5b844cc57f57094ea4585e235f36c78c1cd222262bb89d53c94dcb4d6b3e55d",
};

describe("calculateHash", () => {
  for (const fileSize of ["empty", "10b", "10kb", "10mb"] as FileSize[]) {
    it(`should calculate the hash of ${fileSize === "empty" ? "an" : "a"} ${
      fileSize !== "empty" ? fileSize.toUpperCase() : fileSize
    } file correctly`, async () => {
      const progressCallback = vi.fn();

      const file = await getFile(fileSize);

      const numOfChunks = Math.ceil(file.size / CHUNK_SIZE);

      const result = await calculateHash(file, progressCallback);

      expect(result).toBe(mockFileHashes[fileSize]);
      expect(progressCallback).toHaveBeenCalledTimes(numOfChunks);
    });
  }
});
