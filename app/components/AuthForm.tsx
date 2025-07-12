// components/AuthForm.tsx
'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/app/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      await signInWithEmailAndPassword(auth, email, password);
    } else {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', userCred.user.uid), {
        email,
        username: '',
        phone: '',
        address: '',
        photoURL: '',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      <p onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Need an account?' : 'Have an account?'}</p>
    </form>
  );
}
