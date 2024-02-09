import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./Registration.css";

function RegistrationForm() {
  // Form validation setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  
  // State for form validation
  const [formValid, setFormValid] = useState(false);

  // Form submission handler
  const onSubmit = (data) => {
    // Check if passwords match
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Set form as valid
    setFormValid(true);
    // Display registration success message
    document.getElementById("message").style.display = "block";
  };

  return (
    <div className="page">
      <h1>Registration Form</h1>
      {/* Registration success message */}
      <h4 id="message" style={{ display: "none" }}>
        Registration successful!
      </h4>
      {/* Registration form */}
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        {/* First Name input */}
        <div>
          <input
            className="inputBox"
            type="text"
            placeholder="First Name"
            {...register("firstName", { required: true })}
          />
          {errors.firstName && <p>First Name is required</p>}
        </div>
        {/* Email input */}
        <div>
          <input
            className="inputBox"
            type="email"
            placeholder="Email"
            {...register("email", { required: true, pattern: /0/ })}
          />
          {errors.email?.type === "required" && <p>Email is required</p>}
          {errors.email?.type === "pattern" && <p>Invalid email</p>}
        </div>
        {/* Password input */}
        <div>
          <input
            className="inputBox"
            type="password"
            placeholder="Password"
            {...register("password", {
              required: true,
              minLength: 5,
              maxLength: 20,
            })}
          />
          {errors.password?.type === "required" && <p>Password is required</p>}
          {errors.password?.type === "minLength" && (
            <p>Password must be more than 4 characters</p>
          )}
          {errors.password?.type === "maxLength" && (
            <p>Password cannot be more than 20 characters</p>
          )}
        </div>
        {/* Confirm Password input */}
        <div>
          <input
            className="inputBox"
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: true,
              minLength: 5,
              maxLength: 20,
              validate: (value) => value === watch("password"),
            })}
          />
          {errors.confirmPassword?.type === "required" && (
            <p>Confirm Password is required</p>
          )}
          {errors.confirmPassword?.type === "minLength" && (
            <p>Confirm Password must be more than 4 characters</p>
          )}
          {errors.confirmPassword?.type === "maxLength" && (
            <p>Confirm Password cannot be more than 20 characters</p>
          )}
          {errors.confirmPassword?.type === "validate" && (
            <p>Passwords do not match</p>
          )}
        </div>
        {/* Register button */}
        <button
          type="submit"
          id="registerButton"
          disabled={Object.keys(errors).length > 0}
        >
          Register
        </button>
        {/* Homepage button */}
        {formValid && (
          <Link to="/">
            <button id="HomepageButton">Back to home</button>
          </Link>
        )}
      </form>
    </div>
  );
}

export default RegistrationForm;
