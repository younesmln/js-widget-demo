import * as React from 'react'
import styles from "./widget.module.css";

export function Widget() {
    return <div className={`${styles.testClass} ${styles.widget}`}><h1>Hello from Widget.</h1></div>
}
