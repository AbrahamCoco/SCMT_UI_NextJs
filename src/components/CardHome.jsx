import Link from "next/link";

export default function CardHome({ title, icon, href }) {
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
