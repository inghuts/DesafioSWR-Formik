import React from "react";
import { useUser } from "../hooks/useUser";
import { Link } from "react-router-dom";

const ListaUsuario = () => {

  const { data } = useUser('users');

  if (!data) {
    return <p>Carregando...</p>
  }

  return (
    <div>
      <h1>Lista de Usuários</h1>

      <ul>
        {data.map(user => (
          <li key={user.id}>
            <Link to={`/detalhes/${user.id}`}>
              {'Nome: ' + user.name + ' | Email: ' + user.email}
            </Link>
          </li>
        ))}
      </ul>

      <Link to={'/'}>Cadastro</Link>
    </div>
  );
}

export default ListaUsuario;