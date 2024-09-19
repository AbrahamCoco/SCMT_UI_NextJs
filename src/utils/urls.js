const baseUrl = "http://localhost:5000/scmt";

const tarjetApi = {
  user : "/user",
  routes : "/routes",
  routePassengers : "/routePassengers",
  reports : "/reports",
  incidents : "/incidents",
}

export const Tarjet = {
  userApi: {
    login: baseUrl + tarjetApi.user + "/consultarU",
    getAllUsers: baseUrl + tarjetApi.user + "/consultarAll",

  },

  routesApi: {
    consultarRutas: baseUrl + tarjetApi.routes + "/consultarRutas",
    eliminarRuta: baseUrl + tarjetApi.routes + "/eliminarRuta",
    consultarConductores: baseUrl + tarjetApi.routes + "/consultarConductores",
    actualizarRuta: baseUrl + tarjetApi.routes + "/actualizarRuta",
    insertarRuta: baseUrl + tarjetApi.routes + "/insertarRuta",
  },

  routePassengersApi: {
    consultarPasajerosRuta: baseUrl + tarjetApi.routePassengers + "/consultarPasajerosRuta",
    consultarPasajeros: baseUrl + tarjetApi.routePassengers + "/consultarPasajeros",
    insertarPasajeroRuta: baseUrl + tarjetApi.routePassengers + "/insertarPasajeroRuta",
    eliminarPasajeroRuta: baseUrl + tarjetApi.routePassengers + "/eliminarPasajeroRuta",
  },

  reportsApi: {
    consultarInformeIncidencia: baseUrl + tarjetApi.reports + "/consultarInformeIncidencia",
    consultarInformeAsistencia: baseUrl + tarjetApi.reports + "/consultarInformeAsistencia",
  },

  incidentsApi: {
    consultarIncidencias: baseUrl + tarjetApi.incidents + "/concultarIncidencias",
  },
};
