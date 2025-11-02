import ResetPasswordForm from '@/components/ResetPasswordForm';
import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

async function ResetPassword() {
  const session = getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  return <ResetPasswordForm />;
}
export default ResetPassword;
