import {useState} from 'react';
import validation from './validation';
import styles from './Form.module.css';

const Form = ({login}) => {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });
    
    const [errors, setErrors] = useState({});
    
    const handleChange = (event) => {
        const property = event.target.name
        const value = event.target.value
        setUserData({...userData, [property]: value})
        validation({...userData, [property]: value}, errors, setErrors);
    };
    
    const handleSubmit = (event)=> {
        event.preventDefault()
        login(userData)
    };
    
    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className={styles.label}>Email: </label>
                    <input
                        type="text"
                        name="email"
                        value= {userData.email}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder='Escribe tu correo electrónico'
                    />
                    { errors.email && <p className={styles.error}>{errors.email}</p>}
                </div>
                <div>
                    <label className={styles.label}>Password: </label>
                    <input
                        type="password"
                        name="password"
                        value= {userData.password}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder='Contraseña'
                    />
                    <p className={styles.error}>{errors.password} </p>
                </div>
                <button className={styles.button}>SUBMIT</button>
            </form>
        </div>
    );
};

export default Form;



