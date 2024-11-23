"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/styles.css";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  function CardHome({ title, icon, href }) {
    return (
      <div className="col-4">
        <div className="card transparencia m-3 p-2">
          <div className="card-header">
            <div className="color-texto">{title}</div>
          </div>
          <div className="card-body">
            <i className={`bx ${icon} icono-personalizado`}></i>
          </div>
          <Link href={href}>
            <button
              type="submit"
              className="btn btn-info d-block mx-auto btn-padding"
            >
              Administrar
            </button>
          </Link>
        </div>
      </div>
    );
  }

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
      </div>
    </>
  );
}
