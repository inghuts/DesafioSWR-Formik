import React from "react";
import { useUser } from "../hooks/useUser";
import { Link } from "react-router-dom";
import { useSWRConfig } from "swr";

const ListaUsuario = () => {

  const { data, mutate } = useUser('users');
  const {mutate: mutateUsuarioEstado} = useSWRConfig();

  if (!data) {
    return <p>Carregando...</p>
  }

  const alterarEstado = (id) => {
    
    const novoUsuarioEstado = data.map(user => {
      if (user.id === id) {
        if (user.estado == 'desativado')
          return {...user, estado: 'ativo'};
        if (user.estado == 'ativo')
          return {...user, estado: 'desativado'};
        else 
          return {...user, estado: 'ativo'};
      }
      return user;
    })

    mutate(novoUsuarioEstado, false);
    mutateUsuarioEstado(`users/${id}`, novoUsuarioEstado, false);
  }

  return (
    <div>
      <h1>Lista de Usuários</h1>

      <ul>
        {data.map(user => (
          <li key={user.id}>
            <Link to={`/detalhes/${user.id}`}>
              {'Nome: ' + user.name + ' | Email: ' + user.email + ' | Estado: ' + user.estado}
            </Link> 
            <button type="button" onClick={() => alterarEstado(user.id)}>Alterar Estado</button>
          </li>
        ))}
      </ul>

      <Link to={'/'}>Cadastro</Link>
    </div>
  );
}

export default ListaUsuario;