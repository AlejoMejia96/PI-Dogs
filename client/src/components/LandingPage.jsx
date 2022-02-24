import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage (){
    return(

    <div className='land'>
            <div className='title'>
                <h1 className='intro'>Welcome to my Dogs App!</h1>
                <Link to='/home'>
                    <button className='bot'style={{cursor: 'pointer'}}>Home</button>
                </Link>
            </div>
    </div>
    );
}