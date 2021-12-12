import { FC } from 'react';
import styles from './Numpad.module.css'

import { RiDivideFill } from 'react-icons/ri'
import { FiDelete } from 'react-icons/fi'


interface NumpadProps {
   onNumberClick: (num: string) => void,
   onOperatorClick: (operator: { name: string, symbol: string }) => void,
   onToggleNegative: () => void,
   onBackspace: () => void
}

const Numpad: FC<NumpadProps> = (props) => {
   return (
      <div className={styles.numpad_container}>
         <div className={styles.numpad_item} onClick={() => props.onOperatorClick({ name: "clear", symbol: "CE" })} style={{ gridColumn: "span 2" }}> CE </div>
         <div className={styles.numpad_item} onClick={() => props.onBackspace()}> <FiDelete /> </div>
         <div className={styles.numpad_item} onClick={() => props.onOperatorClick({ name: "divide", symbol: "/" })}> <RiDivideFill /> </div>

         <div className={styles.numpad_item} onClick={() => props.onNumberClick("7")}> 7 </div>
         <div className={styles.numpad_item} onClick={() => props.onNumberClick('8')}> 8 </div>
         <div className={styles.numpad_item} onClick={() => props.onNumberClick('9')}> 9 </div>
         <div className={styles.numpad_item} onClick={() => props.onOperatorClick({ name: "multiply", symbol: "x" })}> X </div>

         <div className={styles.numpad_item} onClick={() => props.onNumberClick('4')}> 4 </div>
         <div className={styles.numpad_item} onClick={() => props.onNumberClick('5')}> 5 </div>
         <div className={styles.numpad_item} onClick={() => props.onNumberClick('6')}> 6 </div>
         <div className={styles.numpad_item} onClick={() => props.onOperatorClick({ name: "subtract", symbol: "-" })}> - </div>

         <div className={styles.numpad_item} onClick={() => props.onNumberClick('1')}> 1 </div>
         <div className={styles.numpad_item} onClick={() => props.onNumberClick('2')}> 2 </div>
         <div className={styles.numpad_item} onClick={() => props.onNumberClick('3')}> 3 </div>
         <div className={styles.numpad_item} onClick={() => props.onOperatorClick({ name: "add", symbol: "+" })}> + </div>

         <div className={styles.numpad_item} onClick={() => props.onToggleNegative()}> +- </div>
         <div className={styles.numpad_item} onClick={() => props.onNumberClick('0')}> 0 </div>
         <div className={styles.numpad_item} onClick={() => props.onNumberClick('.')}> . </div>
         <div className={styles.numpad_item} onClick={() => props.onOperatorClick({ name: "calculate", symbol: "=" })}> = </div>
      </div>
   );
}

export default Numpad;
