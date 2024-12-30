import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { logoutRequest } from '../api/auth';
import { useNavigate } from 'react-router';

const Navbar = () => {
  const navigate = useNavigate();
  
  const logout = async () => {
    await logoutRequest();
    navigate('/login');
  }

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-lg">
            <FontAwesomeIcon icon={faLayerGroup} />
        </div>

        <div className="flex items-center gap-2">
          <button onClick={logout} className="text-gray-200 duration-150 hover:text-gray-400">Cerrar sesion</button>
          <span className='text-neutral-100'>
            <FontAwesomeIcon icon={faUser} />
          </span>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
