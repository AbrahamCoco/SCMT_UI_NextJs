"use client";
import Link from "next/link";
import "../css/styles.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  useEffect(() => {
    if (!sessionStorage.getItem("idUser")) {
      // Agregar clase al body si el usuario no está autenticado
      document.body.classList.add("inicio");
      document.body.classList.remove("fondo");
    }
    // Verifica si estamos en el navegador antes de ejecutar el código
    if (typeof window !== "undefined") {
      let btn = document.querySelector("#btn");
      let sidebar = document.querySelector(".sidebar");

      if (btn) {
        btn.onclick = function () {
          sidebar.classList.toggle("active");
        };
      }

      document.addEventListener("DOMContentLoaded", function () {
        // Obtén la ruta completa de la página actual
        let currentPath = window.location.pathname;

        // Extrae el nombre del archivo de la ruta de la página actual
        currentPath = currentPath.split("/").pop();

        // Obtén todos los enlaces de navegación
        let navLinks = document.querySelectorAll(".nav a");

        // Recorre los enlaces y verifica si el nombre del archivo coincide con la página actual
        for (let i = 0; i < navLinks.length; i++) {
          let link = navLinks[i];
          let href = link.getAttribute("href");
          console.log(href, currentPath);

          // Extrae el nombre del archivo de la ruta del enlace de navegación
          href = href.split("/").pop();

          // Verifica si el nombre del archivo coincide con el de la página actual
          if (href === currentPath) {
            link.classList.add("nav-selected");
            break; // Detén el bucle una vez que se encuentre el enlace correspondiente
          }
        }
      });

      let nombre = sessionStorage.getItem("nombre"),
        descripcionn = sessionStorage.getItem("descripcion"),
        fotoo = sessionStorage.getItem("foto"),
        tel = sessionStorage.getItem("telefono");
      document.getElementById("foto_perfil").src = fotoo;
      document.getElementById("nombreMenu").innerHTML =
        `<p>Hola ${nombre}</p> <p>Descripción: ${descripcionn}</p><p>Telefono: ${tel}</p>`;
      document.getElementById("nombre_spam").innerHTML =
        `<img src="${fotoo}" alt="Imagen de perfil" class="img-fluid espaciado-img bx" width="50" height="50"> <span class="link_name">${nombre}</span>`;
    }
  }, [router]);

  function cerrarSesion() {
    sessionStorage.clear();
    document.body.classList.add("inicio");
    document.body.classList.remove("fondo");
    router.push("/");
  }

  return (
    <>
      <nav>
        <div className="sidebar">
          <div className="logo_content">
            <div className="logo">
              <i className="bx bxs-truck"></i>
              <div className="logo_name">SCMT</div>
            </div>
            <i className="bx bx-menu" id="btn"></i>
          </div>

          <ul className="nav">
            <li>
              <Link href="/home">
                <i className="bx bx-grid"></i>
                <span className="link_name">Inicio</span>
              </Link>
              <span className="tooltip">Inicio</span>
            </li>
            <li>
              <Link href="/home/control_usuarios">
                <i className="bx bxs-user-detail"></i>
                <span className="link_name">Control de usuarios</span>
              </Link>
              <span className="tooltip">Control de usuarios</span>
            </li>
            <li>
              <Link href="#" data-toggle="modal" data-target="#modal2">
                <i className="bx bx-map"></i>
                <span className="link_name">Ubicación de unidades</span>
              </Link>
              <span className="tooltip">Ubicación de unidades</span>
            </li>
            <li>
              <Link href="/home/crear_rutas">
                <i className="bx bxs-map-alt"></i>
                <span className="link_name">Crear rutas</span>
              </Link>
              <span className="tooltip">Crear rutas</span>
            </li>
            <li>
              <Link href="/home/incidencias">
                <i className="bx bxs-bookmark"></i>
                <span className="link_name">Incidencias</span>
              </Link>
              <span className="tooltip">Incidencias</span>
            </li>
            <li>
              <Link href="/home/informes">
                <i className="bx bxs-archive"></i>
                <span className="link_name">Informes</span>
              </Link>
              <span className="tooltip">Informes</span>
            </li>

            <li>
              <a
                href="#"
                onClick={() => $("#modal-Perfil").modal("show")}
                id="nombre_spam"
              >
                Perfil
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div
        className="modal fade"
        id="modal-Perfil"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="modal-Perfil-titulo"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header fondo borde">
              <h5 className="modal-title color-texto" id="modal-Perfil-titulo">
                Perfil
              </h5>
              <button
                type="button"
                className="close color-texto"
                data-dismiss="modal"
                aria-label="Cerrar"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body fondo borde">
              <div className="row d-flex align-items-center">
                <div className="col-4">
                  <img
                    src=""
                    alt="Imagen de perfil"
                    id="foto_perfil"
                    className="img-fluid img-redondo foto_perfil"
                  />
                </div>
                <div className="col-8 color-texto " id="nombreMenu">
                  Contenido del perfil
                </div>
              </div>
            </div>
            <div className="modal-footer fondo borde">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  cerrarSesion();
                  $("#modal-Perfil").modal("hide");
                }}
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
