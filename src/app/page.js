"use client"
import { Card, Col, Container, Row } from "react-bootstrap";
import { Tarjet } from "@/utils/urls"

const onSubmit = async (e) =>{
  e.preventDefault()
  const usuario = e.target.usuario.value;
  const contrasenia = e.target.contrasenia.value;
  const cuerpo = new URLSearchParams("usuario=" + usuario);
  cuerpo.append('contraseña', contrasenia);
  try {
    const respuesta = await fetch(Tarjet.userApi.login,{
      method: 'POST',
      body: cuerpo
    });
    const res = await respuesta.json();
    console.log(res)
  
    if(res.success === true){
      console.log("Entra el usuario")
      console.log(res.data.trol_id)
      if(res.data.trol_id === 1){
        alert("Bienvenido administrador")
      }else{
        alert("Lo sentimos no eres administrador")
      }
    }else{
      alert("Lo sentimos credenciales invalidas")
    }
  } catch (error) {
    alert("Lo sentimo error en la peticion")
  }
  
};



export default function Home() {
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Card className="transparencia">
            <div className="d-flex justify-content-center">
              <div className="imagen-logo">
                <img src="/images/SCMTLOGO.png" alt="SCMT" />
              </div>
            </div>
            <div className="card-header text-center">
              Iniciar sesión
            </div>
            <div className="card-body">
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Usuario</label>
                  <input type="text" id="usuario" className="form-control" placeholder="Ingresa usuario" />
                </div>
                <div className="form-group">
                  <label htmlFor="contrasenia">Contraseña</label>
                  <input type="password" id="contrasenia" className="form-control" placeholder="Ingresa contraseña" />
                </div>
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-md-4 text-center">
                      <button className="btn btn-primary boton-ovalo">Iniciar Sesión</button>
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
