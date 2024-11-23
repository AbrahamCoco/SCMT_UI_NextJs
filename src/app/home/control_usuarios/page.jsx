"use client";
import { UserController } from "@/app/home/control_usuarios/userController";
import { Utils } from "@/utils/utils";
import { useState, useEffect, useCallback } from "react";

export default function ControlUsuarios() {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchData = useCallback(async () => {
    try {
      const response = await UserController.getAll();
      setData(response);
      Utils.swalSuccess("Datos cargados correctamente");
    } catch (error) {
      Utils.swalError("Error al cargar los datos");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginatedData = data
    ? data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];

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
            {paginatedData.length > 0 ? (
              paginatedData.map((e, index) => (
                <tr key={e.id}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>
                    {e.nombre +
                      " " +
                      e.primer_apellido +
                      " " +
                      e.segundo_apellido}
                  </td>
                  <td>{e.trol_descripcion}</td>
                  <td>{e.usuario}</td>
                  <td>{e.tcompania_nombre}</td>
                  <td className="text-center">
                    <button
                      type="button"
                      onClick={() => actualizar(e.id)}
                      className="btn btn-warning"
                    >
                      <i class="bx bxs-edit"></i>
                    </button>
                  </td>
                  <td className="text-center">
                    <button
                      type="button"
                      onClick={() => eliminar(e.id)}
                      className="btn btn-danger"
                    >
                      <i class="bx bxs-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {data && data.length > itemsPerPage && (
          <div className="d-flex justify-content-end">
            <nav>
              <ul className="pagination">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button className="page-link" onClick={handlePreviousPage}>
                    Anterior
                  </button>
                </li>
                {Array.from(
                  { length: Math.ceil(data.length / itemsPerPage) },
                  (_, i) => (
                    <li
                      key={i}
                      className={`page-item ${i + 1 === currentPage ? "active" : ""}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(i + 1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ),
                )}
                <li
                  className={`page-item ${
                    currentPage === Math.ceil(data.length / itemsPerPage)
                      ? "disabled"
                      : ""
                  }`}
                >
                  <button className="page-link" onClick={handleNextPage}>
                    Siguiente
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
