import { useState } from "react";

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import './sign-in.styles.scss';
import {
    auth,
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInUserWithEmailPass
} from '../../utils/firebase/firebase.utils.js';
// import { UserContext } from "../../contexts/user.context";


const defaultFormFields = {
    email: '',
    password: ''
}


const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const {user} = await signInUserWithEmailPass(email, password);
            resetForm();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error);
            }
        }

    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    const resetForm = () => {
        setFormFields(defaultFormFields);
    }

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign In with email/pass</span>
            <form onSubmit={handleSubmit}>

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

                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;