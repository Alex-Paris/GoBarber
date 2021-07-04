import React from 'react';
import { useTransition } from 'react-spring';

import Toast from './Toast';

import { ToastMessage } from '../../hooks/context/toast';
import { Container } from './styles';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    {
      from: { opacity: 0, y: '40%' },
      enter: { opacity: 1, y: '0%' },
      leave: { opacity: 0, y: '40%' }
    }
  );

  return (
    <Container>
      {messagesWithTransitions(( props, message ) => (
        <Toast key={message.id} style={props} message={message} />
      ))}

    </Container>
  );
};

export default ToastContainer;
