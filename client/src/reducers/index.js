
const initialState = {
    dogs : [],
    temperaments: [],
    allDogsEver: []
};

function rootReducer (state = initialState, action){
    switch(action.type){
        case 'GET_DOGS':
            return{
                ...state,
                dogs: action.payload,
                allDogsEver: action.payload
            }
        case 'GET_TEMPERAMENTS':
            return{
                ...state,
                temperaments: action.payload
            }
        case 'FILTER_BY_TEMPERAMENT':
            const allDoggs = state.allDogsEver;
            const temDogFiltred = action.payload === 'All' 
            ? allDoggs : allDoggs.filter(e => {
                if(e.temperament){
                    return e.temperament.includes(action.payload);
                }
                if(e.temperaments){
                    const temp = e.temperaments.map(e => e.temperament);
                    return temp.includes(action.payload);
                }
                return null
            })
            return{
                ...state,
                dogs: temDogFiltred
            }
        case 'POST_DOGS':
            return{
                ...state,
            }
        case 'FILTER_BY_CREATED':
            const filterCreated = action.payload === 'dog_db' ? state.allDogsEver.filter(e => e.createdInDb) : state.allDogsEver.filter(e => !e.createdInDb);

            return {
                ...state,
                dogs: action.payload === 'all_dogs' ? state.allDogsEver : filterCreated
            }
        case 'ORDER_BY_NAME':
            let allDogggs = state.allDogsEver;
            let arrOrd = action.payload === 'asc_alf' ?
                [...state.dogs].sort((a,b) => {
                    if(a.name < b.name) {
                        return -1};
                    if(a.name > b.name) {
                        return 1};
                    return 0;
                }) :
                [...state.dogs].sort((a,b) => {
                    if(a.name > b.name) {
                        return -1};
                    if(a.name < b.name) {
                        return 1};
                    return 0;
                })
            return {
                ...state,
                dogs: action.payload === 'All' ? allDogggs : arrOrd
            }
        
        default:
        return state;
    }
    
}

export default rootReducer;