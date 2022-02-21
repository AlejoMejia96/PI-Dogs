import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameDogs } from '../actions/index';

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleSubmit(e){
        e.preventDefault();
        if(name.length === 0){
            return alert('Enter a valid name')
        } else {
            dispatch(getNameDogs(name));
            setName('');
        }
    };

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    type = 'text'
                    placeholder= 'Search by name...'
                    value={name}
                    onChange={(e) => setName(e.target.value)}/>
                <button type='submit'
                onClick={(e) => handleSubmit(e)}>Search</button>
            </form>
        </div>
    );


}