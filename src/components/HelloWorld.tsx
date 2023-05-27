import { JSX } from 'react';
import styles from '../styles/components/HelloWorld.module.scss';

const HelloWorld = (): JSX.Element => (
  <h3 className={styles.helloWorld}>Hello World!</h3>
);

export default HelloWorld;
