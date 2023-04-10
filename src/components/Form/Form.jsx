import React, { useState } from "react";
import { useId } from "react";
import "./forms.css";
import { moc } from "./mock";
import uuid from "react-uuid";

const Form = ({ onFormChange }) => {
  const unqID = useId();
  const [fields, setFields] = useState([]);
  const [labelChange, setLabelChange] = useState("");

  const [selectedType, setSelectedType] = useState("text");

  const handleAddField = () => {
    setFields([
      ...fields,
      { id: { unqID }, type: selectedType, value: "", label: labelChange },
    ]);
    setLabelChange("");
  };

  const handleFieldChange = (index, field) => {
    const updatedFields = [...fields];
    updatedFields[index] = field;
    setFields(updatedFields);
  };

  const handleSelectType = (event) => {
    setSelectedType(event.target.value);
    setLabelChange(labelChange);
  };

  const renderFieldTypeSelector = () => {
    return (
      <>
        <input
          value={labelChange}
          type="text"
          placeholder="Form label "
          onChange={(e) => setLabelChange(e.target.value)}
        />
        <select value={selectedType} onChange={handleSelectType}>
          <option value="text">Text Input</option>
          <option value="textarea">Textarea</option>
          <option value="button">Button</option>
          <option value="dropdown">Dropdown</option>
        </select>
      </>
    );
  };

  const handlePreview = (event) => {
    event.preventDefault();

    onFormChange && onFormChange(fields);
  };
  const renderField = (field, index) => {
    switch (field.type) {
      case "button":
        return (
          <button key={index} onClick={() => alert("Button clicked!")}>
            {field.label}
          </button>
        );
      case "dropdown":
        return (
          <>
            <label>{field.label} : </label>
            <select
              key={index}
              value={field.value}
              onChange={(event) =>
                handleFieldChange(index, {
                  ...field,
                  value: event.target.value,
                })
              }
            >
              {moc.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </>
        );
      case "textarea":
        return (
          <>
            <label>{field.label} : </label>
            <textarea
              key={index}
              value={field.value}
              onChange={(event) =>
                handleFieldChange(index, {
                  ...field,
                  value: event.target.value,
                })
              }
            />
          </>
        );
      default:
        return (
          <>
            <label>{field.label} : </label>

            <input
              key={index}
              type="text"
              value={field.value}
              onChange={(event) =>
                handleFieldChange(index, {
                  ...field,
                  value: event.target.value,
                })
              }
            />
          </>
        );
    }
  };

  return (
    <div>
      {fields.map((field, index) => (
        <div key={index}>{renderField(field, index)}</div>
      ))}
      <div>
        {renderFieldTypeSelector()}
        <button onClick={() => handleAddField()}>Add Field</button>
      </div>
      <button type="submit" onClick={handlePreview}>
        Next Step
      </button>
    </div>
  );
};

export default Form;
