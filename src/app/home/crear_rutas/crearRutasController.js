import { Tarjet } from "@/utils/urls";
import { Utils } from "@/utils/utils";

export class CrearRutasController {
  static async getConsultarRutas(compania) {
    try {
      const respuesta = await fetch(
        Tarjet.routesApi.consultarRutas + "?compania=" + compania,
        {
          method: "GET",
        },
      );
      const res = await respuesta.json();
      if (res.success === true && res.data != "") {
        return res.data;
      } else {
        Utils.swalError("Error en la petición");
      }
    } catch (error) {
      Utils.swalError("Error en la petición");
    }
  }

  static async deleteRuta(id) {
    try {
      const respuesta = await fetch(Tarjet.routesApi.eliminarRuta + "?id=" + id, {
        method: "GET",
      });
      const res = await respuesta.json();
      if (res.success === true) {
        Utils.swalSuccess("Ruta eliminada correctamente");
      } else {
        Utils.swalError("Error en la petición");
      }
    } catch (error) {
      Utils.swalError("Error en la petición");
    }
  }

  static async updateRuta(id, data) {
    try {
      const respuesta = await fetch(
        Tarjet.routesApi.actualizarRuta + "?id=" + id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      const res = await respuesta.json();
      if (res.success === true) {
        Utils.swalSuccess("Ruta actualizada correctamente");
      } else {
        Utils.swalError("Error al actualizar la ruta");
      }
    } catch (error) {
      Utils.swalError("Error en la petición");
    }
  }

  static async insertRuta(cuerpo) {
    try {
      const respuesta = await fetch(Tarjet.routesApi.insertarRuta, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cuerpo),
      });
      const res = await respuesta.json();
      if (res.success === true) {
        Utils.swalSuccess("Ruta insertada correctamente");
      } else {
        Utils.swalError("Error al insertar la ruta");
      }
    } catch {
      Utils.swalError("Error en la petición: " + error.message);
    }
  }

  static async getConsultarConductores(compania) {
    try {
      const respuesta = await fetch(
        Tarjet.routesApi.consultarConductores + "?compania=" + compania,
        {
          method: "GET",
        },
      );
      const res = await respuesta.json();
      return res.data;
    } catch (error) {
      Utils.swalError("Error en la petición");
    }
  }
}
