import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postDog, listOfTemperaments } from '../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import './CreateDog.css';

export default function CreateDog(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const temperaments = useSelector((state) => state.temperaments);

    useEffect(() => {
        dispatch(listOfTemperaments());
    }, [dispatch]);

    const[input, setInput] = useState({
        name: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        lifespan: '',
        image: '',
        temperament: [],
    })

    const [error, setError] = useState({});

    const validations = function(input){
        const error = {}
        if(!input.name){
            error.name = 'Name is required';
        }
        if(!input.heightMin){
            error.heightMin = 'Height Min is required';
        }
        if(!input.heightMax){
            error.heightMax = 'Height Max is required';
        }
        if(!input.weightMin){
            error.weightMin = 'Weight Min is required';
        }
        if(!input.weightMax){
            error.weightMax = 'Weight Max is required';
        }
        if(input.heightMin < 0){
            error.heightMin = 'Height Min must be greater than 0';
        }
        if(input.heightMin > input.heightMax){
            error.heightMin = 'Height Min cannot be greater than Height Max';
        }
        
        if(input.heightMax < 0){
            error.heightMax = 'Height Max must be greater than 0';
        }
        
        if(input.weightMin< 0){
            error.weightMin = 'Weight Min must be greater than 0';
        }
        if(input.weightMin > input.weightMax){
            error.weightMin = 'Weight Min cannot be greater than Weight Max';
        }
        if(input.weightMax < 0){
            error.weightMax = 'Weight Max must be greater than 0';
        }
        if(input.lifespan < 0){
            error.lifespan = 'Must be greater than 0';
        }
        return error;
    }

    const handleChangeInput = (e) => {
        e.preventDefault();
        setInput(input => {
            const newInput = {
                ...input,
                [e.target.name] : e.target.value
        }
        const error = validations(newInput);
        setError(error);
        return newInput;
        })
    }

    function handleSelect(e){
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        });
    }

    function handleDelete(e){
        setInput({
            ...input,
            temperament: input.temperament.filter(tem => tem !== e)
        });
    }

    function handleSubmit(e){
        e.preventDefault();
        if(input.name && input.heightMin && input.heightMax && input.weightMin
            && input.weightMax && input.lifespan && input.temperament){
            dispatch(postDog(input));
            alert('Dog created!')
            setInput({
                name: '',
                heightMin: '',
                heightMax: '',
                weightMin: '',
                weightMax: '',
                lifespan: '',
                image: '',
                temperament: [],
            });
            navigate('/home');
        } else {
            alert('Please, fill in all the required fields')
        }
    };
    

    return (
        <div className='create'>
            <Link to= '/home'><button>Go back</button></Link>
            <h1>Create Dog!</h1>

            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <h2>Name</h2>
                    <input
                    type='text'
                    value={input.name}
                    placeholder='Enter name without numbers or symbols'
                    name='name'
                    onChange={(e) => handleChangeInput(e)}
                    autoComplete="off"
                    />
                    {error.name && <p>{error.name}</p>}
                </div>
                <div>
                    <h2>Height</h2>
                    <label>Min:</label>
                    <input
                    type='text'
                    value={input.heightMin}
                    placeholder='Enter integers only'
                    name='heightMin'
                    onChange={(e) => handleChangeInput(e)}
                    autoComplete="off"
                    />
                    {error.heightMin && <p>{error.heightMin}</p>}
                    <label>Max:</label>
                    <input
                    type='text'
                    value={input.heightMax}
                    placeholder='Enter integers only'
                    name='heightMax'
                    onChange={(e) => handleChangeInput(e)}
                    autoComplete="off"
                    />
                    {error.heightMax && <p>{error.heightMax}</p>}
                </div>
                <div>
                    <h2>Weight</h2>
                    <label>Min:</label>
                    <input
                    type='text'
                    value={input.weightMin}
                    placeholder='Enter integers only'
                    name='weightMin'
                    onChange={(e) => handleChangeInput(e)}
                    autoComplete="off"
                    />
                    {error.weightMin && <p>{error.weightMin}</p>}
                    <label>Max:</label>
                    <input
                    type='text'
                    value={input.weightMax}
                    placeholder='Enter integers only'
                    name='weightMax'
                    onChange={(e) => handleChangeInput(e)}
                    autoComplete="off"
                    />
                    {error.weightMax && <p>{error.weightMax}</p>}
                </div>
                <div>
                    <h2>Lifespan</h2>
                    <input
                    type='text'
                    value={input.lifespan}
                    placeholder='Enter lifespan'
                    name='lifespan'
                    onChange={(e) => handleChangeInput(e)}
                    autoComplete="off"
                    />
                    {error.lifespan && <p>{error.lifespan}</p>}
                </div>
                <div>
                    <h2>Image</h2>
                    <input
                    type='text'
                    value={input.image}
                    placeholder='Enter image url'
                    name='image'
                    onChange={(e) => handleChangeInput(e)}
                    autoComplete="off"
                    />
                </div>
                <div>
                    <h2>Temperaments</h2>
                    <select onChange={(e) => handleSelect(e)}>
                        {temperaments?.map((temp) => {
                            return(
                                <option 
                                key={temp.id} 
                                value={temp.temperament}>
                                {temp.temperament}</option>
                            );
                        })}
                    </select>
                    <div>
                        {input.temperament.map(tem =>
                            <div key={tem}>
                                <h3>{tem}</h3>
                                <button onClick={() => handleDelete(tem)}>X
                                </button>
                            </div>
                            )}
                    </div>
                </div>
                <button type='submit' disabled={Object.keys(error).length > 0 ? true : false}>Create</button>
            </form>
        </div>
    );








}