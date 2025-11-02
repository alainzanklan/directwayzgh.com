import { Collapse } from 'react-collapse';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const Faq = ({ open, toggle, title, desc }) => {
  return (
    <div className='pt-2'>
      <div
        className='bg-white py-6 px-12 flex justify-between items-center cursor-pointer'
        onClick={toggle}
      >
        <p className='text-[22px] text-slate-700 font-semibold'>{title}</p>
        <div className='text-[30px]'>
          {open ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </div>
      </div>
      <Collapse isOpened={open}>
        <div className='bg-white px-[50px] text-slate-700 pb-[20px]'>
          {desc}
        </div>
      </Collapse>
    </div>
  );
};

export default Faq;
