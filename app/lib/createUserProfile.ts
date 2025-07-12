// lib/createUserProfile.ts
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export async function createUserProfile(user: { uid: string }) {
  if (!user) return;

  const userDocRef = doc(db, 'users', user.uid);
  const docSnap = await getDoc(userDocRef);

  if (!docSnap.exists()) {
    await setDoc(userDocRef, {
      username: '',
      phone: '',
      address: '',
      photoURL: '',
    });
  }
}
