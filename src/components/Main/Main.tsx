import { useState, FC } from 'react';

import Numpad from '../Numpad/Numpad';
import Output from '../Output/Output';
import styles from './Main.module.css';


interface MainProps {

}

const Main: FC<MainProps> = () => {

   const [currentNumber, setCurrentNumber] = useState<string>("0");
   const [previousNumber, setPreviousNumber] = useState<string>("");

   const [selectedOperator, setSelectedOperator] = useState({ name: "", symbol: "" });

   const [smallerText, setSmallerText] = useState<string>("");
   const [output, setOutput] = useState<string>("0");

   const onNumberClick = (num: string) => {

      let tempCurrentNumber = currentNumber;

      if (num === '.') {
         if (currentNumber.includes('.')) {
            return
         }

         if (currentNumber === "0") {
            tempCurrentNumber += '.'
         }
      }

      if (num !== '.') {
         if (currentNumber === "0") {
            tempCurrentNumber = num
         }

         if (currentNumber !== "0") {
            tempCurrentNumber += num
         }
      }

      setCurrentNumber(tempCurrentNumber)
      setOutput(tempCurrentNumber)
   }

   const onOperatorClick = (operator: { name: string, symbol: string }) => {
      // Return on empty operator
      if (operator.name === "") return;
      // Also return if current number is 0
      if (currentNumber === "0") return;

      if (operator.name === "clear") {
         setCurrentNumber("")
         setPreviousNumber("")

         setSmallerText("")
         setOutput("0")
      }
      else if (operator.name === "calculate") {
         // Return if there is no previous number (nothing to calculate)
         if (!previousNumber) return;

         // If there is previous number then clculate the result
         let result = calculate()
         // Clear the previous number
         setPreviousNumber('')
         // Set the new current number as the result for the next operation
         setCurrentNumber(String(result))
         // Update the output
         setOutput(String(result))
         // Clear the operator
         setSelectedOperator({ name: '', symbol: '' })
         // History
         setSmallerText((smallerText) => smallerText + ' ' + currentNumber)
      }
      else if (['add', 'subtract', 'multiply', 'divide'].includes(operator.name)) {

         // If there is no previous number
         if (!previousNumber) {
            // We store the current number as previous
            setPreviousNumber(currentNumber)
            // We store current operation and symbol
            setSelectedOperator(operator)
            // We update the smaller text
            setSmallerText(currentNumber + ' ' + operator.symbol)
            // We clear the current number
            setCurrentNumber("0")
            // We clear the output
            setOutput("0")
            // HIstory
            setSmallerText(currentNumber + ' ' + operator.symbol)
         }

         // If previous number has a value
         // AND user clicked another operator (not calculate {=})
         if (previousNumber) {
            // Calculate the result
            let result = calculate()

            // Set previous number as the result
            setPreviousNumber(String(result))
            // Clear current number
            setCurrentNumber("0")
            // Save the new clicked operator
            setSelectedOperator(operator)
            // Update the display to show the result
            setOutput(String(result))
            // History
            setSmallerText((smallerText) => smallerText + ' ' + currentNumber + ' ' + operator.symbol)

         }
      }
   }

   const calculate = () => {
      let previous = Number(previousNumber)
      let current = Number(currentNumber)

      let result;
      switch (selectedOperator.name) {
         case 'add':
            result = previous + current
            break;
         case 'subtract':
            result = previous - current
            break;
         case 'multiply':
            result = previous * current
            break;
         case 'divide':
            result = previous / current
            break;
         default: return;
      }

      return result;
   }

   const onToggleNEgative = () => {
      let number = Number(currentNumber)
      setCurrentNumber(String(-number))
      setOutput(String(-number))
   }

   const onBackspace = () => {
      if (currentNumber.substring(0, currentNumber.length - 1).length === 0) {
         setCurrentNumber("0")
         setOutput("0")
      } else {
         setCurrentNumber(currentNumber.substring(0, currentNumber.length - 1))
         setOutput(currentNumber.substring(0, currentNumber.length - 1))
      }
   }

   return (
      <div className={styles.page_container}>
         <div className={styles.calculator_container}>

            <Output
               output={output}
               smallerText={smallerText}
            />

            <Numpad
               onNumberClick={(num) => onNumberClick(num)}
               onOperatorClick={(operator) => onOperatorClick(operator)}
               onToggleNegative={onToggleNEgative}
               onBackspace={onBackspace}
            />

         </div>
      </div>
   );
}

export default Main;