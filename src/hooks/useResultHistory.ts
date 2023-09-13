import { useContext } from "react";
import { ResultHistoryContext } from "../contexts/ResultHistoryContext";

export default function useResultHistory() {
  const { resultHistory, setResultHistory } = useContext(ResultHistoryContext);

  return {
    resultHistory,
    setResultHistory,
  };
}
