'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { FaGoogle } from 'react-icons/fa';
import Spinner from '@/components/Spinner';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { data: session, status: sessionStatus } = useSession();
  console.log(session, sessionStatus);

  const router = useRouter();

  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      router.replace('/');
    }
  }, [sessionStatus, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      console.log(res);

      if (res.error) {
        toast.error('Invalid Credentials');
        return;
      }

      setLoading(true);
    } catch (error) {
      console.log('error');
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && (
        <section className='bg-blue-50 min-h-screen flex-grow'>
          <div className='container m-auto max-w-lg py-24'>
            <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
              <h2 className='text-3xl text-center font-semibold mb-6'>Login</h2>

              <div className='mb-4'>
                <button
                  onClick={() => signIn('google')}
                  className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center'
                  type='submit'
                >
                  <FaGoogle className='mr-2' /> Continue with Google
                </button>
              </div>
              {/* <!-- Login Form--> */}
              <form onSubmit={handleSubmit}>
                <div className='my-6 font-semibold text-center'>
                  Or login with your email address
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
                {/* 
              <!-- Password --> */}
                <div className='mb-2'>
                  <label className='block text-gray-700 font-bold mb-2'>
                    Password
                  </label>
                  <input
                    type='password'
                    id='password'
                    name='password'
                    className='border rounded w-full py-2 px-3'
                    placeholder='Password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className='mb-6 text-indigo-500 text-sm font-bold max-w-fit hover:bg-indigo-100 hover:'>
                  <Link href={'/forget-password'}>Forgot Password?</Link>
                </div>

                {/* <!-- Submit Button --> */}
                <div>
                  <button
                    className='bg-indigo-500 hover:bg-indigo-600 text-indigo-50 font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                    type='submit
                '
                  >
                    Login
                  </button>
                </div>
              </form>
              <Link href={'/register'}>
                <p className='flex p-2 gap-2 justify-end mt-4'>
                  {' '}
                  Don't have an account?{' '}
                  <span className='underline'>Register</span>
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
export default LoginForm;
