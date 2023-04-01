import React from 'react'
import Atividade from "./Atividade";

export default function AtividadeLista(props) {
     
  return (
    <div className="mt-3">
        {props.atividades.map((ativ) => (
          <Atividade key={ativ.id} ativ={ativ} toggleShowConfirmModal={props.toggleShowConfirmModal}  pegarAtividade={props.pegarAtividade}></Atividade>
        ))}
      </div>
  )
}
