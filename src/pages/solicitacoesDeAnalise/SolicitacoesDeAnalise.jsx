import axios from "axios";
import React, { useEffect, useState } from "react";

const SolicitacoesDeAnalise = () => {
  const [id, setId] = useState([]);
  const [loading, setLoading] = useState(true);
  const [idProcurar, setIdProcurar] = useState('')
  const [solicitacao, setSolicitacao] = useState({})
  const [solicitacaoEncontrada, setSolcitacaoEncontrada] = useState(false)

  const getSolicitantesPresentes = async () => {
    const response = await axios.get("https://uno.up.railway.app/solicitacoes-de-analise");
    const data = response.data;
    const ids = data?.map((solicitacao) => solicitacao.id);
    setId(ids);
    setLoading(false);
  };

  const onInputChange = (e) => {
    setIdProcurar(e.target.value)
}

  const getSolicitante = async (e) => {
    e.preventDefault()
    const response = await axios.get(`https://uno.up.railway.app/solicitacoes-de-analise/${idProcurar}`)
    if(response.status === 200) {
      const data = response.data
      setSolicitacao(data)
      setSolcitacaoEncontrada(true)
    } else {
      setSolicitacao({})
      setSolcitacaoEncontrada(false)
    }
  }

  useEffect(() => {
    getSolicitantesPresentes();
  });

  return (
    <div>
      {loading ? (
        <div></div>
      ) : (
        <div>
          <div className="pb-10">
            <p>Solicitações Presentes no Banco de Dados: </p>
            {id.map((id) => (
              <p>{id}</p>
            ))}
          </div>

          <form className="pb-10" onSubmit={getSolicitante}>
            <input
              className="text-sm py-2 px-3 rounded-md shadow-sm ring-1 ring-gray-300 ring-inset focus:ring-indigo-600 focus:ring-2 focus:ring-inset focus:outline-none w-80"
              name="id"
              type="text"
              placeholder="Informe um id"
              onChange={(e) => onInputChange(e)}
            />
            <button className="block mx-auto w-80 mt-5 bg-indigo-600 text-white font-semibold font-inter text-sm px-3 py-2 rounded-md hover:bg-indigo-500">Procurar</button>
          </form>

          <div>
            {
              solicitacaoEncontrada ? ( <div>
                <p>ID: {solicitacao.id}</p>
                <p>Tipo de Análise: {solicitacao.tipo}</p>
                <p>Considerações Gerais: {solicitacao.consideracoesGerais}</p>
                <p>Informações Adicionais: {solicitacao.informacoesAdicionais}</p>
                <p>Data da Solicitação: {solicitacao.dataDeSolicitacao}</p>
                <p>Status: {solicitacao.status}</p>
                <p>Solicitante: {solicitacao.solicitante.nome}</p>
              </div>) : (<div></div>)
            }
          </div>
        </div>
      )}
    </div>
  );
}

export default SolicitacoesDeAnalise