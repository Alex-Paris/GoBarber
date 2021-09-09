import React from 'react';
import { FiClock, FiPower } from 'react-icons/fi';

import { Container, Header, HeaderContent, Profile, Content, Schedule, NextAppointment, Calendar } from './styles';

import { useAuth } from '../../hooks/context/auth';
import logoImg from '../../assets/logo.svg';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img
              src={user.avatar_url}
              alt={user.name}
            />
            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 19</span>
            <span>Segunda-feira</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img
                src="https://yt3.ggpht.com/yti/APfAmoENyWa8B8szMSqFCAwKMUgu4pCgcFqUADbW_rmGCA=s88-c-k-c0x00ffffff-no-rj-mo"
                alt="Alex"
              />

              <strong>Alex</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>
        </Schedule>
        <Calendar />
      </Content>
    </Container>
  );
};

export default Dashboard;
