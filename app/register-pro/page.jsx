import RegisterForm from '@/components/RegisterForm';
import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/utils/authOptions';

async function Register() {
  const session = await getServerSession(authOptions);

  if (session) redirect('/');

  return <RegisterForm role='PRO' />;
}

export default Register;
