import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';

const ProtectedRoutes = ({ allowedRole, element }) => {
    const token = Cookies.get('tokenAccesoEmpresa');

    if (!token) {
        return <Navigate to="/login-organizacion" />;
    }

    try {
        const decodedToken = jwtDecode(token);

        if (decodedToken.rol_id === allowedRole) {
            return element;
        } else {
            return <Navigate to="/no-autorizado" />;
        }
    } catch (error) {
        console.error("Error al decodificar el token:", error);
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoutes;
