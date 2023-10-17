import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import PATHROUTES from '../../helpers/Pathroutes.helper';
import styles from './Nav.module.css';

const Nav = (props) => {
  const { onSearch, agregarPersonajeRandom } = props;
  
  return (
    <div className={styles.nav}>
      <h2>Rick and Morty</h2>
      <Link to={PATHROUTES.HOME} className={styles.navLink}>
        Home
      </Link>
      <Link to={PATHROUTES.FAVORITES} className={styles.navLink}>
        Favorites
      </Link>
      <Link to={PATHROUTES.ABOUT} className={styles.navLink}>
        About me
      </Link>
      <div className={styles.searchBar}>
        <SearchBar onSearch={onSearch} />
      </div>
      <button onClick={agregarPersonajeRandom} className={styles.randomButton}>
        Add random character
      </button>
    </div>
  );
};

export default Nav;
