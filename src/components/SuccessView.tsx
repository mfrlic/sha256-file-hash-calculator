import { Button, Typography, styled } from "@mui/material";
import formatFileSize from "../utils/formatFileSize";
import formatTime from "../utils/formatTime";
import type { HashCalculationResult } from "../types";
import shouldSaveData from "../utils/shouldSaveData";
import { RESULT_HISTORY_KEY } from "../constants";
import useResultHistory from "../hooks/useResultHistory";

const Container = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  height: "100%",
}));

const FileInfo = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "100%",
}));

const HashContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
}));

const ResultData = ({
  value,
  label,
}: {
  value: string | number;
  label: string;
}) => {
  return (
    <Typography
      sx={{
        wordBreak: "break-all",
      }}
    >
      {label}: <b>{value}</b>
    </Typography>
  );
};

function SuccessView({
  currentResult,
  description,
  resetCallback,
}: {
  currentResult: HashCalculationResult;
  description: string;
  resetCallback: () => void;
}) {
  const { resultHistory, setResultHistory } = useResultHistory();

  const attemptToSaveData = () => {
    const isInHistory = !!resultHistory.find(
      (result) => result.hash === currentResult.hash
    );

    if (shouldSaveData() && !isInHistory) {
      const newResultHistory = [
        {
          fileName: currentResult.fileName,
          fileSize: currentResult.fileSize,
          hash: currentResult.hash,
          timeElapsed: currentResult.timeElapsed,
          description,
        },
        ...resultHistory,
      ];

      setResultHistory(newResultHistory);
      localStorage.setItem(
        RESULT_HISTORY_KEY,
        JSON.stringify(newResultHistory)
      );
    }
  };

  return (
    <Container>
      <FileInfo>
        <Typography
          fontWeight={700}
          fontSize={20}
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            width: "100%",
          }}
        >
          {currentResult.fileName}
        </Typography>

        <ResultData label="Description" value={description || "-"} />
        <ResultData
          label="File size"
          value={formatFileSize(currentResult.fileSize)}
        />
        <ResultData
          label="Time elapsed"
          value={formatTime(currentResult.timeElapsed)}
        />
      </FileInfo>

      <HashContainer>
        <Typography fontWeight={700} fontSize={18}>
          Calculated hash
        </Typography>
        <Typography
          color={(theme) => theme.palette.success.main}
          sx={{
            wordBreak: "break-all",
            textAlign: "center",
          }}
          fontSize={20}
        >
          {currentResult.hash}
        </Typography>
      </HashContainer>

      <Button
        onClick={() => {
          attemptToSaveData();
          resetCallback();
        }}
        type="button"
        variant="contained"
      >
        New file upload
      </Button>
    </Container>
  );
}

export default SuccessView;
