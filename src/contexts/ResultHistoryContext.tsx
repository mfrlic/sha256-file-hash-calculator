import { createContext, useState } from "react";
import type { HashCalculationResult } from "../types";
import getSanitizedResultHistory from "../utils/getSanitizedResultHistory";

type ResultHistoryContextType = {
  resultHistory: HashCalculationResult[];
  setResultHistory: (resultHistory: HashCalculationResult[]) => void;
};

const ResultHistoryContext = createContext<ResultHistoryContextType>({
  resultHistory: [],
  setResultHistory: () => {},
});

const ResultHistoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [resultHistory, setResultHistory] = useState<HashCalculationResult[]>(
    getSanitizedResultHistory()
  );

  return (
    <ResultHistoryContext.Provider
      value={{
        resultHistory,
        setResultHistory,
      }}
    >
      {children}
    </ResultHistoryContext.Provider>
  );
};

export { ResultHistoryContext, ResultHistoryProvider };
