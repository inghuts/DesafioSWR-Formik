import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { useSWRConfig } from "swr";

import './CadastroUsuario.css'

const CadastroUsuario = () => {
  const { data, mutate } = useUser('users');
  const { mutate: mutateUsuario } = useSWRConfig();
  const navigate = useNavigate();

  if (!data) {
    return <p>Carregando...</p>
  }

  function validate(values) {
    const errors = {}
    if (!values.nome) {
      errors.nome = 'O campo nome é obrigatório';
    }

    if (!values.email) {
      errors.email = 'O campo e-mail é obrigatório';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'O email é inválido';
    }

    if (!values.senha) {
      errors.senha = 'O campo senha é obrigatório';
    }

    if (!values.confirmacaoSenha) {
      errors.confirmacaoSenha = 'O campo confirmação de senha é obrigatório';
    } else if (values.senha != values.confirmacaoSenha) {
      errors.confirmacaoSenha = 'As senhas precisam ser iguais';
    }

    data.map(user => {
      if (user.email === values.email) {
        errors.email = 'O email informado já está cadastrado no sitema';
      }
    });

    return errors;
  }

  return (
    <>
      <h1>Cadastro de Usuários</h1>

      <Formik
        initialValues={{
          nome: '',
          email: '',
          senha: '',
          confirmacaoSenha: ''
        }}

        onSubmit={(values) => {

          //mutate(novosUsuarios, false);

          const novoUsuario = { ...values, id: Math.random(), name: values.nome, estado: 'desativado' }

          mutate((data) => [...data, novoUsuario], false);
          mutateUsuario(`users/${novoUsuario.id}`, novoUsuario, false);

          navigate('/lista');
        }}

        validate={validate}
      >
        <Form>
          <label htmlFor="nome">Nome</label>
          <Field name="nome" type="text" placeholder="Digite seu nome" />
          <ErrorMessage name="nome" />

          <label htmlFor="email">E-mail</label>
          <Field name="email" type="email" placeholder="Digite seu email" />
          <ErrorMessage name="email" />

          <label htmlFor="senha">Senha</label>
          <Field name="senha" type="password" placeholder="Digite sua senha" />
          <ErrorMessage name="senha" />

          <label htmlFor="confirmacaoSenha">Confirmação de senha</label>
          <Field name="confirmacaoSenha" type="password" placeholder="Confirme sua senha" />
          <ErrorMessage name="confirmacaoSenha" />

          <button type="submit">Enviar</button>
        </Form>
      </Formik>

      <Link to={'/lista'}>Lista</Link>
    </>
  );
}

export default CadastroUsuario;