import { Col, Container, Row } from "react-bootstrap";

export default function Incidencias() {
  return (
    <Container className="py-4">
      <Row className="py-2">
        <Col md={12}>
          <h1 className="color-texto">Reportes de incidencias</h1>
        </Col>
      </Row>
      <Row className="py-2">
        <Col md={3}>
          <select name="" id="listaRutass" className="form-control"></select>
        </Col>
        <Col md={3}>
          <button type="button" className="btn btn-primary">
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
          <tbody id="incidencias"></tbody>
        </table>
      </div>
    </Container>
  );
}
