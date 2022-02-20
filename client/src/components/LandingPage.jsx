import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage (){
    return(
        <div className='fondo'>
            <div className='title'>
            <h1>Bienvenidos</h1>
            <Link to='/home'>
                <button>Ir a Home</button>
            </Link>
        </div>
        </div>
        
    );
}