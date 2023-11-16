import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Cultura/CulturaHomePage.js';
import CulturaHome from './Cultura/PrincipalCultura.js';
import GetPage from './CRUD/GetPage.js';
import PostPage from './CRUD/PostPage.js';
import PutPage from './CRUD/PutPage.js';
import DeletePage from './CRUD/DeletePage.js';
import { useLocation } from 'react-router-dom';

export default function App() {
  
  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Cultura" element={<CulturaHome />} />
          <Route path="/Cultura/GetPage" element={GetPage('Cultura')} />
          <Route path="/Plantio/GetPage" element={GetPage('Plantio')} />
          <Route path="/Insumo/GetPage" element={GetPage('Insumo')} />
          <Route path="/Tipo/GetPage" element={GetPage('Tipo')} />
          <Route path="/Planejamento/GetPage" element={GetPage('Planejamento')} />
          <Route path="/Cultura/PostPage" element={<PostPage pagina="Cultura" />} />
          <Route path="/Plantio/PostPage" element={PostPage('Plantio')} />
          <Route path="/Insumo/PostPage" element={PostPage('Insumo')} />
          <Route path="/Tipo/PostPage" element={PostPage('Tipo')} />
          <Route path="/Planejamento/PostPage" element={PostPage('Planejamento')} />
          <Route path="/Cultura/PutPage" element={PutPage('Cultura')} />
          <Route path="/Plantio/PutPage" element={PutPage('Plantio')} />
          <Route path="/Insumo/PutPage" element={PutPage('Insumo')} />
          <Route path="/Tipo/PutPage" element={PutPage('Tipo')} />
          <Route path="/Planejamento/PutPage" element={PutPage('Planejamento')} />
          <Route path="/Cultura/DeletePage" element={DeletePage('Cultura')} />
          <Route path="/Plantio/DeletePage" element={DeletePage('Plantio')} />
          <Route path="/Insumo/DeletePage" element={DeletePage('Insumo')} />
          <Route path="/Planejamento/DeletePage" element={DeletePage('Planejamento')} />
          <Route path="/Tipo/DeletePage" element={DeletePage('Tipo')} />
        </Routes>
    </Router>
  );
}
