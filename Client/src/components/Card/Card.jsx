import { connect } from "react-redux";
import { addFav, removeFav } from "../../redux/actions"; 
import styles from "./Card.module.css"; 
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react"; 
                                             

function Card(props) {    
  const {   
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

  const [isFav, setIsFav] = useState(false); 

  const { pathname } = useLocation();  
  useEffect(() => {                  
    myFavorites.forEach((fav) => {   
      if (fav.id === props.id) {     
        setIsFav(true);
      }
    });
  }, [myFavorites]);

 const handleFavorite = () => {              
    isFav ? removeFav(id) : addFav(props);    
    setIsFav(!isFav);                         
  };                                          

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

const mapDispatchToProps = (dispatch) => {  
  return {                                  
    addFav: (character) => {                 
      dispatch(addFav(character));          
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
