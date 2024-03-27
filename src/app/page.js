import { Card, Col, Container, Image, Row } from 'react-bootstrap'

export default function Home() {
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Card className="transparencia">
            <div className="d-flex justify-content-center">
              <div className="imagen-logo">
                <Image src="/images/SCMTLogo.png" alt="SCMT Logo" />
              </div>
            </div>
            <div className="card-header text-center">Iniciar sesión</div>
            <div className="transparencia card-body">
              <form>
                <div className="form-group">
                  <label htmlFor="username" className="form-label">
                    Usuario
                  </label>
                  <input
                    type="text"
                    id="usuario"
                    className="form-control"
                    placeholder="Ingresa usuario"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contrasenia" className="form-label">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="contrasenia"
                    className="form-control"
                    placeholder="Ingresa contraseña"
                  />
                </div>
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-md-4 text-center">
                      <button
                        type="button"
                        className="btn btn-primary boton-ovalo"
                      >
                        Iniciar Sesión
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
