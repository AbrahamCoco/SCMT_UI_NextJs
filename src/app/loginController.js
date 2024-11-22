import { Tarjet } from "@/utils/urls";
import { Utils } from "@/utils/utils";

export class LoginController {
  static async login(usuario, contraseña) {
    try {
      const response = await fetch(Tarjet.userApi.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario: usuario,
          contraseña: contraseña,
        }),
      });
      return response;
    } catch (error) {
      Utils.swalError("Error en la petición (Controller)");
    }
  }
}
