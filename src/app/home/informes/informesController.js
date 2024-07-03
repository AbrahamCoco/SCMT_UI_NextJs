import { Tarjet } from "@/utils/urls";
import { Utils } from "@/utils/utils";

export class InformesController {
  static async getReportesIncidencias(inicio, fin) {
    try {
      const respuesta = await fetch(
        Tarjet.userApi.consultarInformeIncidencia +
          "?inicio=" +
          inicio +
          "&fin=" +
          fin,
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

  static async getReportesAsistencia(inicio, fin) {
    try {
      const respuesta = await fetch(
        Tarjet.userApi.consultarInformeAsistencia +
          "?inicio=" +
          inicio +
          "&fin=" +
          fin,
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
}
