import type { HashCalculationResult } from "../../types";
import HistoryResult from "./HistoryResult";
import HashingHistoryHeader from "./HashingHistoryHeader";
import HashingHistoryContainer from "./HashingHistoryContainer";
import useResultHistory from "../../hooks/useResultHistory";

function HashingHistory({
  onResultClick,
}: {
  onResultClick: (result: HashCalculationResult) => void;
}) {
  const { resultHistory } = useResultHistory();

  return (
    <HashingHistoryContainer>
      <HashingHistoryHeader />

      {resultHistory.map((result, index) => {
        return (
          <HistoryResult key={index} result={result} onClick={onResultClick} />
        );
      })}
    </HashingHistoryContainer>
  );
}

export default HashingHistory;
