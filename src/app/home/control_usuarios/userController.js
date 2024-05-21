import { Utils } from "@/utils/utils";
import { Tarjet } from "@/utils/urls";

export class UserController {
  static async getAll() {
    try {
      const respuesta = await fetch(
        Tarjet.userApi.getAllUsers + "?compania=1",
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

  static async insert() {}

  static async delete() {}
}
