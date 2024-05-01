import Button from "./button";
import { useState, useEffect } from "react";
import Header from "../header/header";

interface Field {
  name: string;
  label: string;
  type: string;
  required: boolean;
  options?: string[];

}

interface FormProps {
  formData: Field[];
  onSubmit: (data: any) => void;
}

export default function Form({formData, onSubmit}: FormProps) {
  const [inputs, setInputs] = useState<{[key: string]: any}>({});

  useEffect(() => {
    setInputs(formData.reduce((acc, field) => {
      //skip non-required fields
      if(field.required)
        return {
          ...acc,
          [field.name]: null
        }
      return acc;
    }, {}));
  }, []);

  function handleChange(e: any) {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div className="w-full flex flex-col">
      {formData.map((field, index) => {
          return (
            <div key={index} className="flex flex-col">
              <label className="text-lg" htmlFor={field.name}>{field.label}</label>
              {field.type === "select" ? (
                <select onChange={handleChange} id={field.name} name={field.name} required={field.required}>
                  {field.options?.map((option, index) => {
                    return (
                      <option key={index} value={option}>{option}</option>
                    )
                  })}
                </select>
              ) : (
                <>
                  <input 
                    className="border border-gray-300 text-black rounded-md p-1 mt-1 mb-4 focus:outline-none focus:ring-2 focus:ring-lime-600 focus:border-transparent"
                    onChange={handleChange} type={field.type} id={field.name} name={field.name} required={field.required} 
                  />
                  {/* image previewer goes here */ 
                    field.name.includes("image") && inputs[field.name] && (
                      <div>
                        <img src={inputs[field.name]} alt="Image Preview" />
                      </div>
                    )
                  }
                </>
              )}
            </div>
          )
      })}
      <Button onClick={() => onSubmit(inputs)}>Submit</Button>
    </div>
  )
}