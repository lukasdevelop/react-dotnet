import { useEffect, useState } from "react";


const atividadeInicial = {
  id: 0,
  titulo: "",
  prioridade: 0,
  descricao: "",
};

export default function AtividadeForm(props) {
  const [atividade, setAtividade] = useState(atividadeAtual());

  useEffect(() => {
    if (props.ativSelecionada.id !== 0) setAtividade(props.ativSelecionada);
  }, [props.ativSelecionada]);

  const inputTextHandler = (e) => {
    const { name, value } = e.target;

    setAtividade({ ...atividade, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    if(props.ativSelecionada.id !== 0){
      props.atualizarAtividade(atividade)
    }else {
      props.addAtividade(atividade)
    }

    setAtividade(atividadeInicial)
  }

  const handlerCancelar = (e) => {
    e.preventDefault();

    props.cancelarAtividade();

    setAtividade(atividadeInicial);
  };

  function atividadeAtual() {
    if (props.ativSelecionada.id !== 0) {
      return props.ativSelecionada;
    } else {
      return atividadeInicial;
    }
  }

  return (
    <>

    <form className="row g-3" onSubmit={handleSubmit}>
      <div className="col-md-6">
        <label className="form-label">Titulo:</label>
        <input
          id="titulo"
          type="text"
          className="form-control"
          name="titulo"
          value={atividade.titulo}
          onChange={inputTextHandler}
          placeholder="Titulo"
        ></input>
      </div>
      <div className="col-md-6">
        <label className="form-label">Prioridade</label>
        <select
          id="prioridade"
          className="form-select"
          name="prioridade"
          value={atividade.prioridade}
          onChange={inputTextHandler}
        >
          <option value="NaoDefinido">Choose...</option>
          <option value="Baixa">Baixa</option>
          <option value="Normal">Normal</option>
          <option value="Alta">Alta</option>
        </select>
      </div>

      <div className="col-12">
        <label className="form-label">Descrição:</label>
        <input
          id="descricao"
          type="text"
          name="descricao"
          value={atividade.descricao}
          onChange={inputTextHandler}
          className="form-control"
          placeholder="descricao"
        ></input>
      <hr />
      </div>
      <div className="col-12 mt-0">
        {atividade.id === 0 ? (
          <button
            className="btn btn-outline-success" type="submit"
          >
            Salvar
          </button>
        ) : (
          <>
            <button  className="btn btn-outline-success me-2" type="submit">
              + Salvar
            </button>
            <button
              className="btn btn-outline-warning"
              onClick={handlerCancelar}
            >
              + Cancelar
            </button>
          </>
        )}
      </div>
    </form>
    </>
  );
}
