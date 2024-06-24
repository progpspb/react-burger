import { useState, ChangeEvent } from "react";

interface IUseForm {
  [key: string]: string;
}

export function useForm(inputValues: IUseForm) {
    const [values, setValues] = useState(inputValues);
  
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const {value, name} = event.target;
      setValues({...values, [name]: value});
    };

    const reset = () => {
        setValues(inputValues);
    }
    
    return {values, handleChange, reset};
}