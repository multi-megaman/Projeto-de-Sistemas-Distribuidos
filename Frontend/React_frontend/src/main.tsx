import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'

import HomePage from "./pages/homePage";
import { homePageUrl } from "./globalVariables/globalVariables";
import MainPage from "./pages/mainPage";
import { mainPageUrl } from "./globalVariables/globalVariables";
import NotFound404 from "./pages/errorPage";

const router = createBrowserRouter([
  {
    path: homePageUrl,
    element: <HomePage/>,
    errorElement: <NotFound404 />,
  },
  { path: mainPageUrl, 
    element: <MainPage /> }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
