import { useRef, useState } from "react";
import classes from './Checkout.module.css';

const Checkout = (props) => {
  const cityInputRef = useRef();
  const streetInputRef = useRef();
  const houseInputRef = useRef();
  const postalInputRef = useRef();

  const [formValidity, setFormValidity] = useState({
    city: true,
    street: true,
    house: true,
    postal: true,
  });

  const isEmpty = (value) => {
    if (value.trim() === "") {
      return true;
    }
    return false;
  };

  const hasPostalFormat = (value) => {
    if (/^\d+$/.test(value.trim()) && value.trim().length === 5) {
      return true;
    }
    return false;
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const cityIsValid = !isEmpty(cityInputRef.current.value);
    const streetIsValid = !isEmpty(streetInputRef.current.value);
    const houseIsValid = !isEmpty(houseInputRef.current.value);
    const postalIsValid = hasPostalFormat(postalInputRef.current.value);

    setFormValidity({
        city: cityIsValid,
        street: streetIsValid,
        house: houseIsValid,
        postal: postalIsValid,
    });

    const formIsValid = cityIsValid && streetIsValid && houseIsValid && postalIsValid;
    if (!formIsValid) {
      return;
    }
    const clientData = {
      city: cityInputRef.current.value,
      Street: streetInputRef.current.value,
      house: houseInputRef.current.value,
      postal: postalInputRef.current.value,
    };
    props.onOrder(clientData);
  };

  const cityInputClasses = `${formValidity.city ? '' : classes.invalid}`;
  const streetInputClasses = `${formValidity.street ? '' : classes.invalid}`;
  const houseInputClasses = `${formValidity.house ? '' : classes.invalid}`;
  const postalInputClasses = `${formValidity.postal ? '' : classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <div className={cityInputClasses}>
          <label htmlFor="city">City</label>
          <input type="text" id="city" ref={cityInputRef}></input>
          {!formValidity.city && <p>This field is required</p>}
        </div>
        <div className={streetInputClasses}>
          <label htmlFor="street">Street</label>
          <input type="text" id="street" ref={streetInputRef}></input>
          {!formValidity.street && <p>This field is required</p>}
        </div>
        <div className={houseInputClasses}>
          <label htmlFor="house">House</label>
          <input type="text" id="house" ref={houseInputRef}></input>
          {!formValidity.house && <p>This field is required</p>}
        </div>
        <div className={postalInputClasses}>
          <label htmlFor="postal">Postal code</label>
          <input type="text" id="postal" ref={postalInputRef}></input>
          {!formValidity.postal && <p>5 digits is required</p>}
        </div>
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onClose}>
          Cancel
        </button>
        <button>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
