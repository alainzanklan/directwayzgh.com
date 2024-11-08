import { Inter } from 'next/font/google';
import NavBar from '@/components/NavBar';
import '@/assets/styles/globals.css';
import AuthProvider from '@/components/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Directwayz GH | Where Professionals Meet Needs',
  description: 'Find the right and trusted professional in Ghana',
  keywords: 'Professional, find professionals, find jobs, jobs, ',
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang='en'>
        <body>
          <NavBar />
          <main>{children}</main>
          <ToastContainer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;