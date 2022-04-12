import './Nav.css';

import React from 'react';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

const Nav: React.FC = () => {
  return (
    <nav>
      <h3><Link to="/"><img src='/images/logo.jpg' alt='' /></Link>blog</h3>
      <div className="nav-links">
        <Link to="/"><FontAwesomeIcon className="fas fa-home" icon='home'/>Home</Link>
        <Link to="/createpost"><FontAwesomeIcon className="fas fa-user" icon='user' />Create Post</Link>
      </div>
    </nav>
  );
}

export default Nav;
