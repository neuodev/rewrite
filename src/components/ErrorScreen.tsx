import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import Button from "./common/Button";

const ErrorScreen = () => {
  const error = useRouteError() as { statusText?: string; message: string };
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <p>Sorry, an unexpected error has occurred</p>
      <p>{error.statusText || error.message}</p>
      <Button variant="primary">Go Home</Button>
    </div>
  );
};

export default ErrorScreen;
