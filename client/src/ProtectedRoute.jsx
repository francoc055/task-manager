import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';

function ProtectedRoute({children}) {
    const token = Cookies.get('token'); 
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token]);

    return token ? children : null;
}

export default ProtectedRoute