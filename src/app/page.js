"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { LoginController } from "./loginController";

export default function Login() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  const login = async () => {
    try {
      const response = await LoginController.login(usuario, contrasenia);
      const res = await response.json();
      if (res.success === true) {
        router.push("/home");

        sessionStorage.setItem(
          "nombre",
          `${res.data[0].nombre} ${res.data[0].primer_apellido} ${res.data[0].segundo_apellido}`,
        );
        sessionStorage.setItem(
          "descripcion",
          res.data[0].tusuario_admin_descripcion,
        );
        sessionStorage.setItem("telefono", res.data[0].tusuario_admin_telefono);
        sessionStorage.setItem("fotoo", res.data[0].tusuario_admin_fotografia);
      } else {
        console.log("Error al iniciar sesión");
      }
    } catch (error) {
      console.log("Error en la petición");
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Card className="transparencia">
            <div className="d-flex justify-content-center">
              <div className="imagen-logo">
                <Image src="/images/SCMTLOGO.png" alt="SCMT" />
              </div>
            </div>
            <div className="card-header text-center">Iniciar sesión</div>
            <div className="transparencia card-body">
              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  Usuario
                </label>
                <input
                  type="text"
                  id="usuario"
                  className="form-control"
                  placeholder="Usuario"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
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
                  placeholder="Contraseña"
                  value={contrasenia}
                  onChange={(e) => setContrasenia(e.target.value)}
                />
              </div>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-md-4 text-center">
                    <button
                      className="btn btn-primary boton-ovalo mt-3"
                      onClick={login}
                    >
                      Iniciar Sesión
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
