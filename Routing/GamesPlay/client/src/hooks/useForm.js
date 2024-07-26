import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useNormalForm(initalvalues, callback, path) {
    const [formValues, setFormValues] = useState(initalvalues);
    const navigate = useNavigate();

    function changeHandler(event) {
        setFormValues(oldValues => ({...oldValues, [event.target.name]: event.target.value }))
    }

    async function submitHandler(event) {
        event.preventDefault();
        callback();
        navigate(path);
        setFormValues(oldValues => {
            for (let value in oldValues) {
                oldValues[value] = "";
            }
            return {...oldValues };
        })
    }

    return {
        formValues,
        changeHandler,
        submitHandler
    }

}