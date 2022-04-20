import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import {
    auth,
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInWithGoogleRedirect
} from '../../utils/firebase/firebase.utils.js';

import SignUpForm from '../../components/sign-up/sign-up.component';

const Login = () => {

    // redirect 
    // useEffect(async () => {
    //     const response = await getRedirectResult(auth);
    //     if (response) {
    //         const userDocRef = await createUserDocumentFromAuth(response.user);
    //     }
    // }, []);

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    return (
        <div>
            <div>
                <h1>Sign In</h1>
                <button onClick={logGoogleUser}>
                    Sign In with Google
                </button>
                {/* <button onClick={signInWithGoogleRedirect}>
                Sign In with Google Redirect
            </button> */}
            </div>
            <div>
                <SignUpForm />
            </div>
        </div>
    );
};

export default Login;