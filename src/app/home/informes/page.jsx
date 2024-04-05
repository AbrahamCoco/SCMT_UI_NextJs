import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";

export default function Informes() {
  function CardInforme({ title, description, href }) {
    return (
      <Col md={6}>
        <div className="fondo p-2">
          <div className="icono">
            <i className="fas fa-file-download"></i>
          </div>
          <h3 className="color-texto">{title}</h3>
          <p className="color-texto">{description}</p>
          <div className="text-right alinear-boton">
            <Link href={href}>
              <button type="button" className="btn btn-primary boton-ovalo">
                Visualizar
              </button>
            </Link>
          </div>
        </div>
      </Col>
    );
  }

  return (
    <Container className="py-4">
      <Row>
        <Col md={12}>
          <h1 className="color-texto">Informes de estado</h1>
        </Col>
      </Row>

      <div className="py-3">
        <Row className="py-2">
          <CardInforme
            title={"Informe de Incidencias"}
            description={
              "Aqui puedes descargar un informe de las incidencias de las unidades"
            }
            href={"/home/informes/#"}
          />
          <CardInforme
            title={"Informe de Rutas"}
            description={"Aqui puedes descargar un informe de las rutas"}
            href={"/home/informes/#"}
          />
        </Row>
        <Row className="py-2">
          <CardInforme
            title={"Informe de Asistencia"}
            description={
              "Aquí puedes descargar un informe de la asistencia de los obreros de la planta"
            }
            href={"/home/informes/#"}
          />
          <CardInforme
            title={"Informe de Mantenimiento"}
            description={
              "Aquí puedes descargar un informe del mantenimiento de las unidades"
            }
            href={"/home/informes/#"}
          />
        </Row>
      </div>
    </Container>
  );
}
