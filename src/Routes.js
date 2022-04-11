import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ListaUsuario from './pages/ListaUsuario';
import CadastroUsuario from './pages/CadastroUsuario';
import DetalhesUsuario from './pages/DetalhesUsuario';

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CadastroUsuario />} />
                <Route path="/lista" element={<ListaUsuario />} />
                <Route path="/detalhes/:id" element={<DetalhesUsuario />} />
            </Routes>
        </BrowserRouter>
    );
}