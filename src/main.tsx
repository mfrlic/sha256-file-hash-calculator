import React from "react";
import ReactDOM from "react-dom/client";
import FileHasher from "./FileHasher";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import "./index.css";
import { ResultHistoryProvider } from "./contexts/ResultHistoryContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ResultHistoryProvider>
        <FileHasher />
      </ResultHistoryProvider>
    </ThemeProvider>
  </React.StrictMode>
);
