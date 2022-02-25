import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails } from '../actions/index';
import { useEffect } from 'react';
import Loading from './Loading';

export default function Details(){
    const allDetails = useSelector((state) => state.dogDetails);
    const dispatch = useDispatch();
    
    const { id } = useParams();

    useEffect(() => {
        dispatch(getDetails(id));
    }, [dispatch]);


    return (
        <div>
            {allDetails.length > 0 ? (
                <div>
                    <h1>{allDetails[0].name}</h1>
                    <img src={allDetails[0].image} alt='img not found' width='300px' height='200px'/>
                    <div>
                        <h2>Height: {allDetails[0].heightMin} - {allDetails[0].heightMax} cms.</h2>
                    </div>
                    <div>
                        <h2>Weight: {allDetails[0].weightMin} - {allDetails[0].weightMax} kg.</h2>
                    </div>
                    <div>
                        <h2>Lifespan: {allDetails[0].lifespan.length > 8 ? 
                        allDetails[0].lifespan.slice(0, 7) : allDetails[0].lifespan.slice(0, 2)
                        } years</h2>
                    </div>
                    <div>
                        <span>
                            Temperaments: {allDetails[0].temperament}
                        </span>
                    </div>
                </div>    
                    ) : (
                        <div>
                            <Loading />
                        </div>
                    )} 
                <Link to='/home'><button>Go back</button></Link>     
        </div>
    );
}