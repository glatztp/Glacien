import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/globals.css";
import { SonnerProvider } from "./components/ui/feedback/sonner";
import ProfessionalDashboard from "./components/Home";

import { Analytics } from "@vercel/analytics/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SonnerProvider position="top-center" maxToasts={5}>
      <ProfessionalDashboard />
      <Analytics />
    </SonnerProvider>
  </React.StrictMode>
);
