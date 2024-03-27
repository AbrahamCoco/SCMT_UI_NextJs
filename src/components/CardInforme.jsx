import Link from 'next/link'
import { Col } from 'react-bootstrap'

export default function CardInforme({ title, description, href }) {
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
  )
}
