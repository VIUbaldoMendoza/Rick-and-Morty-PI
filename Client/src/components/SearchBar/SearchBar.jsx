import { useState } from "react";
import styles from './SearchBar.module.css'

export default function SearchBar(props) {
   const [id, setId] = useState("");

   const handleChange = (e) => {
      setId(e.target.value);
   };

   const handleSubmit = () => {
      onSearch(id);
      setId("");
   };

   const { onSearch } = props;
   return (
      <div className={styles.searchBarContainer}>
         <input type="search" className={styles.searchInput} onChange={handleChange} value={id} />
         <button className={styles.addButton} onClick={handleSubmit}>Add</button>
      </div>
   );
}