"use client";
import { useCallback, useEffect, useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import { IncidenciasController } from "./incidenciasController";
import { Utils } from "@/utils/utils";

export default function Incidencias() {
  const [data, setData] = useState(null);
  const [incidencias, setIncidencias] = useState(null);
  const [show, setShow] = useState(false);
  const [descripcion, setDescripcion] = useState("");

  const handleCLose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchConsultarRutas = useCallback(async () => {
    const compania = sessionStorage.getItem("compania");
    try {
      const response = await IncidenciasController.getConsultarRutas(compania);
      setData(response);
    } catch (error) {
      Utils.swalError("Error al cargar los datos");
    }
  }, []);

  const fetchConsultarIncidencias = useCallback(async () => {
    let conductor = document.getElementById("listaRutass").value;
    try {
      const response =
        await IncidenciasController.getConsultarIncidencias(conductor);
      setIncidencias(response);
      Utils.swalSuccess("Incidencias cargadas correctamente");
    } catch (error) {
      Utils.swalError("Error al cargar los datos");
    }
  }, []);

  const handleViewIncidencia = (incidencia) => {
    setDescripcion(incidencia);
    handleShow();
  };

  useEffect(() => {
    fetchConsultarRutas();
  }, [fetchConsultarRutas]);

  return (
    <>
      <Container className="py-4">
        <Row className="py-2">
          <Col md={12}>
            <h1 className="color-texto">Reportes de incidencias</h1>
          </Col>
        </Row>
        <Row className="py-2">
          <Col md={4}>
            <select name="" id="listaRutass" className="form-control">
              {data ? (
                data.map((ruta) => (
                  <option key={ruta.id} value={ruta.id}>
                    {ruta.nombre_ruta}
                  </option>
                ))
              ) : (
                <option value="">No hay rutas</option>
              )}
            </select>
          </Col>
          <Col md={3}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={fetchConsultarIncidencias}
            >
              Buscar
            </button>
          </Col>
        </Row>
        <div className="py-2">
          <table className="table table-dark">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Fecha</th>
                <th scope="col">Visualizar</th>
              </tr>
            </thead>
            <tbody id="incidencias">
              {incidencias ? (
                incidencias.map((e, index) => (
                  <tr key={e.id}>
                    <td>{index + 1}</td>
                    <td>{e.nombre}</td>
                    <td>{e.fecha.slice(0, 10) + " " + e.hora}</td>
                    <td>
                      <button
                        className="btn btn-success mr-2"
                        type="button"
                        onClick={() => handleViewIncidencia(e.descripcion)}
                      >
                        Visualizar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    <div className="d-flex justify-content-center">
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Container>

      <Modal show={show} onHide={handleCLose} className="color-texto">
        <Modal.Header className="fondo borde" closeButton>
          <Modal.Title>Descripcion</Modal.Title>
        </Modal.Header>
        <Modal.Body className="fondo borde">
          <p>{descripcion}</p>
        </Modal.Body>
        <Modal.Footer className="fondo borde">
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleCLose}
          >
            Cerrar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
