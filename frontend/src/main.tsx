import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import Header from "./components/template/header.tsx";
import "./index.css";
import MaxWidthWrapper from "./components/template/max-width-wrapper.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="min-h-dvh h-full flex flex-col bg-zinc-700">
      <Header />
      <main className="flex-1 flex-col flex">
        <MaxWidthWrapper>
          <App />
        </MaxWidthWrapper>
      </main>
    </div>
  </StrictMode>,
);
