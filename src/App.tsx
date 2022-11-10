import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { ROUTES } from "./constants";
import ErrorScreen from "./components/ErrorScreen";
import "./index.css";
import Root from "./components/Layout/Root";
import NewShortcut from "./components/NewShortcut";
import Shortcuts from "./components/Shortcuts";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";

const router = createMemoryRouter([
  {
    path: ROUTES.ROOT,
    element: <Root />,
    errorElement: <ErrorScreen />,
    children: [
      {
        path: ROUTES.ROOT,
        element: <Shortcuts />,
      },
      {
        path: ROUTES.NEW_SHORTCUT,
        element: <NewShortcut />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
