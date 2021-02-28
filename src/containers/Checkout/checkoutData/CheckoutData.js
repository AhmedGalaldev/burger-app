import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./CheckoutData.module.css";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-order";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class CheckoutData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "",
      },
    },
    loading: false,
  };

  handleOrder = (event) => {
    event.preventDefault();
    console.log(this.props.ings);

    this.setState({ loading: true });
    const formData = {};
    for (let formDataIdentifier in this.state.orderForm) {
      formData[formDataIdentifier] = this.state.orderForm[
        formDataIdentifier
      ].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
    };

    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  checkValidation = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  };
  inputChangeHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    updatedFormElement.valid = this.checkValidation(
      updatedFormElement.value,
      updatedFormElement.validation
    );

    console.log(updatedFormElement);
    this.setState({ orderForm: updatedOrderForm });
  };

  render() {
    const formElemntsArray = [];
    for (let key in this.state.orderForm) {
      formElemntsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.handleOrder}>
        {formElemntsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event) => this.inputChangeHandler(event, formElement.id)}
            invalid={!formElement.config.valid}
            shouldValid={formElement.config.validation}
          />
        ))}

        <Button btnType="Success">Submit</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={styles.CheckoutData}>
        <h2>Please Add your contact</h2>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalePrice,
  };
};
export default connect(mapStateToProps)(CheckoutData);
