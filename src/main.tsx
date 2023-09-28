import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import AuthContextProvider from "./contexts/AuthContextProvider.tsx";
import { SelectedValuesProvider } from "./contexts/SelectedValuesContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <SelectedValuesProvider>
          <App />
        </SelectedValuesProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
