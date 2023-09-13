import { RESULT_HISTORY_KEY } from "../../constants";
import type { HashCalculationResult } from "../../types";
import getSanitizedResultHistory from "../getSanitizedResultHistory";
import { describe, expect, it, afterEach } from "vitest";

const mockHash =
  "01d448afd928065458cf670b60f5a594d735af0172c8d67f22a81680132681ca";

describe("getSanitizedResultHistory", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("should return an empty array if local storage is empty", () => {
    expect(getSanitizedResultHistory()).toEqual([]);
  });

  it("should return an empty array if local storage contains invalid data", () => {
    localStorage.setItem(RESULT_HISTORY_KEY, "invalidJSONData");

    expect(getSanitizedResultHistory()).toEqual([]);
  });

  it("should return an empty array if local storage contains non-array data", () => {
    localStorage.setItem(RESULT_HISTORY_KEY, '{"a":"b"}');

    expect(getSanitizedResultHistory()).toEqual([]);
  });

  it("should return an array of valid HashCalculationResult objects", () => {
    const validData: HashCalculationResult[] = [
      {
        hash: mockHash,
        description: "description1",
        fileName: "file1.txt",
        timeElapsed: 100,
        fileSize: 1024,
      },
      {
        hash: mockHash,
        description: "description2",
        fileName: "file2.txt",
        timeElapsed: 200,
        fileSize: 2048,
      },
    ];

    localStorage.setItem(RESULT_HISTORY_KEY, JSON.stringify(validData));

    const result = getSanitizedResultHistory();

    expect(result).toEqual(validData);
  });

  it("should filter out invalid objects from the local storage data", () => {
    const validData: HashCalculationResult = {
      hash: mockHash,
      description: "validDescription",
      fileName: "validFile.txt",
      timeElapsed: 100,
      fileSize: 1024,
    };

    const invalidData = [
      "invalidData",
      ["array"],
      123,
      null,
      undefined,
      {},
      [validData],
      {
        hash: mockHash,
        description: "description",
        fileName: "file.txt",
        timeElapsed: "invalidNumber",
        fileSize: "invalidNumber",
      },
    ];
    const data = [validData, ...invalidData];

    localStorage.setItem(RESULT_HISTORY_KEY, JSON.stringify(data));

    expect(getSanitizedResultHistory()).toEqual([validData]);
  });
});
