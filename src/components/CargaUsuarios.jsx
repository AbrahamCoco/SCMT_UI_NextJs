"use client";

import { UserController } from "@/app/home/control_usuarios/userController";
import { useEffect, useState } from "react";

function actualizar() {
  console.log("Actualizar");
}

function eliminar() {
  console.log("Eliminar");
}

export default async function CargaUsuarios() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await UserController.getAll();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <tbody>
      {data.map((e) => (
        <tr key={e.id}>
          <td>{i++}</td>
          <td>
            {e.nombre + " " + e.primer_apellido + " " + e.segundo_apellido}
          </td>
          <td>{e.trol_id}</td>
          <td>{e.usuario}</td>
          <td>{e.tcompania_id}</td>
          <td>
            <button type="button" onClick={actualizar}>
              <i className="material-icons">&#xe254;</i>
            </button>
          </td>
          <td>
            <button type="button" onClick={eliminar}>
              <i className="material-icons">&#xe16c;</i>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
