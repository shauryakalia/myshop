import { useState, useContext } from "react";

import { createAuthUserWithEmailPass, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import './sign-up.styles.scss';

import { UserContext } from "../../contexts/user.context";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password } = formFields;

    const { currentUser, setCurrentUser } = useContext(UserContext);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = createAuthUserWithEmailPass(email, password);
            setCurrentUser(user);
            await createUserDocumentFromAuth(user, {displayName});
            resetForm();
        } catch (error) {
            if (error.code === 'auth/email=already-in-use') {
                alert('email lalready in use');
            } else {
                console.log('error at user creation', error);
            }
        }
        
    }

    const handleChange = (event) => {
        const { name, value  } = event.target;
        setFormFields({...formFields, [name]:value});
    }

    const resetForm = () => {
        setFormFields(defaultFormFields);
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with email/pass</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Display Name"
                    type="text" 
                    required 
                    name="name" 
                    onChange={handleChange}
                    value={displayName} 
                />

                <FormInput 
                    label="email"
                    type="email" 
                    required 
                    name="Email"
                    onChange={handleChange}
                    value={email} 
                />

                <FormInput 
                    label="password"
                    type="password" 
                    required 
                    name="Password"
                    onChange={handleChange}
                    value={password} 
                />

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUpForm;