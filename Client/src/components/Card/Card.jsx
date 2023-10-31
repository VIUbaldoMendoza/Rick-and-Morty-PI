import { connect } from "react-redux"; //función connect de "react-redux", para conectar componentes de React con el estado global de la aplicación.
import { addFav, removeFav } from "../../redux/actions"; //funciones addFav y removeFav desde actions.js en "redux/actions".
import styles from "./Card.module.css"; // Importa estilos CSS del archivo "Card.module.css" y los almacena en la variable styles.
import { Link, useLocation } from "react-router-dom"; //componentes Link y useLocation de la biblioteca "react-router-dom".
                                                      //Link se utiliza para crear enlaces en la aplicación, y
                                                      //useLocation se usa para acceder a la ubicación actual en la aplicación.
import { useEffect, useState } from "react"; //las funciones useEffect y useState de la biblioteca "react", se utilizan para gestionar efectos
                                             //secundarios y el estado local en componentes de React.

function Card(props) {    //función de componente llamada "Card" que recibe un objeto props como argumento.
  const {   //Desestructura las propiedades del objeto props en variables individuales, lo que facilita su uso en el componente.
    id,
    name,
    species,
    gender,
    image,
    onClose,
    addFav,
    removeFav,
    myFavorites,
  } = props;

  const [isFav, setIsFav] = useState(false); //Declara un estado local llamado isFav y una función para actualizarlo llamada setIsFav.
                                             //Inicializa isFav con el valor false.

  const { pathname } = useLocation();  //Obtiene la propiedad pathname de la ubicación actual utilizando el hook useLocation.
                                       //Esto se utiliza para determinar la ruta actual de la aplicación.

  useEffect(() => {                  //Define un efecto secundario que se ejecutará cuando la propiedad myFavorites cambie.
    myFavorites.forEach((fav) => {   //Este efecto recorre la lista de elementos favoritos y establece isFav en true si el personaje actual
      if (fav.id === props.id) {     //está en la lista.
        setIsFav(true);
      }
    });
  }, [myFavorites]);

 const handleFavorite = () => {              //Define una función handleFavorite que se ejecutará cuando se haga clic en el botón de favorito.
    isFav ? removeFav(id) : addFav(props);    //Esta función agrega o quita un elemento de favoritos y actualiza el estado isFav.
    setIsFav(!isFav);                         //'?' en una expresión se llama "operador condicional ternario" o "operador ternario".
  };                                          //En JavaScript, se utiliza para realizar una evaluación condicional en una sola línea.
                                              // La expresión toma la forma general de condición ? valor_si_verdadero : valor_si_falso.
                                              //isFav es la condición. Si isFav es true, entonces se ejecuta removeFav(id).
                                              //Si isFav es false, entonces se ejecuta addFav(props)
  

  return (
    <div className={styles.cardContainer}>
      {isFav ? (
        <button className={styles.favoriteButton} onClick={handleFavorite}>❤️</button>
      ) : (
        <button className={styles.favoriteButton} onClick={handleFavorite}>🤍</button>
      )}
      <div className={styles.header}>
        <div className={styles.wrapperButton}>
          {pathname !== "/favorites" && (
            <button className={styles.closeButton} onClick={() => onClose(id)}>
              X
            </button>
          )}
        </div>
        <img src={image} alt="" className={styles.cardImage} />
      </div>

      <div className={styles.wrapperText}>
        <div className={name ? styles.name : styles.noname}>
          <Link
            to={`/detail/${id}`}
            className={styles.cardNameLink}
          >
            <h1>{name}</h1>
          </Link>
        </div>

        <h2 className={styles.cardInfo}>{species}</h2>
        <h2 className={styles.cardInfo}>{gender}</h2>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {  //mapDispatchToProps y mapStateToProps son funciones que se
  return {                                  //utilizan para conectar el componente con el estado global de Redux. 
    addFav: (character) => {                 //mapDispatchToProps mapea las acciones a propiedades del componente, 
      dispatch(addFav(character));          //mapStateToProps mapea el estado global a propiedades del componente.
    },
    removeFav: (id) => {
      dispatch(removeFav(id));
    },
  };
};

const mapStateToProps = (state) => {
  return { myFavorites: state.myFavorites };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
//exporta el componente "Card" conectado a Redux, lo que permite que acceda al estado global y a las acciones definidas en Redux.

/*En resumen, este código define un componente de React llamado "Card" que muestra información sobre un elemento, como un personaje, y
permite a los usuarios agregar o quitar elementos de favoritos. También se conecta a Redux para gestionar el estado global y las
acciones relacionadas con los elementos favoritos.*/