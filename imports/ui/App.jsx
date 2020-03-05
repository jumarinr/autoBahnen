import React from 'react';
import PaginaPrincipal from './PaginaPrincipal'
import Header from './Header/Header';
const App = () => (
  <div>
    <Header prop={'inicio'} />
    Aplicación web para la segunda entrega de bases 1
    <hr/>
    <PaginaPrincipal/>
   
  </div>
);

export default App;
