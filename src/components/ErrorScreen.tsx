import { Button } from "@mui/material";
import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { ROUTES } from "../constants";

const ErrorScreen = () => {
  const error = useRouteError() as { statusText?: string; message: string };
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <p>Sorry, an unexpected error has occurred</p>
      <p>{error.statusText || error.message}</p>
      <Button variant="contained" onClick={() => navigate(ROUTES.ROOT)}>
        Go Home
      </Button>
    </div>
  );
};

export default ErrorScreen;
