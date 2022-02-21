import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, listOfTemperaments, filterByTemp, filterByCreated,
orderByName } from '../actions/index';
import { Link } from 'react-router-dom';
import Card from './Card';
import Pagination from './Pagination';
import Loading from './Loading';


export default function Home() {
    const dispatch = useDispatch();
    const allDogs = useSelector ((state) => state.dogs);
    const temperaments = useSelector((state) => state.temperaments);
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage] = useState(8);
    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDog = allDogs.slice(indexOfFirstDog, indexOfLastDog);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    
    useEffect (() => {
        dispatch(listOfTemperaments());
        dispatch(getDogs());
    }, [dispatch]);

    function handleClick(e){
        e.preventDefault();
        dispatch(getDogs());
    }

    function handleFilterByTemp(e){
        e.preventDefault();
        dispatch(filterByTemp(e.target.value));
        setCurrentPage(1);
    }

    function handleFilterByCreated(e){
        e.preventDefault();
        dispatch(filterByCreated(e.target.value));
        setCurrentPage(1);
    }

    function handleOrderByName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
    }
    return(
        <div>
            <Link to='/dog'>Create Dog
                <h1>Dogs rules</h1>
            </Link>
            <button onClick={e => handleClick(e)}>
                Load again
            </button>
            <div>
                <select>
                    <option value='asc_p'>Ascendente_peso</option>
                    <option value='desc_p'>Descendente_peso</option>
                </select>
                <select onChange={(e) => handleOrderByName(e)}>
                    <option defaultValue value='All'>Sort name by</option>
                    <option value='asc_alf'>A-Z</option>
                    <option value='desc_alf'>Z-A</option>
                </select>
                <select onChange={(e) => handleFilterByTemp(e)}>
                    <option value='All'>Temperaments</option>
                    {temperaments.length > 0 ? (
                        temperaments.map(e => {
                            return (
                                <option value={e.temperament}>{e.temperament}</option>
                            )
                        })
                    ) : (
                            <div>
                                <Loading/>
                            </div>
                    )};
                </select>
                <select onChange={(e) => handleFilterByCreated(e)}>
                    <option value='all_dogs'>All Dogs</option>
                    <option value='dog_api'>API</option>
                    <option value='dog_db'>DB</option>
                </select>
            <Pagination
                dogsPerPage={dogsPerPage}
                allDogs={allDogs.length}
                paginate={paginate}
            />
            {currentDog.length > 0 ? (
                currentDog.map(e => {
                    return(
                    <Card 
                        name={e.name} 
                        image={e.image} 
                        temperament={`Temperaments: ${e.temperament}`}
                        weightMin={`Weight Min: ${e.weightMin} kg.`}
                        weightMax={`Weight Max: ${e.weightMax} kg.`}
                    />
                    );
                }) 
                ) : (
                        <div>
                            <Loading/>
                        </div>     
                    )}
            </div>
        </div>
    )
}