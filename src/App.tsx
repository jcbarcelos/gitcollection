import React from 'react';
import { Routes } from './routes';
import { HashRouter } from 'react-router-dom';
import { GlobalStyle } from './styled';

const App: React.FC = () => {
  return (
    <>
      <HashRouter basename="/">
        <Routes />
      </HashRouter>
      <GlobalStyle />
    </>
  );
};

export default App;
