import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAwV5K5RycDOjCh1Bi6cd_wMAARq1pljoo",
    authDomain: "eshop-boilerplate-sk.firebaseapp.com",
    projectId: "eshop-boilerplate-sk",
    storageBucket: "eshop-boilerplate-sk.appspot.com",
    messagingSenderId: "375232949271",
    appId: "1:375232949271:web:bb11e2ed564d6184d5c052"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// google interface
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch(err) {
            console.log('error creating the user', err.message);
        }
    }

    return userDocRef;
};