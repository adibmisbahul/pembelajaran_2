import "./styles/styles.css";
import GenerateSurat from "./pages/GenerateSurat";
import DashboardPage from "./pages/Dashboard";
import GeneratorSurat from "./pages/GeneratorSurat";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/generate-surat" element={<GenerateSurat />} />
        <Route path="/surat" element={<GeneratorSurat />} />
      </Routes>
    </BrowserRouter>
  );
}
