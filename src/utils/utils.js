import Swal from "sweetalert2";

export class Utils {
  static swalFailure(title, message) {
    Swal.fire({
      position: "top-end",
      toast: true,
      showConfirmButton: false,
      icon: "warning",
      width: 300,
      title: title,
      text: message,
      timer: 3000,
      timerProgressBar: true,
    });
  }

  static swalError(message) {
    Swal.fire({
      position: "top-end",
      toast: true,
      showConfirmButton: false,
      icon: "error",
      title: "Oops...",
      text: message,
      timer: 5000,
      timerProgressBar: true,
    });
  }

  static swalSuccess(message) {
    Swal.fire({
      position: "top-end",
      toast: true,
      showConfirmButton: false,
      icon: "success",
      title: "¡Éxito!",
      text: message,
      timer: 3000,
      timerProgressBar: true,
    });
  }

  static async swalFire(title, message, button) {
    const result = await Swal.fire({
      title: title,
      text: message,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, " + button + "!"
    });
    if (result.isConfirmed) {
      return true;
    } else {
      return false; 
    }
  }
}
