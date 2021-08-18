import React, { useContext } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import "./Shipment.css";

const Shipment = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log("form submitted", data);
  };

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input
        name="name"
        defaultValue={loggedInUser.name}
        {...register("name", { required: true })}
        placeholder="Your name"
      />
      {errors.name && <span className="error">Name is required</span>}

      <input
        name="email"
        defaultValue={loggedInUser.email}
        {...register("email", { required: true })}
        placeholder="Your Email"
      />
      {errors.email && <span className="error">Email is required</span>}

      <input
        name="address"
        {...register("address", { required: true })}
        placeholder="Your Address"
      />
      {errors.address && <span className="error">Address is required</span>}

      <input
        name="phone"
        {...register("phone", { required: true })}
        placeholder="Your Phone number"
      />
      {errors.phone && <span className="error">Phone Number is required</span>}

      <input type="submit" />
    </form>
  );
};

export default Shipment;
