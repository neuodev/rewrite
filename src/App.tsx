import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { ROUTES } from "./constants";
import ErrorScreen from "./components/ErrorScreen";
import Root from "./components/Layout/Root";
import NewShortcut from "./components/NewShortcut";
import Shortcuts from "./components/Shortcuts";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { Provider } from "react-redux";
import { store } from "./store";
import "./index.css";

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
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
