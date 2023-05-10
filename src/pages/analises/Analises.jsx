import { useEffect, useState } from 'react'

const Analises = () => {
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [especificacao, setEspecificacao] = useState("");
  const [dataDeAnalise, setData] = useState("");
  const [status, setStatus] = useState("");

  function handleInputChange(event) {
    setId(event.target.value);
  }

  const [analise, setAnalise] = useState({
    id: "",
    nome: "",
    especificacao: "",
    dataDeAnalise: "",
    status: "",
  });

  const getAnalise = () => {
    fetch(`https://uno.up.railway.app/analises/${id}`)
      .then((resposta) => resposta.json())
      .then((json) => {
        if (json) {
          setAnalise(json);
        }
      });
  };

  useEffect(() => {
    getAnalise(id);
  }, [id]);

  return (
    <div>
      <p>
        IDs existentes no banco: 'ana_2ab21043-6d08-4611-b8a1-8002c721555c',
        'ana_9d607a89-251d-415e-b4c6-a1b8fdbef026',
        'ana_ba7bfa46-ce47-4640-9b7d-0d50cd4a4cde'
      </p>
      <p>Get analise por ID</p>
      <input
        placeholder="Insira um dos IDs citados"
        type="text"
        onChange={handleInputChange}
      />
      <p>ID: {analise.id}</p>
      <p>Nome: {analise.nome}</p>
      <p>Especificação: {analise.especificacao}</p>
      <p>Data de analise: {analise.dataDeAnalise}</p>
      <p>Status: {analise.status}</p>
    </div>
  );
};

export default Analises;
