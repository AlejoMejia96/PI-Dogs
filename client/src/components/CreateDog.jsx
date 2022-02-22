import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postDog, listOfTemperaments } from '../actions/index';
import { useDispatch, useSelector } from 'react-redux';

export default function CreateDog(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const temperaments = useSelector((state) => state.temperaments);

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


    function handleChangeInput(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
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
        })
        navigate('/home')
    }

    useEffect(() => {
        dispatch(listOfTemperaments());
    }, [dispatch]);

    return (
        <div>
            <Link to= '/home'><button>Go back</button></Link>
            <h1>Create Dog!</h1>

            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <h2>Name</h2>
                    <input
                    type='text'
                    value={input.name}
                    name='name'
                    onChange={(e) => handleChangeInput(e)}
                    autoComplete="off"
                    />
                </div>
                <div>
                    <h2>Height</h2>
                    <label>Min:</label>
                    <input
                    type='text'
                    value={input.heightMin}
                    name='heightMin'
                    onChange={(e) => handleChangeInput(e)}
                    autoComplete="off"
                    />
                    <label>Max:</label>
                    <input
                    type='text'
                    value={input.heightMax}
                    name='heightMax'
                    onChange={(e) => handleChangeInput(e)}
                    autoComplete="off"
                    />
                </div>
                <div>
                    <h2>Weight</h2>
                    <label>Min:</label>
                    <input
                    type='text'
                    value={input.weightMin}
                    name='weightMin'
                    onChange={(e) => handleChangeInput(e)}
                    autoComplete="off"
                    />
                    <label>Max:</label>
                    <input
                    type='text'
                    value={input.weightMax}
                    name='weightMax'
                    onChange={(e) => handleChangeInput(e)}
                    autoComplete="off"
                    />
                </div>
                <div>
                    <h2>Lifespan</h2>
                    <input
                    type='text'
                    value={input.lifespan}
                    name='lifespan'
                    onChange={(e) => handleChangeInput(e)}
                    autoComplete="off"
                    />
                </div>
                <div>
                    <h2>Image</h2>
                    <input
                    type='text'
                    value={input.image}
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
                                type="checkbox"
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
                                <button onClick={() => handleDelete(tem)} style={{display: 'inline-flex'}}>X
                                </button>
                            </div>
                            )}
                    </div>
                </div>
                <button type='submit'>Create</button>
            </form>
        </div>
    );








}