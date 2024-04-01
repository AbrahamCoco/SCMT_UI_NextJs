'use client'
import { UserController } from '@/app/home/control_usuarios/userController'
async function loadData() {
  const data = await UserController.getAll()
  console.log(data)
  return data
}

export default async function Control_usuarios() {
  //console.log(sessionStorage.getItem('idUser'))
  let i = 1
  const data = await loadData()
  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-6">
          <h1 className="color-texto">Administración de usuarios</h1>
        </div>
        <div className="col-6 align-items-center alineacion">
          <button
            type="button"
            className="btn btn-info align-content-end"
            id="myBtn"
          >
            Agregar usuario
          </button>
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
            {data.map((e) => (
              <tr key={e.id}>
                <td>{i++}</td>
                <td>
                  {e.nombre +
                    ' ' +
                    e.primer_apellido +
                    ' ' +
                    e.segundo_apellido}
                </td>
                <td>{e.trol_id}</td>
                <td>{e.usuario}</td>
                <td>{e.tcompania_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
