import { Button, Typography, styled } from "@mui/material";

const Container = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  height: "100%",
}));

const ErrorMessageContainer = styled("div")(() => ({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const ButtonsContainer = styled("div")(() => ({
  display: "flex",
  gap: 8,
}));

function ErrorView({
  errorMessage = "An error occurred. Please try again.",
  retryCallback,
  resetCallback,
}: {
  errorMessage?: string;
  retryCallback: () => void;
  resetCallback: () => void;
}) {
  return (
    <Container>
      <ErrorMessageContainer>
        <Typography
          color={(theme) => theme.palette.info.main}
          fontWeight={700}
          fontSize={24}
        >
          {errorMessage}
        </Typography>
      </ErrorMessageContainer>

      <ButtonsContainer>
        <Button onClick={retryCallback} type="button" variant="contained">
          Retry
        </Button>
        <Button onClick={resetCallback} type="button" variant="contained">
          New file upload
        </Button>
      </ButtonsContainer>
    </Container>
  );
}

export default ErrorView;
