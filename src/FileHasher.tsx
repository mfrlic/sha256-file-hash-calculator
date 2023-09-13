import { useState, useCallback, lazy, Suspense } from "react";

import type { HashCalculationResult, Step } from "./types";

import { Box, CircularProgress, styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const FileUpload = lazy(() => import("./components/FileUpload"));
const CalculatingHash = lazy(() => import("./components/CalculatingHash"));
const SuccessView = lazy(() => import("./components/SuccessView"));
const ErrorView = lazy(() => import("./components/ErrorView"));

const HashingHistory = lazy(() => import("./components/HashingHistory"));

import calculateHash from "./utils/calculateHash";

const MainContainer = styled("main")(({ theme }) => ({
  display: "flex",

  marginTop: theme.spacing(2),

  alignItems: "center",
  flexDirection: "column",
  height: "100dvh",
  fontFamily: theme.typography.fontFamily,

  margin: "auto",
  boxSizing: "border-box",

  width: theme.sizes.main.width.desktop,

  [theme.breakpoints.down("sm")]: {
    width: theme.sizes.main.width.mobile,
    paddingInline: theme.spacing(2),
  },
}));

const PaperContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),

  width: "100%",
  boxSizing: "border-box",

  flexShrink: 0,

  height: `calc(${theme.sizes.modal.height.desktop} + 32px)`,

  [theme.breakpoints.down("sm")]: {
    height: `calc(${theme.sizes.modal.height.mobile} + 32px)`,
  },
}));

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

function FileHasher() {
  const [currentStep, setCurrentStep] = useState<Step>("upload");
  const [currentResult, setCurrentResult] = useState<HashCalculationResult>();
  const [progress, setProgress] = useState<number>();
  const [timeRemaining, setTimeRemaining] = useState<number>();
  const [description, setDescription] = useState<string>("");

  // used to be able to retry the hashing process
  const [file, setFile] = useState<File>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const processFileAndCalculateHash = useCallback((file: File) => {
    const handleError = (error: unknown) => {
      setErrorMessage(String(error));
      setCurrentStep("error");
    };

    try {
      // start measuring the total time
      const fileHashingStart = performance.now();

      setFile(file);

      // there's no need to update the progress more than the average human reaction time
      let lastCallbackTime = 0;
      let isThrottled = false;

      const throttleDuration = 250;

      // progressCallback is called by calculateHash() to update the progress
      const progressCallback = (progress: number, timeRemaining: number) => {
        const currentTime = Date.now();

        if (!isThrottled) {
          // if not throttled, update the progress immediately
          setProgress(progress);
          setTimeRemaining(timeRemaining);

          // mark the callback as throttled
          isThrottled = true;

          // schedule a delayed call to reset the throttling flag
          setTimeout(() => {
            isThrottled = false;
          }, throttleDuration);
        } else if (currentTime - lastCallbackTime >= throttleDuration) {
          // if already throttled but enough time has passed, update progress
          setProgress(progress);
          setTimeRemaining(timeRemaining);
          lastCallbackTime = currentTime;
        }
      };

      // reset the progress and set the current step to "hash"
      setProgress(0);
      setCurrentStep("hash");

      calculateHash(file, progressCallback)
        .then((hash) => {
          // makes sure the progress is at 100% and the time remaining is 0
          setProgress(100);
          setTimeRemaining(0);

          setCurrentResult({
            fileName: file.name,
            fileSize: file.size,
            hash,
            timeElapsed: performance.now() - fileHashingStart,
            // description will be set from the state
            description: "",
          });
          setCurrentStep("done");
        })
        .catch(handleError);
    } catch (error) {
      handleError(error);
    }
  }, []);

  const retryCallback = () => {
    if (file) {
      processFileAndCalculateHash(file);
    }
  };

  const resetCallback = () => {
    setCurrentResult(undefined);
    setDescription("");
    setCurrentStep("upload");
  };

  const renderCurrentStepComponent = () => {
    switch (currentStep) {
      case "upload":
        return (
          <FileUpload
            processFileAndCalculateHash={processFileAndCalculateHash}
          />
        );

      case "hash":
        return (
          <CalculatingHash
            fileName={file?.name}
            description={description}
            setDescription={setDescription}
            timeRemaining={timeRemaining}
            progress={progress}
          />
        );

      case "done":
        return currentResult ? (
          <SuccessView
            currentResult={currentResult}
            description={description}
            resetCallback={resetCallback}
          />
        ) : (
          <ErrorView
            errorMessage={errorMessage}
            retryCallback={retryCallback}
            resetCallback={resetCallback}
          />
        );

      case "error":
        return (
          <ErrorView
            errorMessage={errorMessage}
            retryCallback={retryCallback}
            resetCallback={resetCallback}
          />
        );
    }
  };

  return (
    <MainContainer>
      <Typography fontWeight={700} fontSize={24} marginBottom={1}>
        File hash calculator
      </Typography>

      <PaperContainer elevation={6}>
        <Suspense fallback={<Loading />}>
          {renderCurrentStepComponent()}
        </Suspense>
      </PaperContainer>

      <Suspense fallback={<Loading />}>
        <HashingHistory
          onResultClick={(result) => {
            setCurrentResult(result);
            setCurrentStep("done");
          }}
        />
      </Suspense>
    </MainContainer>
  );
}

export default FileHasher;
