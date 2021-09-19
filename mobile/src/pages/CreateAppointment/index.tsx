import React from 'react';
import { useRoute } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/Feather';

import { useAuth } from '../../hooks/context/auth';

import { Container, Header, BackButton, HeaderTitle, UserAvatar } from './styles';

interface RouteParams {
  providerId: string;
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth();
  const route = useRoute();
  const { providerId } = route.params as RouteParams;

  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}}>
          <Icon name="chevron-left" size={24} color={'#999591'} />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>
    </Container>
  );
};

export default CreateAppointment;
