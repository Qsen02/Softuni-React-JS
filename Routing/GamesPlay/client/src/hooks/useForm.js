import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getGameById } from "../api/gameService";

export function useNormalForm(initalvalues, callback, id) {
    const [formValues, setFormValues] = useState(initalvalues);

    function changeHandler(event) {
        setFormValues(oldValues => ({...oldValues, [event.target.name]: event.target.value }))
    }

    if (id) {
        useEffect(() => {
            (async() => {
                let game = await getGameById(id);
                setFormValues(game);
            })()
        }, [])
    }

    async function submitHandler(event) {
        event.preventDefault();
        callback();
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