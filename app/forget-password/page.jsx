import ForgetPasswordForm from '@/components/ForgetPasswordForm';
import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

async function ForgetPassword() {
  const session = await getServerSession(authOptions);

  if (session) redirect('/');

  return <ForgetPasswordForm />;
}
export default ForgetPassword;
