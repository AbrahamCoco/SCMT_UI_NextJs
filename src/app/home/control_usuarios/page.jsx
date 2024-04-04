"use client"
import { UserController } from "@/app/home/control_usuarios/userController";
import { useState, useEffect } from "react";

function ControlUsuarios() {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await UserController.getAll();
                setData(response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="container py-4">
            <div className="row">
                <div className="col-6">
                    <h1 className="color-texto">Administración de usuarios</h1>
                </div>
                <div className="col-6 align-items-center alineacion">
                    <button type="button" className="btn btn-info align-content-end" id="myBtn">Agregar usuario</button>
                </div>
            </div>

            <div className="py-4">
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Rol</th>
                            <th scope="col">Usuario</th>
                            <th scope="col">Compañía</th>
                            <th scope="col">Modificar</th>
                            <th scope="col">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data ? (
                            data.map((e, index) => (
                                <tr key={e.id}>
                                    <td>{index + 1}</td>
                                    <td>{e.nombre + " " + e.primer_apellido + " " + e.segundo_apellido}</td>
                                    <td>{e.trol_id}</td>
                                    <td>{e.usuario}</td>
                                    <td>{e.tcompania_id}</td>
                                    <td><button type="button" onClick={() => actualizar(e.id)}><i className="material-icons">&#xe254;</i></button></td>
                                    <td><button type="button" onClick={() => eliminar(e.id)}><i className="material-icons">&#xe16c;</i></button></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">Loading...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ControlUsuarios;