import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.aboutContainer}> 
      <h2 className={styles.title}>Mi Perfil</h2>
      <p className={styles.description}>
        ¡Hola! Soy Viri U.M. y estoy desarrollando esta aplicación como parte de un proyecto.
      </p>
    </div>
  );
}

export default About