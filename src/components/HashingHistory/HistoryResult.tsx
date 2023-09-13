import { Box, IconButton, Paper, Typography } from "@mui/material";
import formatFileSize from "../../utils/formatFileSize";
import { Delete } from "@mui/icons-material";
import type { HashCalculationResult } from "../../types";
import { RESULT_HISTORY_KEY } from "../../constants";
import useResultHistory from "../../hooks/useResultHistory";

const HistoryResult = ({
  result,
  onClick,
}: {
  result: HashCalculationResult;
  onClick: (result: HashCalculationResult) => void;
}) => {
  const { resultHistory, setResultHistory } = useResultHistory();
  return (
    <Paper
      sx={(theme) => ({
        margin: "auto",
        padding: theme.spacing(2),
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        boxSizing: "border-box",
        gap: "8px",
      })}
      elevation={6}
      onClick={() => {
        onClick(result);
      }}
      data-testid="history-result"
    >
      <Typography
        sx={{
          width: "50%",
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {result.fileName}
      </Typography>
      <Box
        sx={{
          width: "50%",
          display: "flex",
          gap: "8px",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Typography color="grey">{formatFileSize(result.fileSize)}</Typography>

        <IconButton
          data-testid="delete-button"
          onClick={(event) => {
            event.stopPropagation();

            const newResultHistory = resultHistory.filter(
              (item) => item.hash !== result.hash
            );

            setResultHistory(newResultHistory);
            localStorage.setItem(
              RESULT_HISTORY_KEY,
              JSON.stringify(newResultHistory)
            );
          }}
        >
          <Delete
            sx={(theme) => ({
              color: theme.palette.error.main,
            })}
          />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default HistoryResult;
