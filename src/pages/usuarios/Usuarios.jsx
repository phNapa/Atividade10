import axios from "axios";
import React, { useEffect, useState } from "react";

const Usuarios = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emailProcurar, setEmailProcurar] = useState('')
  const [usuario, setUsuario] = useState({})
  const [usuarioEncontrado, setUsuarioEncontrado] = useState(false)

  const getUsuariosPresentes = async () => {
    const response = await axios.get("https://uno.up.railway.app/usuarios");
    const data = response.data;
    const emails = data?.map((usuario) => usuario.email);
    setEmails(emails);
    setLoading(false);
  };

  const onInputChange = (e) => {
    setEmailProcurar({ ...usuario, [e.target.name]: e.target.value })
}

  const getUsuario = async (e) => {
    e.preventDefault()
    const response = await axios.get(`https://uno.up.railway.app/usuarios/${emailProcurar.email}`)
    if(response.status === 200) {
      const data = response.data
      setUsuario(data)
      setUsuarioEncontrado(true)
    } else {
      setUsuario({})
      setUsuarioEncontrado(false)
    }
  }

  useEffect(() => {
    getUsuariosPresentes();
  });

  return (
    <div>
      {loading ? (
        <div></div>
      ) : (
        <div>
          <div className="pb-10">
            <p>Usuarios Presentes no Banco de Dados: </p>
            {emails.map((email) => (
              <p>{email}</p>
            ))}
          </div>

          <form className="pb-14" onSubmit={getUsuario}>
            <input
              className="text-sm py-2 px-3 rounded-md shadow-sm ring-1 ring-gray-300 ring-inset focus:ring-indigo-600 focus:ring-2 focus:ring-inset focus:outline-none w-80"
              name="email"
              type="text"
              placeholder="Informe um email"
              onChange={(e) => onInputChange(e)}
            />
            <button className="block mx-auto w-80 mt-5 bg-indigo-600 text-white font-semibold font-inter text-sm px-3 py-2 rounded-md hover:bg-indigo-500">Procurar</button>
          </form>

          <div>
            {
              usuarioEncontrado ? ( <div>
                <p>ID: {usuario.id}</p>
                <p>Nome: {usuario.nome}</p>
                <p>Email: {usuario.email}</p>
                <p>Cargo: {usuario.cargo}</p>
              </div>) : (<div></div>)
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default Usuarios;
