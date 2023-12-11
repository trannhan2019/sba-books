import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/redux";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.jsx";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "simplebar-react/dist/simplebar.min.css";

import "./index.css";

// const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {/* <QueryClientProvider client={queryClient}> */}
      <App />
      {/* </QueryClientProvider> */}
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);
