// components/ProfileForm.tsx
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { db, storage } from '@/app/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function ProfileForm() {
  const { user } = useAuth();
  const [form, setForm] = useState({ username: '', phone: '', address: '', photoURL: '' });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (user) {
      const loadData = async () => {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setForm(docSnap.data() as any);
      };
      loadData();
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updates = { ...form };

    if (file) {
      const imageRef = ref(storage, `profiles/${user?.uid}`);
      await uploadBytes(imageRef, file);
      updates.photoURL = await getDownloadURL(imageRef);
    }

    await updateDoc(doc(db, 'users', user!.uid), updates);
    alert('Profile updated!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} placeholder="Username" />
      <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" />
      <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Address" />
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button type="submit">Save</button>
    </form>
  );
}
