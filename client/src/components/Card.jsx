import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

export default function Card({id, image, name, temperament, weightMin, weightMax}){

    return(
        <div className='card'>
            <h3>{name}</h3>
            <img className='image' src={image} alt='img not found' width='250px' height='200px'/>
            <div className='temwei'>
                <p>{temperament}</p>
                <p>{weightMin}</p>
                <p>{weightMax}</p>
            </div>
            <Link to={`/dogs/${id}`}><button>More</button></Link>
        </div>
    );
};