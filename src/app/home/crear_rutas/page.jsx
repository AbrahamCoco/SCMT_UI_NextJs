"use client";
import { useCallback, useEffect, useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Col,
  Container,
  Modal,
  Row,
} from "react-bootstrap";
import { CrearRutasController } from "./crearRutasController";
import { Utils } from "@/utils/utils";
import Swal from "sweetalert2";
import Link from "next/link";

export default function CrearRutas() {
  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);
  const [action, setAction] = useState("add");
  const [conductores, setConductores] = useState(null);
  const [nombreRuta, setNombreRuta] = useState("");
  const [idConductores, setIdConductores] = useState("");
  const [puntoAcceso, setPuntoAcceso] = useState("");
  const [vehiculo, setVehiculo] = useState("");
  const [descripcionRuta, setDescripcionRuta] = useState("");
  const [idActualizarRuta, setIdActualizarRuta] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (action, id) => {
    setAction(action), setShow(true);
    if (action === "update") {
      recupararDatos(id);
    } else {
      setNombreRuta("");
      setIdConductores("");
      setPuntoAcceso("");
      setVehiculo("");
      setDescripcionRuta("");
      setIdActualizarRuta(null);
    }
  };

  const fetchConsultarRutas = useCallback(async () => {
    const compania = sessionStorage.getItem("compania");
    try {
      const response = await CrearRutasController.getConsultarRutas(compania);
      setData(response);
    } catch (error) {
      Utils.swalError("Error al cargar los datos");
    }
  }, []);

  const eliminar = (id) => async () => {
    Swal.fire({
      title: "¿Desea eliminar la ruta seleccionada?",
      text: "No podrá revertir esta acción, esta acción podría causar daños en el sistema.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await CrearRutasController.deleteRuta(id);
          Utils.swalSuccess("Ruta eliminada correctamente");
          fetchConsultarRutas();
        } catch (error) {
          Utils.swalError("Error al eliminar la ruta");
        }
      }
    });
  };

  const guardarRuta = async () => {
    try {
      const cuerpo = {
        tcompania_id: sessionStorage.getItem("compania"),
        tusuario_id_conductor: idConductores,
        nombre: nombreRuta,
        punto_acceso: puntoAcceso,
        vehiculo: vehiculo,
        descripcion: descripcionRuta,
      };
      if (idActualizarRuta == null) {
        const response = await CrearRutasController.insertRuta(cuerpo);
        Utils.swalSuccess("Ruta creada correctamente");
      } else {
        const response = await CrearRutasController.updateRuta(
          idActualizarRuta,
          cuerpo,
        );
        Utils.swalSuccess("Ruta actualizada correctamente");
      }
      handleClose();
      fetchConsultarRutas();
    } catch (error) {
      Utils.swalError("Error al crear/actualizar la ruta");
    }
  };

  const listarConductores = useCallback(async () => {
    const compania = sessionStorage.getItem("compania");
    try {
      const response =
        await CrearRutasController.getConsultarConductores(compania);
      setConductores(response);
    } catch (error) {
      Utils.swalError("Error al cargar los datos");
    }
  }, []);

  const recupararDatos = async (id) => {
    const compania = sessionStorage.getItem("compania");
    console.log(compania);
    try {
      const response = await CrearRutasController.getConsultarRutas(compania);
      console.log(response);
      if (response && response.length > 0) {
        const rutaSeleccionada = response.find((ruta) => ruta.id === id);
        if (rutaSeleccionada) {
          setNombreRuta(rutaSeleccionada.nombre_ruta);
          setPuntoAcceso(rutaSeleccionada.punto_acceso);
          setVehiculo(rutaSeleccionada.vehiculo);
          setDescripcionRuta(rutaSeleccionada.descripcion);
          setIdConductores(rutaSeleccionada.tusuario_id_conductor);
          setIdActualizarRuta(rutaSeleccionada.id);
          console.log(rutaSeleccionada);
        } else {
          console.log("No se encontró la ruta seleccionada");
        }
      } else {
        console.log("No se encontraron datos de rutas");
      }
    } catch (error) {
      Utils.swalError("Error al cargar los datos");
    }
  };

  useEffect(() => {
    fetchConsultarRutas();
    listarConductores();
  }, [fetchConsultarRutas, listarConductores]);

  return (
    <>
      <Container className="py-4">
        <Row>
          <Col md={6}>
            <h1 className="color-texto">Control de rutas</h1>
          </Col>
          <Col md={6} className="align-items-center alineacion">
            <button
              type="button"
              className="btn btn-info align-content-end"
              onClick={() => handleShow("add")}
            >
              Agregar ruta
            </button>
          </Col>
        </Row>
        {data ? (
          <Accordion defaultActiveKey="0" className="color-card">
            {data.map((ruta, index) => (
              <AccordionItem key={ruta.id} eventKey={index.toString()}>
                <AccordionHeader>{ruta.nombre_ruta}</AccordionHeader>
                <AccordionBody>
                  <Row>
                    <div className="col-sm-7">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m22!1m8!1m3!1d7525.859950750081!2d-98.1399988!3d19.4154313!3m2!1i1024!2i768!4f13.1!4m11!3e0!4m3!3m2!1d19.4124665!2d-98.1452667!4m5!1s0x85d0202504b10e21%3A0xdc52c5e4a992047e!2sAv%20Ignacio%20Zaragoza%20412%2C%20Centro%2C%2090300%20Apizaco%2C%20Tlax.!3m2!1d19.4190972!2d-98.14268919999999!5e0!3m2!1ses-419!2smx!4v1682548340635!5m2!1ses-419!2smx"
                        width="100%"
                        height="450"
                        // style="border:0;"
                        // allowfullscreen=""
                        loading="lazy"
                        // referrerpolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                    <div className="col-sm-5">
                      <h3>Descripcion:</h3>
                      <p>{ruta.descripcion}</p>
                      <h3>Punto de acceso:</h3>
                      <p>{ruta.punto_acceso}</p>
                      <h3>Vehiculo:</h3>
                      <p>{ruta.vehiculo}</p>
                      <h3>Conductor:</h3>
                      <p>
                        {ruta.nombre +
                          " " +
                          ruta.primer_apellido +
                          " " +
                          ruta.segundo_apellido}
                      </p>
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={eliminar(ruta.id)}
                        >
                          Eliminar ruta
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary ms-3"
                          onClick={() => handleShow("update", ruta.id)}
                        >
                          Editar ruta
                        </button>
                        <Link
                          href={`/home/crear_rutas/pasajeros_ruta/${ruta.id}/${ruta.nombre_ruta}`}
                        >
                          <button
                            type="button"
                            className="btn btn-success ms-3"
                          >
                            Pasajeros de la ruta
                          </button>
                        </Link>
                      </div>
                    </div>
                  </Row>
                </AccordionBody>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <Accordion defaultActiveKey="0" className="color-card">
            <AccordionItem eventKey="0">
              <AccordionHeader>Cargando datos de las rutas</AccordionHeader>
              <AccordionBody>
                <div className="d-flex justify-content-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              </AccordionBody>
            </AccordionItem>
          </Accordion>
        )}
      </Container>

      <Modal show={show} onHide={handleClose} className="color-texto">
        <Modal.Header className="fondo borde" closeButton>
          <Modal.Title>
            {action === "add" ? "Crear Ruta" : "Editar Ruta"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="fondo borde">
          <input
            type="hidden"
            className="form-control"
            value={idActualizarRuta}
            onChange={(e) => setIdActualizarRuta(e.target.value)}
          />
          <div className="form-group">
            <label className="form-label" htmlFor="nombre">
              Nombre de la ruta:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Ruta San Marcos"
              value={nombreRuta}
              onChange={(e) => setNombreRuta(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-6">
                <label className="form-label" htmlFor="punto_acceso">
                  Punto principal de acceso:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Apizaco"
                  value={puntoAcceso}
                  onChange={(e) => setPuntoAcceso(e.target.value)}
                  required
                />
              </div>
              <div className="col-sm-6">
                <label className="form-label" htmlFor="vehiculo">
                  Vehículo:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="XB-135-NM"
                  value={vehiculo}
                  onChange={(e) => setVehiculo(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="sel1">
              Seleccionar conductor:
            </label>
            <select
              className="form-control"
              id="conductores"
              value={idConductores}
              onChange={(e) => setIdConductores(e.target.value)}
            >
              <option value="">Seleccionar conductor</option>
              {conductores &&
                conductores.map((conductor) => (
                  <option key={conductor.id} value={conductor.id}>
                    {conductor.nombre} {conductor.primer_apellido}{" "}
                    {conductor.segundo_apellido}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="descripcionR">
              Descripción:
            </label>
            <textarea
              className="form-control"
              rows="3"
              value={descripcionRuta}
              onChange={(e) => setDescripcionRuta(e.target.value)}
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer className="fondo borde">
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleClose}
          >
            Cerrar
          </button>
          <button
            type="button"
            onClick={guardarRuta}
            className="btn btn-primary"
          >
            Guardar cambios
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
