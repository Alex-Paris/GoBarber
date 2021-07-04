import React from 'react';

import { AuthProvider } from './context/auth';
import { ToastProvider } from './context/toast';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      {children}
    </ToastProvider>
  </AuthProvider>
);

export default AppProvider;
