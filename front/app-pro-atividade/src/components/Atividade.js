import React from 'react'

export default function Atividade(props) {

  function prioridadeDeStyle(param){
    switch( param ) {
      case "Baixa":
        return 'success';
        case "Normal":
          return 'dark';
          case "Alta":
            return 'warning';
            default:
              return 'not-found';
    }
  }

  function prioridadeDeLabel(param) {
    switch (param) {
      case "Baixa":
        return "Baixa";
      case "Normal":
        return "Normal";
      case "Alta":
        return "Alta";
      default:
        return "Não definido";
    }
  }

  return (
    <div key={props.ativ.id} className={"card mb-2 shadow-sm border-" + prioridadeDeStyle(props.ativ.prioridade)}>
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">
              <span className="badge bg-secondary me-1">{props.ativ.id}</span> - {props.ativ.titulo}
            </h5>
            <h6>
              <span className={'ms-1 text-' + prioridadeDeStyle(props.ativ.prioridade)}> Prioridade: {prioridadeDeLabel(props.ativ.prioridade)}</span>
            </h6>
          </div>
          <p className="card-text">{props.ativ.descricao}</p>
          <div className="d-flex justify-content-end pt-2 m-0 border-top">
            <button className="btn btn-sm btn-outline-primary me-2" onClick={() => props.pegarAtividade(props.ativ.id)}>
              Editar
            </button>
            <button className="btn btn-sm btn-outline-danger" onClick={() => props.toggleShowConfirmModal(props.ativ.id)}>
              Deletar
            </button>
          </div>
        </div>
      </div>
  )
}
