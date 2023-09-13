import { SAVE_DATA_COOKIE } from "../constants";

function shouldSaveData() {
  const cookies = document.cookie.split(";");

  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === SAVE_DATA_COOKIE && value === "true") {
      return true;
    }
  }
  return false;
}

export default shouldSaveData;
