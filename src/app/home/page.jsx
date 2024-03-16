import Link from "next/link";
import "../../css/styles.css";

export default function Home() {

    return (
        <div>
            <div className="container padding-container ">
                <div className="row align-content-center">
                    <div className="col-4">
                        <div className="card transparencia m-3 p-2">
                            <div className="card-header">
                                <h4 className="color-texto">Control de usuarios</h4>
                            </div>
                            <div className="card-body">
                                <i className='bx bxs-user-detail icono-personalizado'></i>
                            </div>
                            <Link href="/home/control_usuarios">
                                <button type="submit" className="btn btn-info d-block mx-auto btn-padding">Administrar</button>
                            </Link>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card transparencia m-3 p-2">
                            <div className="card-header">
                                <h4 className="color-texto">Ubicación de unidades</h4>
                            </div>
                            <div className="card-body">
                                <i className='bx bx-map icono-personalizado'></i>
                            </div>
                            <Link href="#" data-toggle="modal" data-target="#modal2">
                                <button type="submit" className="btn btn-info d-block mx-auto btn-padding">Administrar</button>
                            </Link>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card transparencia m-3 p-2">
                            <div className="card-header">
                                <h4 className="color-texto">Crear rutas</h4>
                            </div>
                            <div className="card-body">
                                <i className='bx bxs-map-alt icono-personalizado'></i>
                            </div>
                            <Link href="/home/crear_rutas">
                                <button type="submit" className="btn btn-info d-block mx-auto btn-padding">Administrar</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="row align-content-center">
                    <div className="col-4">
                        <div className="card transparencia m-3 p-2">
                            <div className="card-header">
                                <h4 className="color-texto">Incidencias</h4>
                            </div>
                            <div className="card-body">
                                <i className='bx bxs-bookmark icono-personalizado'></i>
                            </div>
                            <Link href="/home/incidencias">
                                <button type="submit" className="btn btn-info d-block mx-auto btn-padding">Administrar</button>
                            </Link>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card transparencia m-3 p-2">
                            <div className="card-header">
                                <h4 className="color-texto">Informes</h4>
                            </div>
                            <div className="card-body">
                                <i className='bx bxs-archive icono-personalizado'></i>
                            </div>
                            <Link href="/home/informes">
                                <button type="submit" className="btn btn-info d-block mx-auto btn-padding">Administrar</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Link href="/">
                <button>
                    Regresar al home
                </button>
            </Link> */}
        </div>
    );
}