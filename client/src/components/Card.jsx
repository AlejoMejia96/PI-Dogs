import React from 'react';
import './Card.css';

export default function Card({image, name, temperament, weightMin, weightMax}){
    
    return(
        <div className='card'>
            <img className
            ='image' src={image} alt='img not found' width='250px' height='200px'/>
            <h3>{name}</h3>
            <p>{temperament}</p>
            <p>{weightMin}</p>
            <p>{weightMax}</p>
        </div>
    );
};