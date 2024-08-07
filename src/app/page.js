"use client";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { Tarjet } from "@/utils/urls";
import { Utils } from "@/utils/utils";

export default function Login() {
  const router = useRouter();
  const onSubmit = async (e) => {
    e.preventDefault();
    const usuario = e.target.usuario.value;
    const contrasenia = e.target.contrasenia.value;
    const cuerpo = new URLSearchParams("usuario=" + usuario);
    cuerpo.append("contraseña", contrasenia);
    try {
      const respuesta = await fetch(Tarjet.userApi.login, {
        method: "POST",
        body: cuerpo,
      });
      const res = await respuesta.json();
      console.log(res);

      if (res.success === true) {
        if (res.data.trol_id === 1) {
          sessionStorage.setItem("idUser", res.data.id);
          sessionStorage.setItem(
            "nombre",
            res.data.nombre +
              " " +
              res.data.primer_apellido +
              " " +
              res.data.segundo_apellido,
          );
          sessionStorage.setItem("telefono", res.data.telefono);
          sessionStorage.setItem("descripcion", res.data.descripcion);
          sessionStorage.setItem("foto", res.data.fotografia);
          sessionStorage.setItem("compania", res.data.tcompania_id);
          Utils.swalSuccess("Bienvenido, inicio de sesión exitoso");
          router.push("/home");
        } else {
          Utils.swalFailure("Lo sentimos", "No eres administrador");
        }
      } else {
        Utils.swalFailure("Lo sentimos", "Usuario o contraseña invalidos");
      }
    } catch (error) {
      Utils.swalError("Error en la petición");
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
              <form onSubmit={onSubmit}>
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
                      <button className="btn btn-primary boton-ovalo">
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
  );
}
