import React from 'react';

import { AuthProvider } from './context/auth';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    {children}
  </AuthProvider>
);

export default AppProvider;
