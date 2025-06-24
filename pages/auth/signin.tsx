import React from 'react';
import { getProviders, signIn } from 'next-auth/react';
import { GetServerSideProps } from 'next';

export default function SignIn({ providers }: { providers: any }) {
  return (
    <div className="p-8 space-y-4">
      {providers &&
        Object.values(providers).map((provider: any) => (
          <div key={provider.name}>
            <button
              className="px-4 py-2 bg-steel-blue text-white rounded hover:bg-blue-700 focus:ring-2 focus:ring-steel-blue disabled:opacity-50"
              onClick={() => signIn(provider.id)}
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return { props: { providers } };
};
