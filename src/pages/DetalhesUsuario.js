import React from "react";
import { Link, useParams } from "react-router-dom";
import { useUser } from "../hooks/useUser";

const DetalhesUsuario = () => {

  const { id } = useParams();
  const { data} = useUser(`users/${id}`);

  if (!data) {
    return <p>Carregando...</p>
  }

  return (
    <div>
      <h1>Detalhes do Usuário</h1>

      <ul>
        <li>ID: {data.id}</li>
        <li>Nome: {data.name}</li>
        <li>E-mail: {data.email}</li>
        <li>Estado: {data.estado}</li>
        <button type="button">Alterar Estado</button>
      </ul>

      <Link to={'/'}>Cadastro</Link>
      <Link to={'/lista'}>Lista</Link>
    </div>
  );
}

export default DetalhesUsuario;