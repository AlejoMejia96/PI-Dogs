import React from 'react';

export default function Card({image, name, temperament, weightMin, weightMax}){
    
    return(
        <div>
            <img src={image} alt='img not found' width='250px' height='200px'/>
            <h3>{name}</h3>
            <h5>{temperament}</h5>
            <h5>{weightMin}</h5>
            <h5>{weightMax}</h5>
        </div>
    );
};