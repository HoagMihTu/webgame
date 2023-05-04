import React from 'react';
import ReactDOM from "react-dom/client";
import './index.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage';
import Game1 from './components/views/Game1/Game1';
import Game2 from './components/views/Game2/Game2';
import Game3 from './components/views/Game3/Game3';
import Game4 from './components/views/Game4/Game4';
import Game5 from './components/views/Game5/Game5';
import Game6 from './components/views/Game6/Game6';
import Game7 from './components/views/Game7/Game7';
import Game8 from './components/views/Game8/Game8'

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
        <BrowserRouter>
            <Routes>
                <Route index element={<LandingPage />} />
                <Route path="/game1" element={<Game1 />} />
                <Route path="/game2" element={<Game2 />} />
                <Route path="/game3" element={<Game3 />} />
                <Route path="/game4" element={<Game4 />} />
                <Route path="/game5" element={<Game5 />} />
                <Route path="/game6" element={<Game6 />} />
                <Route path="/game7" element={<Game7 />} />
                <Route path="/game8" element={<Game8 />} />
            </Routes>
        </BrowserRouter>);