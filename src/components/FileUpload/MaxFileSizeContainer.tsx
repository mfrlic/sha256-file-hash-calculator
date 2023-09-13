import type { Theme } from "@mui/material";
import { styled } from "@mui/material";

const MaxFileSizeContainer = styled("div")(
  ({
    theme,
    maxSizeExceeded,
  }: {
    theme?: Theme;
    maxSizeExceeded: boolean;
  }) => ({
    fontSize: theme?.typography.caption.fontSize,
    color: maxSizeExceeded
      ? theme?.palette.error.main
      : theme?.palette.text.secondary,
  })
);

export default MaxFileSizeContainer;
