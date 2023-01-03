import React from 'react';
import netflix_logo from './images/netflix_logo.png';
import netflix_avtar from './images/netflix_avtar.png';

const Header = ()=>{

    return(
        <>
        <div className="header">
            <img src={netflix_logo} className="logo" />
            <img src={netflix_avtar}  className="avtar"/>
        </div>
        </>
    )
}

export default Header;