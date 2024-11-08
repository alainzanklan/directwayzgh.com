'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaGoogle, FaSleigh } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Spinner from '@/components/Spinner';

function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession('');

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPassword('');
      setPassword('');

      toast.error('Password does not match');

      return;
    }

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

      if (user) {
        toast.error('User already exist');

        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/register`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        }
      );

      if (res.ok) {
        // setName('');
        // setEmail('');
        // setConfirmPassword('');
        // setPassword('');
        setLoading(true);
        toast.success('Account created');
        router.push('/login');
      } else {
        console.log('user registration failed');
      }
    } catch (error) {
      console.log('User registration failed', error);
    }

    // if (confirmPassword === password) {
    //   await axios.post(`${process.env.NEXT_PUBLIC_API_DOMAIN}/auth/signup`, {});

    //   await signIn('credentials', {
    //     redirect: false,
    //     username: username,
    //     password,
    //   });
    // } else {
    //   setError('password and confirm password does not match');
    // }
  };

  return (
    <>
      {loading && <Spinner loading={loading} />}{' '}
      {!loading && (
        <section className='bg-blue-50 min-h-screen flex-grow'>
          <div className='container m-auto max-w-lg py-24'>
            <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
              {/* <!-- Register Form--> */}
              <h2 className='text-3xl text-center font-semibold mb-6'>
                Create An Account
              </h2>

              <div className='mb-4'>
                <button
                  onClick={() => signIn('google')}
                  className='bg-red-500 border hover:bg-red-600 text-red-50 font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center'
                  type='submit'
                >
                  <FaGoogle className='mr-2' /> Register with Google
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className='my-6 font-semibold text-center'>
                  Or register with your email address
                </div>
                {/* <!-- First Name --> */}
                <div className='mb-4'>
                  <label
                    htlmfor='Name'
                    className='block text-gray-700 font-bold mb-2'
                  >
                    Name
                  </label>
                  <input
                    type='text'
                    id='Name'
                    name='Name'
                    className='border rounded w-full py-2 px-3 mb-2'
                    placeholder='Full Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* <!-- Username --> */}
                <div className='mb-4'>
                  <label
                    htlmfor='email'
                    className='block text-gray-700 font-bold mb-2'
                  >
                    Email
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    className='border rounded w-full py-2 px-3 mb-2'
                    placeholder='Email address'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {/* 
          <!-- Password --> */}
                <div className='mb-4'>
                  <label
                    htlmfor='password'
                    className='block text-gray-700 font-bold mb-2'
                  >
                    Password
                  </label>
                  <input
                    type='password'
                    id='password'
                    name='password'
                    className='border rounded w-full py-2 px-3 mb-2'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {/* 
          <!-- Password --> */}
                <div className='mb-4'>
                  <label
                    htlmfor='Passowrd'
                    className='block text-gray-700 font-bold mb-2'
                  >
                    Confirm Password
                  </label>
                  <input
                    type='Password'
                    id='confirmPassword'
                    name='confirmPassword'
                    className='border rounded w-full py-2 px-3 mb-2'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                {/* <!-- Submit Button --> */}
                <div>
                  <button
                    className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                    type='submit'
                  >
                    Sign Up
                  </button>
                </div>
              </form>

              <Link href={'/login'}>
                <p className='flex p-2 gap-2 justify-end mt-4'>
                  {' '}
                  Already have an account?{' '}
                  <span className='underline'>Login</span>
                </p>
              </Link>
            </div>
          </div>
          <div className='mx-10'>
            User Details :{session && <div>{JSON.stringify(session)}</div>}
            {!session && <div>Not logged in</div>}
          </div>
        </section>
      )}
    </>
  );
}

export default RegisterForm;
