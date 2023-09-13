import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LinearProgressBar from "./LinearProgressBar";
import formatTime from "../../utils/formatTime";
import { styled } from "@mui/material";

const Container = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  height: "100%",
}));

const ProgressContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
}));

const TopContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(),
  width: "100%",
}));

function CalculatingHash({
  fileName,
  description,
  setDescription,
  timeRemaining,
  progress,
}: {
  fileName?: string;
  description: string;
  setDescription: (description: string) => void;
  timeRemaining?: number;
  progress?: number;
}) {
  return (
    <Container>
      <TopContainer>
        <Typography fontSize={20}>
          {`Calculating hash ${fileName ? "for" : ""}`} <b>{fileName}</b>
        </Typography>
        <TextField
          fullWidth
          label={`File description (${description.length}/500)`}
          multiline
          rows={4}
          inputProps={{
            maxLength: 500,
            "data-testid": "description-input",
          }}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          autoFocus
        />
      </TopContainer>

      <ProgressContainer>
        <Typography>
          {`Time remaining: ${formatTime(timeRemaining)}`}
        </Typography>

        <LinearProgressBar value={progress} variant="determinate" />
      </ProgressContainer>
    </Container>
  );
}

export default CalculatingHash;
