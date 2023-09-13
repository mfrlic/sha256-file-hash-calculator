import { Checkbox, FormControlLabel, Typography, styled } from "@mui/material";
import shouldSaveData from "../../utils/shouldSaveData";
import { SAVE_DATA_COOKIE } from "../../constants";

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  position: "sticky",
  top: 0,
  backgroundColor: "white",
  zIndex: 1,

  marginInline: `-${theme.spacing(2)}`,
  paddingInline: theme.spacing(2),
}));

function onPreferencesChanged(checked: boolean) {
  if (checked) {
    const date = new Date();
    date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000);

    document.cookie = `${SAVE_DATA_COOKIE}=true;expires=${date.toUTCString()};path=/`;
  } else {
    document.cookie = `${SAVE_DATA_COOKIE}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
  }
}

export default function HashingHistoryHeader() {
  const checked = shouldSaveData();
  return (
    <Container>
      <Typography fontWeight={700}>File hashing history</Typography>
      <FormControlLabel
        control={
          <Checkbox
            defaultChecked={checked}
            onChange={(_, checked) => onPreferencesChanged(checked)}
          />
        }
        label="Save results in local storage?"
      />
    </Container>
  );
}
