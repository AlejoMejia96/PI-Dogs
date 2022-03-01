import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, listOfTemperaments } from '../actions/index';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import Card from './Card';
import Pagination from './Pagination';
import Loading from './Loading';
import SearchBar from './SearchBar';
import Nav from './Nav';


export default function Home() {
    const dispatch = useDispatch();             // mapDispatchToProps para Hooks. Crea una instancia de la función
    const allDogs = useSelector ((state) => state.dogs);     // mapStateToProps para Hooks. Lee los datos de la store.
    

    /* Paginado */
    const [currentPage, setCurrentPage] = useState(1);              //pagina actual
    const [dogsPerPage] = useState(8);                              //8 perros por página
    const indexOfLastDog = currentPage * dogsPerPage;               //índice último perro
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;           //índice primer perro
    const currentDog = allDogs.slice(indexOfFirstDog, indexOfLastDog);  //Perros de la página actual  Pág.1 ---> 0-7

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    
    useEffect (() => {                                      //para ejecutar al montar el componente
        dispatch(listOfTemperaments());
        dispatch(getDogs());
    }, [dispatch]);

    function handleClick(e){
        e.preventDefault();
        dispatch(getDogs());
    }


    return(
        <div className='home'>
            <div className='create_dog'>
                <Link to='/dog'>
                    <button className='crea'>
                        <div className="c1"></div>
                        <div className="c2"></div>
                        <div className="c3"></div>
                        <div className="c4"></div>
                        <div className="b1">
                            <div className="b2">
                            Create Dog
                            </div>
                        </div>
                    </button>
                </Link>
            </div>
            <div className='load'>
                <button onClick={e => handleClick(e)}
                className='ref'>Refresh</button>
            </div>
            <div className='search'>
                <SearchBar />
            </div>
            <div className='navig'>
                <Nav />
            </div>
            <div className='pagin'>
                <Pagination
                    dogsPerPage={dogsPerPage}
                    allDogs={allDogs.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </div>
            <div className='cards'>
                {currentDog.length > 0 ? (
                    currentDog.map(e => {
                        return (
                            <Card 
                                key={e.id}
                                id={e.id}
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
    );
}