import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Detail.module.css"; 

const Detail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState({});

  useEffect(() => {
    axios(`https://rickandmortyapi.com/api/character/${id}`).then(
      ({ data }) => {
        if (data.name) {
          setCharacter(data);
        } else {
          window.alert("No hay personajes con ese ID");
        }
      }
    );
    return setCharacter({});
  }, [id]);

  return (
    <div className={styles.detailContainer}>
      {character ? (
        <div>
          <h1 className={styles.detailName}>{character.name}</h1>
          <img
            src={character.image}
            alt={character.name}
            className={styles.detailImage}
          />
          <h1 className={styles.detailProperty}>{character.status}</h1>{" "}
          <p className={styles.detailProperty}>Species: {character.species}</p>
          <p className={styles.detailProperty}>Gender: {character.gender}</p>
          <p className={styles.detailProperty}>Origin: {character.origin ? character.origin.name : 'Unknown'}</p>
        </div>
      ) : (
        <h1 className={styles.loadingMessage}>Loading...</h1>
      )}
    </div>
  );
};

export default Detail;
