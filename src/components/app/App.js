import * as React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './Cultura/CulturaHomePage.js';
import CulturaHome from './Cultura/CulturaHome.js';
import CulturaForm from './Cultura/CulturaForm';
import PlantioHome from './Plantio/PlantioHome';
import PlantioForm from './Plantio/PlantioForm';
import InsumoHome from './Insumo/InsumoHome';
import InsumoForm from './Insumo/InsumoForm';
import PlanejamentoHome from './Planejamento/PlanejamentoHome';
import PlanejamentoForm from './Planejamento/PlanejamentoForm';
import EtapaInsumoHome from './EtapaInsumo/EtapaInsumoHome';
import EtapaInsumoForm from './EtapaInsumo/EtapaInsumoForm';
import EtapaHome from './Etapa/EtapaHome';
import EtapaForm from './Etapa/EtapaForm';
import GetPage from './CRUD/GetPage.js';

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

          <Route path="/Etapa" element={<EtapaHome />} />
          <Route path="/Etapa/GetPage" element={GetPage('Etapa')} />
          <Route path="/Etapa/Form" element={<EtapaForm />} />
                    
          <Route path="/EtapaInsumo" element={<EtapaInsumoHome />} />
          <Route path="/EtapaInsumo/GetPage" element={GetPage('EtapaInsumo')} />
          <Route path="/EtapaInsumo/Form" element={<EtapaInsumoForm />} />
        </Routes>
    </Router>
  );
}
