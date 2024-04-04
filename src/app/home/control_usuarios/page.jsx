import CargaUsuarios from "@/components/CargaUsuarios";

export default function Control_usuarios() {
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
          <CargaUsuarios />
        </table>
      </div>
    </div>
  );
}
