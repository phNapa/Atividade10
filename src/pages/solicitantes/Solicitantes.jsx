import axios from "axios";
import React, { useEffect, useState } from "react";

const Solicitantes = () => {
  const [cnpj, setCnpj] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cnpjProcurar, setCnpjProcurar] = useState('')
  const [solicitante, setSolicitante] = useState({})
  const [solicitanteEncontrado, setSolicitanteEncontrado] = useState(false)

  const getSolicitantesPresentes = async () => {
    const response = await axios.get("https://uno.up.railway.app/solicitantes");
    const data = response.data;
    const cnpjs = data?.map((solicitante) => solicitante.cnpj);
    setCnpj(cnpjs);
    setLoading(false);
  };

  const onInputChange = (e) => {
    setCnpjProcurar({ ...solicitante, [e.target.name]: e.target.value })
}

  const getSolicitante = async (e) => {
    e.preventDefault()
    const response = await axios.get(`https://uno.up.railway.app/solicitantes/${cnpjProcurar.cnpj}`)
    if(response.status === 200) {
      const data = response.data
      setSolicitante(data)
      setSolicitanteEncontrado(true)
    } else {
      setSolicitante({})
      setSolicitanteEncontrado(false)
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
            <p>Solicitantes Presentes no Banco de Dados: </p>
            {cnpj.map((cnpj) => (
              <p>{cnpj}</p>
            ))}
          </div>

          <form className="pb-14" onSubmit={getSolicitante}>
            <input
              className="text-sm py-2 px-3 rounded-md shadow-sm ring-1 ring-gray-300 ring-inset focus:ring-indigo-600 focus:ring-2 focus:ring-inset focus:outline-none w-80"
              name="cnpj"
              type="text"
              placeholder="Informe um cnpj"
              onChange={(e) => onInputChange(e)}
            />
          </form>

          <div>
            {
              solicitanteEncontrado ? ( <div>
                <p>CNPJ: {solicitante.cnpj}</p>
                <p>Nome: {solicitante.nome}</p>
                <p>CEP: {solicitante.cep}</p>
                <p>Endereço: {solicitante.endereco}</p>
                <p>Cidade: {solicitante.cidade}</p>
                <p>Estado: {solicitante.estado}</p>
                <p>Telefone: {solicitante.telefone}</p>
                <p>Email: {solicitante.email}</p>
              </div>) : (<div></div>)
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default Solicitantes;
