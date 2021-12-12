import { FC } from 'react';
import styles from './Output.module.css'

interface OutputProps {
   smallerText: string,
   output: string
}

const Output: FC<OutputProps> = (props) => {

   return (
      <div className={styles.output}>
         <div className={styles.container}>
            <div className={styles.smaller_text}> {props.smallerText}  </div>
            <div className={styles.main_text}> {props.output} </div>
         </div>
      </div>
   );
}

export default Output;