import { Tarjet } from "@/utils/urls";
import { Utils } from "@/utils/utils";

export class IncidenciasController {
  static async getConsultarRutas(compania) {
    try {
      const respuesta = await fetch(
        Tarjet.userApi.consultarRutas + "?compania=" + compania,
        {
          method: "GET",
        },
      );
      const res = await respuesta.json();
      if (res.success === true && res.data != "") {
        console.log(res.data);
        return res.data;
      } else {
        Utils.swalError("Error en la petición");
      }
    } catch (error) {
      Utils.swalError("Error en la petición");
    }
  }

  static async getConsultarIncidencias(conductor) {
    try {
      const respuesta = await fetch(
        Tarjet.userApi.consultarIncidencias + "?rutas=" + conductor,
        {
          method: "GET",
        },
      );
      const res = await respuesta.json();
      if (res.success === true && res.data != "") {
        console.log(res.data);
        return res.data;
      } else {
        Utils.swalError("Error en la petición");
      }
    } catch (error) {
      Utils.swalError("Error en la petición");
    }
  }
}
