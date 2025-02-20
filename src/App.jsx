import React from "react";
import AppRoutes from "./routes/AppRoutes";
import AppLayout from "./layouts/index";
import { DarkModeProvider } from "./context/DarkModeContext";
const App = () => {
  return (
    <DarkModeProvider>
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </DarkModeProvider>
  );
};

export default App;
