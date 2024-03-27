import 'bootstrap/dist/css/bootstrap.min.css'
import '../../css/styles.css'
import CardHome from '@/components/CardHome'

export default function Home() {
  return (
    <>
      <div className="container padding-container ">
        <div className="row align-content-center">
          <CardHome
            title="Control de usuarios"
            icon="bxs-user-detail"
            href="/home/control_usuarios"
          />
          <CardHome
            title="Ubicacion de unidades"
            icon="bx-map"
            href="/home/ubicacion_unidades"
          />
          <CardHome
            title="Crear rutas"
            icon="bxs-map-alt"
            href="/home/crear_rutas"
          />
        </div>
        <div className="row align-content-center">
          <CardHome
            title="Incidencias"
            icon="bxs-bookmark"
            href="/home/incidencias"
          />
          <CardHome title="Informes" icon="bxs-archive" href="/home/informes" />
          <CardHome
            title="Configuracion"
            icon="bxs-cog"
            href="/home/configuracion"
          />
        </div>
        <div className="row align-content-center">
          <CardHome title="Info" icon="bxs-info" href="/home/#" />
          <CardHome title="Info" icon="bx-info" href="/home/#" />
          <CardHome title="Info" icon="bxs-info" href="/home/#" />
        </div>
      </div>
      {/* <Link href="/">
                <button>
                    Regresar al home
                </button>
            </Link> */}
    </>
  )
}
