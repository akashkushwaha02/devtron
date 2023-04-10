import React, { useState } from "react";
import "./forms.css";

const UserForm = ({ fields, onSubmit }) => {
  const [formFields, setFormFields] = useState(() =>
    fields.map((field) => ({ ...field, error: "" }))
  );

  const handleChange = (event, index) => {
    const { value } = event.target;
    const field = formFields[index];
    if (field.type === "button") {
      console.log("button clicked");
    } else {
      setFormFields((prevFields) =>
        prevFields?.map((f, i) =>
          i === index ? { ...f, value, error: "" } : f
        )
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = formFields.reduce((acc, field, index) => {
      if (field.type === "dropdown" && field.value === "") {
        return [...acc, { index, error: "Please select an option." }];
      } else if (field.value.trim() === "" && field.type !== "button") {
        return [...acc, { index, error: "This field is required." }];
      } else {
        return acc;
      }
    }, []);

    if (errors.length > 0) {
      setFormFields((prevFields) =>
        prevFields.map((f, i) =>
          errors.some((e) => e.index === i)
            ? { ...f, error: errors.find((e) => e.index === i).error }
            : f
        )
      );
    } else {
      alert("check the data/payload in console");
      console.log(formFields);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {formFields?.map((field, index) => (
        <div key={field.id.unqID}>
          {field.type === "button" && (
            <button
              id={field.id.unqID}
              type={field.type}
              value={field.value}
              onChange={(event) => handleChange(event, index)}
            >
              {field.label}
            </button>
          )}
          {field.type !== "button" && (
            <label htmlFor={field.id.unqID}>{field.label}</label>
          )}
          {field.type === "textarea" ? (
            <textarea
              id={field.id.unqID}
              value={field.value}
              onChange={(event) => handleChange(event, index)}
            />
          ) : field.type === "dropdown" ? (
            <select
              id={field.id.unqID}
              value={field.value}
              onChange={(event) => handleChange(event, index)}
            >
              <option value="">Select an option</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          ) : (
            field.type !== "button" && (
              <input
                id={field.id.unqID}
                type={field.type}
                value={field.value}
                onChange={(event) => handleChange(event, index)}
              />
            )
          )}
          {field.error && <p style={{ color: "red" }}>{field.error}</p>}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
