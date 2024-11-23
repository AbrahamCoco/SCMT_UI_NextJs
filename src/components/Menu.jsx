"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";

export default function Menu() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tel, setTel] = useState("");
  const [foto, setFoto] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowMenu = () => {
    document.querySelector(".sidebar").classList.toggle("active");
  };

  const cerrarSesion = () => {
    sessionStorage.clear();
    document.body.className = "inicio";
    router.push("/");
  };

  useEffect(() => {
    if (router.pathname !== "/") {
      document.body.className = "fondo";
    }

    if (sessionStorage.getItem("idUser") === null) {
      document.body.className = "inicio";
      router.push("/");
    }

    setNombre(sessionStorage.getItem("nombre"));
    setDescripcion(sessionStorage.getItem("descripcion"));
    setTel(sessionStorage.getItem("telefono"));
    setFoto(sessionStorage.getItem("foto"));
  }, [router.pathname]);

  const renderTooltip = (id, text) => <Tooltip id={id}>{text}</Tooltip>;

  const handleImageError = (e) => {
    setFoto("");
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
            <i className="bx bx-menu" id="btn" onClick={handleShowMenu}></i>
          </div>

          <ul className="nav">
            <li>
              <OverlayTrigger
                placement="right"
                overlay={renderTooltip("tooltip-inicio", "Inicio")}
              >
                <Link href="/home">
                  <i className="bx bx-grid"></i>
                  <span className="link_name">Inicio</span>
                </Link>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger
                placement="right"
                overlay={renderTooltip(
                  "tooltip-control-usuarios",
                  "Control de usuarios",
                )}
              >
                <Link href="/home/control_usuarios">
                  <i className="bx bxs-user-detail"></i>
                  <span className="link_name">Control de usuarios</span>
                </Link>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger
                placement="right"
                overlay={renderTooltip(
                  "tooltip-ubicacion-unidades",
                  "Ubicación de unidades",
                )}
              >
                <Link href="#" data-toggle="modal" data-target="#modal2">
                  <i className="bx bx-map"></i>
                  <span className="link_name">Ubicación de unidades</span>
                </Link>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger
                placement="right"
                overlay={renderTooltip("tooltip-crear-rutas", "Crear rutas")}
              >
                <Link href="/home/crear_rutas">
                  <i className="bx bxs-map-alt"></i>
                  <span className="link_name">Crear rutas</span>
                </Link>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger
                placement="right"
                overlay={renderTooltip("tooltip-incidencias", "Incidencias")}
              >
                <Link href="/home/incidencias">
                  <i className="bx bxs-bookmark"></i>
                  <span className="link_name">Incidencias</span>
                </Link>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger
                placement="right"
                overlay={renderTooltip("tooltip-informes", "Informes")}
              >
                <Link href="/home/informes">
                  <i className="bx bxs-archive"></i>
                  <span className="link_name">Informes</span>
                </Link>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger
                placement="right"
                overlay={renderTooltip("tooltip-perfil", nombre)}
              >
                <a href="#" onClick={handleShow}>
                  {foto ? (
                    new Image({
                      src: foto,
                      alt: "Imagen de perfil",
                      className: "img-fluid espaciado-img bx",
                      width: 50,
                      height: 50,
                      onError: handleImageError,
                    })
                  ) : (
                    <i className="bx bxs-user-circle"></i>
                  )}
                  <span className="link_name"> {nombre} </span>
                </a>
              </OverlayTrigger>
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
              {foto ? (
                new Image({
                  src: foto,
                  alt: "Imagen de perfil",
                  id: "foto_perfil",
                  className: "img-fluid img-redondo foto_perfil",
                  onError: handleImageError,
                  roundedCircle: true,
                })
              ) : (
                <i
                  className="bx bxs-user-circle color-texto"
                  style={{ fontSize: "8em" }}
                ></i>
              )}
            </div>
            <div className="col-8 color-texto" id="nombreMenu">
              <p>Hola {nombre}</p>
              <p>Descripción: {descripcion}</p>
              <p>Teléfono: {tel}</p>
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
            Cerrar sesión
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
