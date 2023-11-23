import * as React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './Cultura/CulturaHomePage.js';
import CulturaHome from './Cultura/CulturaHome.js';
import PlantioHome from './Plantio/PlantioHome';
import InsumoHome from './Insumo/InsumoHome';
import PlanejamentoHome from './Planejamento/PlanejamentoHome';
import GetPage from './CRUD/GetPage.js';
import PostPage from './CRUD/PostPage.js';
import PutPage from './CRUD/PutPage.js';
import DeletePage from './CRUD/DeletePage.js';
import CulturaForm from './Cultura/CulturaForm';
import PlantioForm from './Plantio/PlantioForm.js';
import InsumoForm from './Insumo/InsumoForm';
import PlanejamentoForm from './Planejamento/PlanejamentoForm';

export default function App() {
  
  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />

          <Route path="/Cultura" element={<CulturaHome />} />
          <Route path="/Cultura/GetPage" element={GetPage('Cultura')} />
          <Route path="/Cultura/Form" element={<CulturaForm />} />

          <Route path="/Plantio" element={<PlantioHome />} />
          <Route path="/Plantio/GetPage" element={GetPage('Plantio')} />
          <Route path="/Plantio/Form" element={<PlantioForm />} />

          <Route path="/Planejamento" element={<PlanejamentoHome />} />
          <Route path="/Planejamento/GetPage" element={GetPage('Planejamento')} />
          <Route path="/Planejamento/Form" element={<PlanejamentoForm />} />

          <Route path="/Insumo" element={<InsumoHome />} />
          <Route path="/Insumo/GetPage" element={GetPage('Insumo')} />
          <Route path="/Insumo/Form" element={<InsumoForm />} />
          
          <Route path="/Tipo/GetPage" element={GetPage('Tipo')} />
          
          <Route path="/Tipo/PostPage" element={PostPage('Tipo')} />
          
          <Route path="/Tipo/PutPage" element={PutPage('Tipo')} />
          
          <Route path="/Tipo/DeletePage" element={DeletePage('Tipo')} />
        </Routes>
    </Router>
  );
}
