import { Tarjet } from "@/utils/urls";
import { Utils } from "@/utils/utils";
import Swal from "sweetalert2";

export class PasajerosRutasController {
  static async getConsultarPasajerosRutas(codigo) {
    try {
      const respuesta = await fetch(
        Tarjet.userApi.consultarPasajerosRuta + "?id=" + codigo,
        {
          method: "GET",
        },
      );
      const res = await respuesta.json();
      return res;
    } catch (error) {
      Utils.swalError("Error en la petición");
    }
  }

  static async getConsultarPasajeros(compania) {
    try {
      const respuesta = await fetch(
        Tarjet.userApi.consultarPasajeros + "?compania=" + compania,
        {
          method: "GET",
        },
      );
      const res = await respuesta.json();
      return res;
    } catch (error) {
      Utils.swalError("Error en la petición");
    }
  }

  static async insertPasajeroRuta(codigo, pasajero, cuerpo) {
    try {
      const respuesta = await fetch(
        Tarjet.userApi.insertarPasajeroRuta +
          "?ruta=" +
          codigo +
          "&pasajero=" +
          pasajero,
        {
          method: "POST",
          body: cuerpo,
        },
      );
      const res = await respuesta.json();
      if (res.data == "Pasajero existente en la ruta") {
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: "El pasajero ya existe en la ruta",
          showConfirmButton: false,
          timer: 1900,
        });
      } else {
        Utils.swalSuccess("Pasajero agregado correctamente");
      }
    } catch (error) {
      Utils.swalError("Error en la petición");
    }
  }

  static async deletePasajeroRuta(id) {
    try {
      const result = await Swal.fire({
        title: "¿Desea eliminar el pasajero de la ruta?",
        text: "No podrá revertir esta acción, esta accion podria causar daños en el sistema",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!",
      });

      if (result.isConfirmed) {
        const respuesta = await fetch(
          Tarjet.userApi.eliminarPasajeroRuta + "?id=" + id,
          {
            method: "GET",
          },
        );
        const res = await respuesta.json();
      }
    } catch (error) {
      Utils.swalError("Error en la petición");
    }
  }
}
