import type { Theme } from "@mui/material";
import { styled } from "@mui/material";

const DragAndDropContainer = styled("div")(
  ({ theme, dragActive }: { dragActive: boolean; theme?: Theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: theme?.palette.grey[900],
    borderRadius: 8,
    gap: theme?.spacing(1),

    height: theme?.sizes.modal.height.desktop,

    [theme?.breakpoints.down("sm") as string]: {
      height: theme?.sizes.modal.height.mobile,
    },

    backgroundColor: dragActive
      ? theme?.palette.grey[200]
      : theme?.palette.grey[50],
    transition: "background-color 0.3s",
  })
);

export default DragAndDropContainer;
