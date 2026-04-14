import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoot } from "./components/protected-root";
import { Home } from "./components/home";
import { FAQ } from "./components/faq";
import { Companies } from "./components/companies";
import { Guide } from "./components/guide";
import { Contacts } from "./components/contacts";
import { Documents } from "./components/documents";
import { Login } from "./components/login";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: ProtectedRoot,
    children: [
      { index: true, Component: Home },
      { path: "preguntas-frecuentes", Component: FAQ },
      { path: "empresas", Component: Companies },
      { path: "guia", Component: Guide },
      { path: "contactos", Component: Contacts },
      { path: "documentos", Component: Documents },
    ],
  },
]);
