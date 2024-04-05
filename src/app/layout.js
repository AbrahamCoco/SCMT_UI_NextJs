import "bootstrap/dist/css/bootstrap.min.css";
import "../css/styles.css";

export const metadata = {
  title: "SCMT - Inicio de sesión",
  description:
    "En esta pagina solo inician sesion los administradores de la empresa SCMT",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* <!--CDN--> */}
        {/* <!-- jQuery library --> */}
        <script
          async
          src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"
        ></script>
        {/* <!-- Popper JS --> */}
        <script
          async
          src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
        ></script>
        {/* <!-- Latest compiled JavaScript --> */}
        <script
          async
          src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"
        ></script>
        {/* <!--Iconos--> */}
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        {/* <!--Styles--> */}
        <link
          href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        ></link>
      </head>
      <body>{children}</body>
    </html>
  );
}
