'use client';

import { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, AlertCircle, Check, Shield } from 'lucide-react';
// import Link from 'next/link';
// import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { FaGoogle, FaSleigh } from 'react-icons/fa';
import { toast } from 'react-toastify';
// import Spinner from '@/components/Spinner';

// function RegisterForm({ role }) {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   // const [role, setRole] = useState('');
//   const { data: session } = useSession('');

//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!name || !email || !password) {
//       toast.error('All fields are required');
//       return;
//     }

//     if (password !== confirmPassword) {
//       setConfirmPassword('');
//       setPassword('');

//       toast.error('Password does not match');

//       return;
//     }

//     try {
//       const resUserExist = await fetch(
//         `${process.env.NEXT_PUBLIC_API_DOMAIN}/userExist`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ email }),
//         }
//       );

//       const { user } = await resUserExist.json();

//       if (user) {
//         toast.error('User already exist');

//         return;
//       }

//       // setUserRole(role);

//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_DOMAIN}/register`,
//         {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ name, email, password, role }),
//         }
//       );

//       if (res.ok) {
//         setLoading(true);
//         toast.success('Account created');
//         router.push('/login');
//       } else {
//         console.log('user registration failed');
//       }
//     } catch (error) {
//       console.log('User registration failed', error);
//     }
//   };

//   return (
//     <>
//       {loading && <Spinner loading={loading} />}{' '}
//       {!loading && (
//         <section className='bg-blue-50 min-h-screen flex-grow'>
//           <div className='container m-auto max-w-lg py-24'>
//             <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
//               {/* <!-- Register Form--> */}
//               {role === 'PRO' ? (
//                 <h2 className='text-3xl text-center font-semibold mb-6'>
//                   Create Pro Account
//                 </h2>
//               ) : (
//                 <h2 className='text-3xl text-center font-semibold mb-6'>
//                   Create An Account
//                 </h2>
//               )}
//               {role === 'USER' ? (
//                 <div className='mb-4'>
//                   <button
//                     onClick={() => signIn('google')}
//                     className='bg-red-500 border hover:bg-red-600 text-red-50 font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center'
//                     type='submit'
//                   >
//                     <FaGoogle className='mr-2' /> Register with Google
//                   </button>
//                   <div className='my-6 font-semibold text-center'>
//                     Or register with your email address
//                   </div>
//                 </div>
//               ) : (
//                 ''
//               )}

//               <form onSubmit={handleSubmit}>
//                 {/* <!-- First Name --> */}
//                 <div className='mb-4'>
//                   <label
//                     htlmfor='Name'
//                     className='block text-gray-700 font-bold mb-2'
//                   >
//                     Name
//                   </label>
//                   <input
//                     type='text'
//                     id='Name'
//                     name='Name'
//                     className='border rounded w-full py-2 px-3 mb-2'
//                     placeholder='Full Name'
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                   />
//                 </div>

//                 {/* <!-- Username --> */}
//                 <div className='mb-4'>
//                   <label
//                     htlmfor='email'
//                     className='block text-gray-700 font-bold mb-2'
//                   >
//                     Email
//                   </label>
//                   <input
//                     type='email'
//                     id='email'
//                     name='email'
//                     className='border rounded w-full py-2 px-3 mb-2'
//                     placeholder='Email address'
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>
//                 {/* 
//           <!-- Password --> */}
//                 <div className='mb-4'>
//                   <label
//                     htlmfor='password'
//                     className='block text-gray-700 font-bold mb-2'
//                   >
//                     Password
//                   </label>
//                   <input
//                     type='password'
//                     id='password'
//                     name='password'
//                     className='border rounded w-full py-2 px-3 mb-2'
//                     placeholder='Password'
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </div>
//                 {/* 
//           <!-- Password --> */}
//                 <div className='mb-4'>
//                   <label
//                     htlmfor='Passowrd'
//                     className='block text-gray-700 font-bold mb-2'
//                   >
//                     Confirm Password
//                   </label>
//                   <input
//                     type='Password'
//                     id='confirmPassword'
//                     name='confirmPassword'
//                     className='border rounded w-full py-2 px-3 mb-2'
//                     placeholder='Confirm Password'
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                   />
//                 </div>

//                 {/* <!-- Submit Button --> */}
//                 <div>
//                   <button
//                     className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
//                     type='submit'
//                   >
//                     Sign Up
//                   </button>
//                 </div>
//               </form>

//               <Link href={'/login'}>
//                 <p className='flex p-2 gap-2 justify-end mt-4'>
//                   {' '}
//                   Already have an account?{' '}
//                   <span className='underline'>Login</span>
//                 </p>
//               </Link>
//             </div>
//           </div>
//           <div className='mx-10'>
//             User Details :{session && <div>{JSON.stringify(session)}</div>}
//             {!session && <div>Not logged in</div>}
//           </div>
//         </section>
//       )}
//     </>
//   );
// }

// export default RegisterForm;



const RegisterForm = ({ role = 'USER' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Calculate password strength
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
      case 1: return { text: 'Very Weak', color: 'text-red-500' };
      case 2: return { text: 'Weak', color: 'text-orange-500' };
      case 3: return { text: 'Medium', color: 'text-yellow-500' };
      case 4: return { text: 'Strong', color: 'text-green-500' };
      case 5: return { text: 'Very Strong', color: 'text-green-600' };
      default: return { text: '', color: '' };
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Check if user already exists
      const resUserExist = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/userExist`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email: formData.email }),
        }
      );

      const { user } = await resUserExist.json();

      if (user) {
        toast.error('User already exists');
        return;
      }

      // Register the user
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/register`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            name: formData.name, 
            email: formData.email, 
            password: formData.password, 
            role: role 
          }),
        }
      );

      if (res.ok) {
        toast.success('Account created successfully');
        
        // Auto login after successful registration
        const result = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (result?.ok) {
          toast.success('Logged in successfully');
          // Optional: redirect to dashboard or home page
          router.push('/');
        } else {
          toast.error('Registration successful, but auto-login failed. Please login manually.');
        }
      } else {
        console.log('user registration failed');
        toast.error('Registration failed. Please try again.');
      }
    } catch (error) {
      console.log('User registration failed', error);
      toast.error('An error occurred during registration');
    } finally {
      setIsSubmitting(false);
    }
  };
    
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            {role === 'PRO' ? 'Professional Account' : 'Create Account'}
          </h1>
          <p className="text-slate-600">
            {role === 'PRO' 
              ? 'Join our network of professionals'
              : 'Join our community today'
            }
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Google Sign In for Users */}
          {role === 'USER' && (
            <div className="mb-6">
              <button
                 onClick={() => signIn('google')}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-slate-200 rounded-lg hover:bg-slate-50 transition-colors font-medium text-slate-700"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-slate-500">Or with your email</span>
                </div>
              </div>
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-5">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full pl-11 pr-4 py-3 border rounded-lg transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-slate-300'
                  }`}
                  placeholder="Your full name"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-11 pr-4 py-3 border rounded-lg transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-slate-300'
                  }`}
                  placeholder="your.email@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-11 pr-11 py-3 border rounded-lg transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.password ? 'border-red-500' : 'border-slate-300'
                  }`}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password Strength */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded ${
                          level <= passwordStrength
                            ? passwordStrength <= 2
                              ? 'bg-red-500'
                              : passwordStrength <= 3
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                            : 'bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs ${getPasswordStrengthText().color}`}>
                    Strength: {getPasswordStrengthText().text}
                  </p>
                </div>
              )}
              
              {errors.password && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-11 pr-11 py-3 border rounded-lg transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.confirmPassword ? 'border-red-500' : 'border-slate-300'
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <p className="mt-1 text-sm text-green-500 flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  Passwords match
                </p>
              )}
              
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full mt-8 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <User className="w-5 h-5" />
            )}
            {isSubmitting ? 'Creating...' : 'Create My Account'}
          </button>

          {/* Login Link */}
          <p className="text-center mt-6 text-slate-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;