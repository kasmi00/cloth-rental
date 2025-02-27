 
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function PrivateRoute({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const token = sessionStorage.getItem('accesstoken');


    useEffect(() => {
    if (!token) {
     navigate('/login', { state: { from: location, message: 'Please login first' } });
     
    }
}, [navigate, location, token]);

    return token ? children : null;
   
   
   }

export default PrivateRoute