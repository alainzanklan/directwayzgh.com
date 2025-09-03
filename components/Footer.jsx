import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/images/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='bg-indigo-900 py-4 mt-24'>
      <div className='md:hidden container mx-auto flex flex-col md:flex-row  justify-between px-4'>
        <div className=' flex mb-4 md:mb-0 px-2 justify-center items-center'>
          <Image src={logo} alt='Logo' className='h-8 w-auto' />
        </div>
        <div className='text-indigo-50 flex flex-wrap justify-start mb-4 md:mb-0 px-2'>
          <div className='grid grid-cols-3 gap-8 '>
            <div className='col-span-1 '>
              <ul className='space-y-4 justify-items-start flex flex-col md:flex-row '>
                <li>
                  <Link href='/register-pro'>Become a Pro</Link>
                </li>
                <li>
                  <Link href='/faq'>FAQ</Link>
                </li>
              </ul>
            </div>
            <div className='col-span-1 place-items-center'>
              <ul className='space-y-4 flex flex-col md:flex-row '>
                <li>
                  <Link href='/terms'>Terms</Link>
                </li>
                <li>
                  <Link href='/privacy'>Privacy</Link>
                </li>
              </ul>
            </div>
            <div className='col-span-1 place-items-end'>
              <ul className='space-y-4 flex flex-col md:flex-row'>
                <li>
                  <Link href='/about-us'>About us</Link>
                </li>
                <li>
                  <Link href='/contact'>Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='flex justify-center items-center'>
          <p className='text-sm text-indigo-50 mt-2 flex justify-center items-center'>
            &copy; {currentYear} DirectWayz GH. All rights reserved.
          </p>
        </div>
      </div>

      <div className='hidden md:flex text-indigo-50 container mx-auto  flex-col md:flex-row items-center justify-between px-4'>
        <div className='mb-4 md:mb-0 px-2'>
          <Image src={logo} alt='Logo' className='h-8 w-auto' />
        </div>
        <div className='flex flex-wrap justify-center md:justify-start mb-4 md:mb-0 px-2'>
          <ul className='flex space-x-4'>
            <li>
              <Link href='/register-pro'> Become a Pro</Link>
            </li>
            <li>
              <Link href='/professionals'>FAQ</Link>
            </li>
            <li>
              <Link href='/terms'>Terms</Link>
            </li>
            <li>
              <Link href='/privacy'>Privacy</Link>
            </li>
            <li>
              <Link href='/about-us'>About us</Link>
            </li>
            <li>
              <Link href='/contact'>Contact Us</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className='text-sm mt-2 md:mt-0'>
            &copy; {currentYear} DirectWayz GH. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
