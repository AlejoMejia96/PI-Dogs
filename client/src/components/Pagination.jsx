import React from 'react';
import './Pagination.css';
export default function Pagination({ dogsPerPage, allDogs, paginate}) {
    const pageNumbers = [];

    for(let i = 0; i <= Math.floor(allDogs/dogsPerPage); i ++){
        pageNumbers.push(i+1)
    }

    return(
        <nav>
            <ul className='paginate'>
                {pageNumbers &&
                pageNumbers.map(e => (
                    <li className='number' key={e}>
                        <button onClick={() => paginate(e)}>{e}</button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}