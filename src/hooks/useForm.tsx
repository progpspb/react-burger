import { useState } from "react";

interface IuseForm {
  [key: string]: string;
}

export function useForm(inputValues: IuseForm) {
    const [values, setValues] = useState(inputValues);
  
    const handleChange = (event: any) => {
      const {value, name} = event.target;
      setValues({...values, [name]: value});
    };
    
    return {values, handleChange, setValues};
}