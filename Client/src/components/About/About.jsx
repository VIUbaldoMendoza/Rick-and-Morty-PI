import styles from './About.module.css'; 

const About = () => {   
  return (
    <div className={styles.aboutContainer}>
      <h2 className={styles.title}>About Me</h2> 
      <p className={styles.description}>
      Hello! I'm Viri. I'm developing this website as part of a school project. 
      </p>
    </div>
  );
}

export default About 