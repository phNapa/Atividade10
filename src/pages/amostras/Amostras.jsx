import axios from "axios";
import React, { useEffect, useState } from "react";

const Amostras = () => {
  const [idAmostra, setIdAmostra] = useState([]);
  const [loading, setLoading] = useState(true);
  const [idAmostraProcurar, setIdAmostraProcurar] = useState('')
  const [amostra, setAmostra] = useState({})
  const [amostraEncontrado, setAmostraEncontrado] = useState(false)

  const getAmostrasPresentes = async () => {
    const response = await axios.get("https://uno.up.railway.app/amostras");
    const data = response.data;
    const idAmostra = data?.map((amostra) => amostra.id);
    setIdAmostra(idAmostra);
    setLoading(false);
  };

  const onInputChange = (e) => {
    setIdAmostraProcurar({ ...amostra, [e.target.name]: e.target.value })
}

  const getAmostra = async (e) => {
    e.preventDefault()
    const response = await axios.get(`https://uno.up.railway.app/amostras/${idAmostraProcurar.idAmostra}`)
    if(response.status === 200) {
      const data = response.data
      setAmostra(data)
      setAmostraEncontrado(true)
    } else {
      setAmostra({})
      setAmostraEncontrado(false)
    }
  }

  useEffect(() => {
    getAmostrasPresentes();
  });

  return (
    <div>
      {loading ? (
        <div></div>
      ) : (
        <div>
          <div className="pb-10">
            <p>Amostras Presentes no Banco de Dados: </p>
            {idAmostra.map((idAmostra) => (
              <p>{idAmostra}</p>
            ))}
          </div>

          <form className="pb-14" onSubmit={getAmostra}>
            <input
              className="text-sm py-2 px-3 rounded-md shadow-sm ring-1 ring-gray-300 ring-inset focus:ring-indigo-600 focus:ring-2 focus:ring-inset focus:outline-none w-80"
              name="idAmostra"
              type="text"
              placeholder="Informe um id"
              onChange={(e) => onInputChange(e)}
            />
            <button className="block mx-auto w-80 mt-5 bg-indigo-600 text-white font-semibold font-inter text-sm px-3 py-2 rounded-md hover:bg-indigo-500">Procurar</button>
          </form>

          <div>
            {
              amostraEncontrado ? ( <div>
                <p>IdAmostra: {amostra.id}</p>
                <p>Nome da Amostra: {amostra.nome}</p>
                <p>Descrição: {amostra.descricao}</p>
                <p>Tipo: {amostra.tipo}</p>
                <p>Nota Fiscal: {amostra.notaFiscal}</p>
                <p>Validade: {amostra.validade}</p>
              </div>) : (<div></div>)
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default Amostras
