import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCnCPm_9D1ZwPMAZdNjjDhXqCymSJwbIrw",
    authDomain: "fitz-monster-emporium-db.firebaseapp.com",
    projectId: "fitz-monster-emporium-db",
    storageBucket: "fitz-monster-emporium-db.appspot.com",
    messagingSenderId: "246918654756",
    appId: "1:246918654756:web:0479e7772d8725c4aee1b1"
  };
  
  initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt: "select_account",
  });

  export const auth = getAuth();
  
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

  export const db = getFirestore();

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
      const collectionRef = collection(db, collectionKey);
      const batch = writeBatch(db);

      objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.monster_type.toLowerCase());
        batch.set(docRef, object);
      });

      await batch.commit();
      console.log('done');
  };

  export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
      const { monster_type, monsters } = docSnapshot.data();
      acc[monster_type.toLowerCase()] = monsters;
      return acc;
    }, {});

    return categoryMap;

  }

  export const createUserFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);
    
    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log('Error creating the user', error.message);
        }
    } 
    
    return userDocRef;
  }

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password ) return;
    return await createUserWithEmailAndPassword(auth, email, password);
  }

  export const signInAuthWithEmailAndPassword = async (email, password) => {
    if(!email || !password ) return;
    return await signInWithEmailAndPassword(auth, email, password);
  }

  export const signOutUser = async () => await signOut(auth);

  export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);