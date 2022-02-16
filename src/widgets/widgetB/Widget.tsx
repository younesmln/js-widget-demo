import * as React from 'react';
import styles from './widget.module.css';
import './global.css'


export function Widget() {
  return (
    <div className={`${styles.testClass} ${styles.widget}`}>
      <h1>Hello from Widget B.</h1>
      <button className='btn-primary' onClick={() => alert('A click!')}>AntDesign Button</button>
    </div>
  );
}
