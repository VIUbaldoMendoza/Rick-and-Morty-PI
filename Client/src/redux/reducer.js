const initialState = {
  myFavorites: [],
  allCharacters: [],
};
  
const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_FAV":
      return { ...state, myFavorites: payload, allCharacters: payload };
      
        //let copy1 = state.allCharacters;
        //copy1.push(payload);
        //return {
        //  ...state,
        //  myFavorites: copy1,
        //   allCharacters: copy1,
        //  };
    case 'REMOVE_FAV':
      return { ...state, myFavorites: payload };
    //case "REMOVE_FAV":
      //let copy2 = state.myFavorites.filter((char) => 
      //char.id !==Number(payload));
      //let copy2 = state.myFavorites.filter((char) => {
       // return char.id !== Number(payload);
      //});
      //return {
        //...state,
      //  myFavorites: copy2,
      //};
      
    case "FILTER":
      if (payload === "ALL") {
        return {
          ...state,
          myFavorites: state.allCharacters,
        };
      } else {
        let copy3 = state.allCharacters.filter((char) => {
          return char.gender === payload;
        });
        return {
          ...state,
          myFavorites: copy3,
        };
      }
    case "ORDER":
      let orderedCharacters;
      if (payload === "A") {
        orderedCharacters = state.allCharacters.sort((a, b) => a.id - b.id);
      } else {
        orderedCharacters = state.allCharacters.sort((a, b) => b.id - a.id);
      }
      return {
        ...state,
        myFavorites: orderedCharacters,
      };
      
    default:
      return {
      ...state,
    };
  }
};

export default rootReducer;