import React, { useCallback, useRef } from 'react';
import { FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';

import api from '../../services/api';
import { useToast } from '../../hooks/context/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background, AnimationContainer } from './styles';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();
  const search = useLocation().search;

  const handleSubmit = useCallback(async (data: ResetPasswordFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        password: Yup.string().required('Senha obrigatória'),
        password_confirmation: Yup.string().oneOf(
          [Yup.ref('password'), null], 'Confirmação incorreta'
        )
      });

      await schema.validate(data, {
        abortEarly: false
      });

      const { password, password_confirmation } = data;
      const token = new URLSearchParams(search).get('token');

      if (!token) {
        throw new Error();
      }

      await api.post('/password/reset', {
        password,
        password_confirmation,
        token
      });

      history.push('/');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      addToast({
        type: 'error',
        title: 'Erro na resetar senha',
        description: 'Ocorreu um erro ao resetar sua senha, tente novamente.'
      });
    }
  }, [addToast, history, search]);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu logon</h1>

            <Input name="password" icon={FiLock} type="password" placeholder="Nova Senha" />

            <Input name="password_confirmation" icon={FiLock} type="password" placeholder="Confirmação da Senha" />

            <Button type="submit">Alterar senha</Button>
          </Form>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default ResetPassword;
