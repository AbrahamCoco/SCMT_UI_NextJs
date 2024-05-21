"use client";
import Link from "next/link";
import "../css/styles.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";

export default function Navbar() {
  const [show, setShow] = useState(false);
  const [nombre, setNombre] = useState("");
  const [descripcionn, setDescripcionn] = useState("");
  const [fotoo, setFotoo] = useState("");
  const [tel, setTel] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const router = useRouter();

  useEffect(() => {
    if (!sessionStorage.getItem("idUser")) {
      // Agregar clase al body si el usuario no está autenticado
      document.body.classList.add("inicio");
      document.body.classList.remove("fondo");
      router.push("/");
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

      setNombre(sessionStorage.getItem("nombre"));
      setDescripcionn(sessionStorage.getItem("descripcion"));
      setFotoo(sessionStorage.getItem("foto"));
      setTel(sessionStorage.getItem("telefono"));
    }
  }, [router]);

  function cerrarSesion() {
    sessionStorage.clear();
    document.body.classList.add("inicio");
    document.body.classList.remove("fondo");
    router.push("/");
  }

  const handleImageError = () => {
    setFotoo("");
  };

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
              <a href="#" onClick={handleShow}>
                {fotoo ? (
                  <Image
                    src={fotoo}
                    alt="Imagen de perfil"
                    className="img-fluid espaciado-img bx"
                    width={50}
                    height={50}
                    onError={handleImageError}
                  />
                ) : (
                  <i className="bx bxs-user-circle"></i>
                )}
                <span className="link_name"> {nombre} </span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="fondo borde" closeButton>
          <Modal.Title className="color-texto">Perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body className="fondo borde">
          <div className="row d-flex align-items-center">
            <div className="col-4">
              {fotoo ? (
                <Image
                  src={fotoo}
                  alt="Imagen de perfil"
                  id="foto_perfil"
                  className="img-fluid img-redondo foto_perfil"
                  onError={handleImageError}
                />
              ) : (
                <i
                  className="bx bxs-user-circle color-texto"
                  style={{ fontSize: 8 + "em" }}
                ></i>
              )}
            </div>
            <div className="col-8 color-texto " id="nombreMenu">
              <p>Hola {nombre}</p>
              <p>Descripción: {descripcionn}</p>
              <p>Telefono: {tel}</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="fondo borde">
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              cerrarSesion();
              handleClose();
            }}
          >
            Cerrar sesion
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
