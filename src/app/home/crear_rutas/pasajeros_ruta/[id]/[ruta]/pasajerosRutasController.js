import { Tarjet } from "@/utils/urls";
import { Utils } from "@/utils/utils";

export class PasajerosRutasController {
  static async getConsultarPasajerosRutas(codigo) {
    try {
      const respuesta = await fetch(
        Tarjet.routePassengersApi.consultarPasajerosRuta + "?id=" + codigo,
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
        Tarjet.routePassengersApi.consultarPasajeros + "?compania=" + compania,{
          method: "GET",
        });
      const res = await respuesta.json();
      return res;
    } catch (error) {
      Utils.swalError("Error en la petición");
    }
  }

  static async insertPasajeroRuta(codigo, pasajero, cuerpo) {
    try {
      const respuesta = await fetch(
        Tarjet.routePassengersApi.insertarPasajeroRuta + "?ruta=" + codigo + "&pasajero=" + pasajero, {
          method: "POST",
          body: cuerpo,
        });
      const res = await respuesta.json();
      if (res.data === "Pasajero existente en la ruta") {
        Utils.swalFailure("El pasajero ya existe en la ruta","");
      } else {
        Utils.swalSuccess("Pasajero agregado correctamente");
      }
    } catch (error) {
      Utils.swalError("Error en la petición");
    }
  }

  static async deletePasajeroRuta(id) {
    try {
      const responseAlert = await Utils.swalFire("¿Desea eliminar el pasajero de la ruta?","No podrá revertir esta acción, esta acción podría causar problemas en el sistema.","eliminar")

      if (responseAlert) {
        const respuesta = await fetch( Tarjet.routePassengersApi.eliminarPasajeroRuta + "?id=" + id, {
            method: "GET",
          });
        const res = await respuesta.json();
        if (res.success === true) {
          Utils.swalSuccess("Pasajero eliminado correctamente");
        } else {
          Utils.swalError("Error en la petición");
        }
      }
    } catch (error) {
      Utils.swalError("Error en la petición");
    }
  }
}
