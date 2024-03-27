import CardInforme from '@/components/CardInforme'
import { Col, Container, Row } from 'react-bootstrap'

export default function Informes() {
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
            title={'Informe de Incidencias'}
            description={
              'Aqui puedes descargar un informe de las incidencias de las unidades'
            }
            href={'/home/informes/#'}
          />
          <CardInforme
            title={'Informe de Rutas'}
            description={'Aqui puedes descargar un informe de las rutas'}
            href={'/home/informes/#'}
          />
        </Row>
        <Row className="py-2">
          <CardInforme
            title={'Informe de Asistencia'}
            description={
              'Aquí puedes descargar un informe de la asistencia de los obreros de la planta'
            }
            href={'/home/informes/#'}
          />
          <CardInforme
            title={'Informe de Mantenimiento'}
            description={
              'Aquí puedes descargar un informe del mantenimiento de las unidades'
            }
            href={'/home/informes/#'}
          />
        </Row>
      </div>
    </Container>
  )
}
