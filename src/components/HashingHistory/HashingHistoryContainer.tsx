import { styled } from "@mui/material";

const HashingHistoryContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
  width: "100%",
  overflowY: "auto",
  overflowX: "visible",

  paddingInline: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

export default HashingHistoryContainer;
