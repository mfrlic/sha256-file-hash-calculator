import { styled } from "@mui/material";

const DragOverlay = styled("div")(() => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}));

export default DragOverlay;
