import React from "react";
import styles from "./Input.module.css";

const input = (props) => {
  let inputElement = [styles.InputElement];
  if(props.invalid && props.shouldValid){
    inputElement.push(styles.Invalid)
  }
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputElement.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "teaxtarea":
      inputElement = (
        <textarea
          className={inputElement.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputElement.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputElement.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
