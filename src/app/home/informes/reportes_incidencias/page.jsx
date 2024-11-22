"use client";
import { useCallback, useState } from "react";
import { InformesController } from "../informesController";
import { Utils } from "@/utils/utils";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ReportesIncidencias() {
  const [data, setData] = useState(null);
  const [inicio, setInicio] = useState("");
  const [fin, setFin] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await InformesController.getReportesIncidencias(
        inicio,
        fin,
      );
      setData(response);
      Utils.swalSuccess("Datos cargados correctamente");
    } catch (error) {
      Utils.swalError("Error al cargar los datos");
    }
  }, [inicio, fin]);

  const generarPDFIncidencias = useCallback(async () => {
    const doc = new jsPDF();
    const fecha = new Date();
    const piePagina = "SCMT - Pagina ";
    const fechaFormateada = fecha.toLocaleString();

    doc.text("Informe de Incidencias", 80, 17);
    doc.text(
      "Fecha/Hora de impresion: " + fechaFormateada.slice(0, 16),
      10,
      27,
    );

    let totalPaginas = doc.internal.pages.length;
    for (let i = 1; i <= totalPaginas; i++) {
      doc.setPage(i);
      doc.text(piePagina + 1, 10, doc.internal.pageSize.getHeight() - 10);
    }

    let columns = [
      "No.",
      "Nombre del conductor",
      "Incidencia",
      "Ruta",
      "Descripción",
      "Fecha/Hora",
    ];

    const responseData = data.map((d, index) => [
      index + 1,
      d.nombre + " " + d.primer_apellido + " " + d.segundo_apellido,
      d.nombre_incidente,
      d.nombre_ruta,
      d.descripcion,
      d.fecha.slice(0, 10) + " " + d.hora,
    ]);

    autoTable(doc, { head: [columns], body: responseData, startY: 30 });

    return doc;
  }, [data]);

  const visualizarPDFIncidencias = useCallback(async () => {
    const doc = await generarPDFIncidencias();
    if (doc) {
      const pdfData = doc.output();
      const blob = new Blob([pdfData], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      // const iframe = document.getElementById("pdfModal");
      iframe.src = url;
    }
  }, [generarPDFIncidencias]);

  const descargarPDFIncidencias = useCallback(async () => {
    const doc = await generarPDFIncidencias();
    if (doc) {
      doc.save("Informe de Incidencias.pdf");
    }
  }, [generarPDFIncidencias]);

  const handleGeneratePDFIncidencias = async () => {
    handleShow();
    await visualizarPDFIncidencias();
  };

  return (
    <>
      <div className="container py-3">
        <div className="row">
          <div className="col-12">
            <h1 className="color-texto">Informe de Incidencias</h1>
          </div>
        </div>
        <div className="row p-2">
          <div className="col-4">
            <label htmlFor="" className="form-label color-texto">
              Desde:
            </label>
            <input
              type="date"
              className="form-control"
              id="inicio"
              value={inicio}
              onChange={(e) => setInicio(e.target.value)}
            />
          </div>
          <div className="col-4">
            <label htmlFor="" className="form-label color-texto">
              Hasta:
            </label>
            <input
              type="date"
              className="form-control"
              id="fin"
              value={fin}
              onChange={(e) => setFin(e.target.value)}
            />
          </div>
          <div className="col-4 text-right">
            <button
              className="btn btn-primary"
              type="button"
              onClick={fetchData}
            >
              Buscar
            </button>
          </div>
        </div>
        <div className="container p-2">
          <div className="col-12">
            <table className="table table-dark">
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Nombre del conductor</th>
                  <th scope="col">Incidencia</th>
                  <th scope="col">Ruta</th>
                  <th scope="col">Descripción</th>
                  <th scope="col">Fecha/Hora</th>
                </tr>
              </thead>
              <tbody>
                {data ? (
                  data.map((e, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        {e.tusuario_nombre +
                          " " +
                          e.tusuario_primerapellido +
                          " " +
                          e.tusuario_segundoapellido}
                      </td>
                      <td>{e.nombre}</td>
                      <td>{e.truta_nombre}</td>
                      <td>{e.descripcion}</td>
                      <td>{e.fecha.slice(0, 10) + " " + e.hora}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      Esperando rango de fechas para mostrar datos
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="p-2">
          <div className="col-12 text-right">
            <button
              type="button"
              className="btn btn-success"
              onClick={handleGeneratePDFIncidencias}
            >
              Visualizar PDF
            </button>
          </div>
        </div>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        className="tamanio-modal"
        role="document"
      >
        <Modal.Header className="fondo borde" closeButton>
          <Modal.Title className="color-texto">PDF Generado</Modal.Title>
        </Modal.Header>
        <Modal.Body className="fondo borde">
          <iframe
            id="pdfModal"
            title="PDF Viewer"
            width="100%"
            height="500px"
          ></iframe>
        </Modal.Body>
        <Modal.Footer className="fondo borde">
          <Button variant="success" onClick={descargarPDFIncidencias}>
            Descargar PDF
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
