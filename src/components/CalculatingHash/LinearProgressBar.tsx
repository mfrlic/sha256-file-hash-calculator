import { styled } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

const LinearProgressBar = styled(LinearProgress)(({ theme }) => ({
  marginBlock: theme.spacing(2),
}));

export default LinearProgressBar;
