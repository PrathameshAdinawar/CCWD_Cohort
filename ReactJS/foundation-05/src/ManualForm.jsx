import React, { useState } from 'react'

const roles = ['Frontend', 'backend', 'AI Engineer']

const ManualForm = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        role: 'frontend',
        exp: '',
        cover: ''
    })


    //forms have error so 
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)


    //handler
    function set(field) {

        // he square brackets [] tell JavaScript: "Don't use the literal word 'field'; 
        // instead, use the value stored in the variable field.
        // "Example: If you called set("email"), then [field] becomes "email"
        // ...v is shallow copy so when one field is changed other doesn't get vanished 
        return (e) => setValues((v) => ({ ...v, [field]: e.target.value }))
    }

    // this runs when called in submit
    function validate(v) {

        const e = {}
        if (!v.name.trim()) e.name = 'Name is required';

        return e;
    }

    // called when submit button is clicked 
    function submit(ev) {

        //we take control here from browser and prevent refresh the page
        ev.preventDefault();
        const e = validate(values);
        setErrors(e);
        if (Object.keys(e).length === 0) setSubmitted(true);
    }

    //prints at last 
    if (submitted) {
        return (
            <div>
                <h1>Form submitted successfully! {values.name}</h1>
            </div>
        )
    }

    return (

        <div>
            <form onSubmit={submit} noValidate>

                <label>
                    Name
                    <input value={values.name} onChange={set('name')} />
                    {/* if error exist then show span otherwise nothing */}
                    {errors.name && <span>{errors.name}</span>}
                </label>

                <label>
                    Email
                    <input value={values.email} onChange={set('email')} />
                    {errors.email && <span>{errors.email}</span>}

                </label>

                <button type='submit'>Submit</button>

            </form>
        </div>
    )
}

export default ManualForm