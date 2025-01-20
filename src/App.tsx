import { useState } from "react";

import { Toaster } from "./components/ui/toaster";

import { Header } from "./components/Header.tsx";
import { Body } from "./components/Body.tsx";

function App() {
  const [submitValue, setSubmitValue] = useState("");

  return (
    <div className="min-h-screen flex flex-col items-center gap-4 p-4">
      <Header setSubmitValue={setSubmitValue} />
      <Body submitValue={submitValue} />
      <Toaster />
    </div>
  );
}

export default App;
