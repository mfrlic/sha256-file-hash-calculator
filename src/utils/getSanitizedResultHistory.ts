import { RESULT_HISTORY_KEY } from "../constants";
import type { HashCalculationResult } from "../types";

export default function getSanitizedResultHistory(): HashCalculationResult[] {
  const localStorageResults = localStorage.getItem(RESULT_HISTORY_KEY);

  try {
    const parsedResults = JSON.parse(localStorageResults || "[]");

    if (!Array.isArray(parsedResults)) {
      return [];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isValidResult = (result: any): result is HashCalculationResult => {
      return (
        result &&
        typeof result === "object" &&
        typeof result.hash === "string" &&
        result.hash.length === 64 &&
        typeof result.description === "string" &&
        typeof result.fileName === "string" &&
        typeof result.timeElapsed === "number" &&
        typeof result.fileSize === "number"
      );
    };

    const sanitizedResults = parsedResults.filter(isValidResult);

    return sanitizedResults;
  } catch {
    return [];
  }
}
