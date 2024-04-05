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
      timer: 3000,
      timerProgressBar: true,
    });
  }

  static swalSuccess() {}
}
