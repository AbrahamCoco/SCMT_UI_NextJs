import "bootstrap/dist/css/bootstrap.min.css";
import "boxicons/css/boxicons.min.css";
import "../css/styles.css";

export const metadata = {
  title: "SCMT - Inicio de sesión",
  description:
    "En esta pagina solo inician sesion los administradores de la empresa SCMT",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="inicio">{children}</body>
    </html>
  );
}
