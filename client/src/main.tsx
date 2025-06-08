import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Helmet, HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <Helmet>
      <title>Rush - Car Subscription Service</title>
      <meta name="description" content="Rush - Australia's largest car subscription service providing flexible, all-inclusive vehicle access with no long-term commitment." />
    </Helmet>
    <App />
  </HelmetProvider>
);
