import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils.js';

const Login = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRed = await createUserDocumentFromAuth(user);
    }

    return (
        <div>
            <h1>Sign In</h1>
            <button onClick={logGoogleUser}>
                Sign In with Google
            </button>
        </div>
    );
};

export default Login;