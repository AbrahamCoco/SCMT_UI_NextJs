"use client";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { PasajerosRutasController } from "./pasajerosRutasController";
import { Utils } from "@/utils/utils";

export default function PasajerosRuta() {
  const params = useParams();
  const ruta = decodeURIComponent(params.ruta);
  const [data, setData] = useState(null);
  const [pasajeros, setPasajeros] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchConsultarPasajerosRutas = useCallback(async () => {
    const id = params.id;
    try {
      const response =
        await PasajerosRutasController.getConsultarPasajerosRutas(id);
      setData(response.data);
    } catch (error) {
      Utils.swalError("Error al cargar los datos");
    }
  }, [params.id]);

  const fetchConsultarPasajeros = useCallback(async () => {
    const compania = sessionStorage.getItem("compania");
    try {
      const response =
        await PasajerosRutasController.getConsultarPasajeros(compania);
      setPasajeros(response.data);
    } catch (error) {
      Utils.swalError("Error al cargar los datos");
    }
  }, []);

  const handleInsertPasajeroRuta = () => async () => {
    const id = params.id;
    const pasajero = document.getElementById("pasajeros").value;
    const cuerpo = new URLSearchParams();
    cuerpo.append("truta_id", id);
    cuerpo.append("tusuario_id", pasajero);
    try {
      await PasajerosRutasController.insertPasajeroRuta(id, pasajero, cuerpo);
      Utils.swalSuccess("Pasajero agregado correctamente");
      fetchConsultarPasajerosRutas();
    } catch (error) {
      Utils.swalError("Error al insertar el pasajero");
    }
  };

  const handleDelete = (id) => async () => {
    try {
      await PasajerosRutasController.deletePasajeroRuta(id);
      Utils.swalSuccess("Pasajero eliminado correctamente");
      fetchConsultarPasajerosRutas();
    } catch (error) {
      Utils.swalError("Error al eliminar el pasajero");
    }
  };

  useEffect(() => {
    fetchConsultarPasajerosRutas();
    fetchConsultarPasajeros();
  }, [fetchConsultarPasajerosRutas, fetchConsultarPasajeros]);

  return (
    <>
      <Container className="py-4">
        <Row>
          <Col md={6}>
            <h1 className="color-texto">Control de pasajeros en {ruta} </h1>
          </Col>
          <Col md={6} className="col-6 align-items-center alineacion">
            <Button
              type="button"
              className="btn btn-info align-content-end"
              onClick={handleShow}
            >
              Agregar pasajeros
            </Button>
          </Col>
        </Row>
        <div className="py-4">
          <table className="table table-dark">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellidos</th>
                <th scope="col">Eliminar</th>
              </tr>
            </thead>
            <tbody id="contenido">
              {data ? (
                data.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.nombre}</td>
                    <td>
                      {item.primer_apellido + " " + item.segundo_apellido}
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={handleDelete(item.id)}
                        className="btn btn-danger"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">
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

      <Modal show={show} onHide={handleClose} className="color-texto">
        <Modal.Header closeButton className="fondo borde">
          <Modal.Title>Agregar Pasajeros</Modal.Title>
        </Modal.Header>
        <Modal.Body className="fondo borde">
          <div className="form-group">
            <label htmlFor="sel1" className="form-label">
              Selecciona el pasajero:
            </label>
            <select name="pasajeros" id="pasajeros" className="form-control">
              {pasajeros ? (
                pasajeros.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.nombre +
                      " " +
                      item.primer_apellido +
                      " " +
                      item.segundo_apellido}
                  </option>
                ))
              ) : (
                <option value="0">No hay pasajeros</option>
              )}
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer className="fondo borde">
          <Button variant="danger" onClick={handleClose}>
            Cancelar
          </Button>
          <button
            type="button"
            onClick={handleInsertPasajeroRuta()}
            className="btn btn-primary"
          >
            Agregar pasajero
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
