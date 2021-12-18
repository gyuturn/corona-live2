import './App.css';
import Header from "./contents/Header"
import Acc from "./contents/Korea/Acc"
import Graph from "./contents/Korea/Graph"
import Nav from "./contents/Nav"
import Btn from "./contents/BackgroundBt"
import SpainAcc from "./contents/Spain/SpainAcc"
import JapanAcc from "./contents/Japan/JapanAcc"
import GermanyAcc from "./contents/Germany/GermanyAcc"
import BrazilAcc from "./contents/Brazil/BrazilAcc"
import FranceAcc from "./contents/France/FranceAcc"
import PortugalAcc from "./contents/Portugal/PortugalAcc"

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Nav />
        {/* <Btn /> */}
        
      <Routes>
        <Route  path="/korea"  element={<Acc/>}/>
        <Route  path="/korea"  element={<Graph/>}/>
        <Route  path="/corona-live"  element={<Acc/>}/>
        <Route  path="/corona-live"  element={<Graph/>}/>
        <Route  path="/japan" element={ <JapanAcc/>}/>
        <Route  path="/spain" element={ <SpainAcc/>}/>
        <Route  path="/germany" element={ <GermanyAcc/>}/>
        <Route  path="/brazil" element={ <BrazilAcc/>}/>
        <Route  path="/france" element={ <FranceAcc/>}/>
        <Route  path="/portugal" element={ <PortugalAcc/>}/>
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
