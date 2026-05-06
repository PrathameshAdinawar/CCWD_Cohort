import React from 'react'

import { useForm } from "react-hook-form"

const roles = ['Frontend', 'backend', 'AI Engineer']


const HookForm = () => {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful, isSubmitting },
        getValues
    } = useForm({ defaultValues: { name: 'chai' }, mode: 'onTouched' });


    function submit(data) {
        return new Promise((res) => console.log("Submitted", data))
    }


    if (isSubmitSuccessful) {
        return (
            <div>
                <h1>Form submitted successfully!</h1>
            </div>
        )
    }

    return
    <div>
        <h1>React-Hook_Form</h1>

        <form onSubmit={handleSubmit(submit)}>
            <label>
                Name
                <input {...register('name', { required: 'Name is required' })} />
                {errors.name && <span>{errors.name}</span>}
            </label>

            <label>
                Email
                <input {...register('email', { required: 'Email is required' })} />
                {errors.email && <span>{errors.email}</span>}

            </label>

            <button type='submit' disabled={isSubmitting}>Submit</button>
            {isSubmitting ? 'Submitting...' : 'Submited'}

        </form>
    </div>

}

export default HookForm