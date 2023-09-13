type HashCalculationResult = {
  hash: string;
  fileName: string;
  fileSize: number;
  timeElapsed: number;
  description: string;
};

type Step = "upload" | "hash" | "done" | "error";

export type { HashCalculationResult, Step };
