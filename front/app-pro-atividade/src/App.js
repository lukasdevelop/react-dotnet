import AtividadeForm from "./components/AtividadeForm";
import AtividadeLista from "./components/AtividadeLista";
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

import api from "./api/atividade";

function App() {
  const [showAtividadeModal, setShowAtividadeModal] = useState(false);
  const [smShowConfirmModal, SetSmShowConfirmModal] = useState(false);
  const [atividades, setAtividades] = useState([]);
  const [atividade, setAtividade] = useState({ id: 0 });

  const toggleAtividadeModal = () => setShowAtividadeModal(!showAtividadeModal)

  const toggleShowConfirmModal = (id) => {
    if(id !==  0 && id !== undefined){
      const atividade = atividades.filter((atividade) => atividade.id === id);

      setAtividade(atividade[0]);
      
    }else{
      setAtividade({ id: 0 });
    }
    SetSmShowConfirmModal(!smShowConfirmModal) 
  } 

  const getAllActivities = async () => {
    const response = await api.get("atividade");

    return response.data;
  };

  useEffect(() => {
    const getActivities = async () => {
      const allActivities = await getAllActivities();

      if (allActivities) setAtividades(allActivities);
    };

    getActivities();
  }, []);

  const addAtividade = async (act) => {
    toggleAtividadeModal()
    const response = await api.post("atividade", act);

    setAtividades([...atividades, response.data]);
  };

  const deletarAtividade = async (id) => {

    if (await api.delete(`atividade/${id}`)) {
      const atividadesFiltradas = atividades.filter(
        (atividade) => atividade.id !== id
      );

      setAtividades([...atividadesFiltradas]);
      SetSmShowConfirmModal(!smShowConfirmModal)
    }
  };

  const pegarAtividade = (id) => {
    const atividade = atividades.filter((atividade) => atividade.id === id);
    setAtividade(atividade[0]);
    toggleAtividadeModal()
  }

  const novaAtividade = () => {
    setAtividade({ id: 0 });
    toggleAtividadeModal()
  }

  const atualizarAtividade = async (ativ) => {
    const response = await api.put(`atividade/${ativ.id}`, ativ);

    const { id } = response.data;

    setAtividades(
      atividades.map((item) => (item.id === id ? response.data : item))
    );

    toggleAtividadeModal()
    setAtividade({ id: 0 });
  };

  const cancelarAtividade = () => {
    setAtividade({ id: 0 });
    toggleAtividadeModal()
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-end mt-2 pb-3 border-bottom border-1 ">
        <h1 className="m-0 p-0">Atividade {atividade.id !== 0 ? atividade.id : ""}</h1>
        <Button variant="outline-secondary" onClick={novaAtividade}>
          <span class="material-symbols-outlined">list_alt_add</span>
        </Button>
      </div>
      <AtividadeLista
        atividades={atividades}
        pegarAtividade={pegarAtividade}
        toggleShowConfirmModal={toggleShowConfirmModal}
      ></AtividadeLista>

      <Modal show={showAtividadeModal} onHide={toggleAtividadeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Atividade {atividade.id !== 0 ? atividade.id : ""}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AtividadeForm
            cancelarAtividade={cancelarAtividade}
            atualizarAtividade={atualizarAtividade}
            addAtividade={addAtividade}
            ativSelecionada={atividade}
            atividades={atividades}
          ></AtividadeForm>
        </Modal.Body>
      </Modal>

      <Modal size="sm" show={smShowConfirmModal} onHide={toggleShowConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>Excluindo Atividade {atividade.id !== 0 ? atividade.id : ""}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir a Atividade {atividade.id} ?
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <button className="btn btn-success me-2" onClick={() => deletarAtividade(atividade.id)}>Sim</button>
          <button className="btn btn-danger me-2" onClick={() => toggleShowConfirmModal(0)}>Não</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
