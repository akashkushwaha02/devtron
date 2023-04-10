import React, { useState } from "react";
import Form from "./Form/Form";
import UserForm from "./Form/UserForm";

const Devtron = () => {
  const [formCreated, setFormCreated] = useState(false);
  const [formData, setFormData] = useState();
  const formPreview = (fields) => {
    console.log(fields);
    setFormCreated(true);
    setFormData(fields);
  };
  return (
    <div>
      {!formCreated ? (
        <Form onFormChange={formPreview} />
      ) : (
        <UserForm fields={formData} />
      )}
    </div>
  );
};

export default Devtron;
