import { Col, Container, Row } from "react-bootstrap";

export default function CrearRutas() {
  return (
    <Container className="py-4">
      <Row>
        <Col md={6}>
          <h1 className="color-texto">Control de rutas</h1>
        </Col>
        <Col md={6} className="align-items-center alineacion">
          <button type="button" className="btn btn-info align-content-end">
            Agregar ruta
          </button>
        </Col>
      </Row>
    </Container>
  );
}
