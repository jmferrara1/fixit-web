import React, { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function SignUp() {
  const [email, setEmail] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn('email', { email, callbackUrl: '/dashboard' });
  };

  return (
    <form onSubmit={submit} className="p-8 space-y-4">
      <input
        className="border p-2 w-full"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <button
        className="px-4 py-2 bg-steel-blue text-white rounded hover:bg-blue-700 focus:ring-2 focus:ring-steel-blue disabled:opacity-50"
        type="submit"
      >
        Sign up / Sign in
      </button>
    </form>
  );
}
