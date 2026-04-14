import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/auth-provider";
import { ProtectedRoot } from "./components/protected-root";
import { Home } from "./components/home";
import { FAQ } from "./components/faq";
import { Companies } from "./components/companies";
import { Guide } from "./components/guide";
import { Contacts } from "./components/contacts";
import { Documents } from "./components/documents";
import { Login } from "./components/login";

export default function App() {
  console.log("App is rendering");
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoot />}>
            <Route index element={<Home />} />
            <Route path="preguntas-frecuentes" element={<FAQ />} />
            <Route path="empresas" element={<Companies />} />
            <Route path="guia" element={<Guide />} />
            <Route path="contactos" element={<Contacts />} />
            <Route path="documentos" element={<Documents />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
