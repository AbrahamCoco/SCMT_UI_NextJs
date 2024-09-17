const baseUrl = "http://localhost:8080/SCMT-Services";

export const Tarjet = {
  userApi: {
    login: baseUrl + "/consultarU",
    getAllUsers: baseUrl + "/consultarAll",
    consultarInformeIncidencia: baseUrl + "/consultarInformeIncidencia",
    consultarInformeAsistencia: baseUrl + "/consultarInformeAsistencia",
    consultarRutas: baseUrl + "/consultarRutas",
    consultarIncidencias: baseUrl + "/concultarIncidencias",
    eliminarRuta: baseUrl + "/eliminarRuta",
    consultarConductores: baseUrl + "/consultarConductores",
    actualizarRuta: baseUrl + "/actualizarRuta",
    insertarRuta: baseUrl + "/insertarRuta",
    consultarPasajerosRuta: baseUrl + "/consultarPasajerosRuta",
    consultarPasajeros: baseUrl + "/consultarPasajeros",
    insertarPasajeroRuta: baseUrl + "/insertarPasajeroRuta",
    eliminarPasajeroRuta: baseUrl + "/eliminarPasajeroRuta",
  },
};
