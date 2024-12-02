'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/Spinner';

const ResetPasswordForm = () => {
  const { token } = useParams();
  console.log(token);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [verified, setVerified] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/verify-token`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          }
        );

        if (res.status === 400) {
          setError('Invalid token or has expired');
          setVerified(true);
        }

        if (res.status === 200) {
          setError('');
          setVerified(true);
          const userData = await res.json();
          setUser(userData);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Password does not match');
      setPassword('');
      setConfirmPassword('');
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/reset-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password, email: user?.email }),
        }
      );

      if (res.status === 400) {
        setError('Something went wrong');
      }

      if (res.status === 200) {
        setError('');
        router.push('/login');
      }
    } catch (error) {
      setError('Error, try again');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading &&
        (error ? (
          <p className=' py-10 mt-10 flex justify-center items-center text-rose-600 text-xl mb-4'>
            {error && error}
          </p>
        ) : (
          <section className='bg-blue-50 min-h-screen flex-grow'>
            <div className='container m-auto max-w-lg py-24'>
              <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
                <h2 className='text-3xl text-gray-700 text-center font-semibold mb-6'>
                  Reset Password
                </h2>

                {/* <!-- Login Form--> */}
                <form onSubmit={handleSubmit}>
                  <div className='my-6 text-gray-700 font-semibold text-center'>
                    Enter your new password
                  </div>

                  {/* <!-- password --> */}
                  <div className='mb-4'>
                    <label className='block text-gray-700 font-bold mb-2'>
                      Password
                    </label>
                    <input
                      type='password'
                      id='password'
                      name='password'
                      className='border rounded w-full py-2 px-3 mb-2'
                      placeholder='Password'
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  {/* <!-- password --> */}
                  <div className='mb-4'>
                    <label className='block text-gray-700 font-bold mb-2'>
                      Confirm Password
                    </label>
                    <input
                      type='password'
                      id='confirmPassword'
                      name='ConfirmPassword'
                      className='border rounded w-full py-2 px-3 mb-2'
                      placeholder='Confirm Password'
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>

                  {/* <!-- Submit Button --> */}
                  <div>
                    <button
                      disabled={error.length > 0}
                      className='bg-indigo-500 hover:bg-indigo-600 text-indigo-50 font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                      type='submit
                '
                    >
                      Reset Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className='flex-grow'></div>
          </section>
        ))}
    </>
  );
};

export default ResetPasswordForm;
