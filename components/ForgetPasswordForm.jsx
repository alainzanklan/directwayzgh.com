'use client';

import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Spinner from '@/components/Spinner';

const ForgetPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resUserExist = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/userExist`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        }
      );

      const { user } = await resUserExist.json();

      if (!user) {
        toast.error('User is not registered');

        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/forget-password`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      );

      if (res.ok) {
        // setName('');
        // setEmail('');
        // setConfirmPassword('');
        // setPassword('');
        setLoading(true);
        toast.success('Reset password email sent');
        router.push('/login');
      } else {
        console.log('Something went wrong');
      }
    } catch (error) {
      console.log('Something went wrong', error);
    }
  };

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && (
        <section className='bg-blue-50 min-h-screen flex-grow'>
          <div className='container m-auto max-w-lg py-24'>
            <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
              <h2 className='text-3xl text-gray-700 text-center font-semibold mb-6'>
                Forget Password
              </h2>

              {/* <!-- Login Form--> */}
              <form onSubmit={handleSubmit}>
                <div className='my-6 text-gray-700  font-semibold text-center'>
                  Enter your email address
                </div>

                {/* <!-- Email --> */}
                <div className='mb-4'>
                  <label className='block text-gray-700 font-bold mb-2'>
                    Email
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    className='border rounded w-full py-2 px-3 mb-2'
                    placeholder='Email address'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* <!-- Submit Button --> */}
                <div>
                  <button
                    className='bg-indigo-500 hover:bg-indigo-600 text-indigo-50 font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                    type='submit
                  '
                  >
                    Submit
                  </button>
                </div>
              </form>
              <Link href={'/login'}>
                <p className='flex p-2 gap-2 justify-end mt-4'>
                  {' '}
                  <span className='underline'>Login</span>
                </p>
              </Link>
            </div>
          </div>
          <div className='flex-grow'></div>
        </section>
      )}
    </>
  );
};

export default ForgetPasswordForm;
