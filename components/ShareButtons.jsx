import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
  WhatsappIcon,
} from 'react-share';

const ShareButtons = ({ pro }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/professionals/${pro._id}`;
  return (
    <>
      <h3 className='text-gray-900 text-xl font-bold text-center mb-4'>
        {' '}
        Share This Pro
      </h3>
      <div className='flex gap-4 pb-5 mt-4 justify-center '>
        <FacebookShareButton
          url={shareUrl}
          quote={pro.name}
          hashtag={`#${pro.type}`}
        >
          <FacebookIcon size={40} round={true} color='gray' />
        </FacebookShareButton>

        <TwitterShareButton
          url={shareUrl}
          title={pro.company_info.name}
          hashtag={`#${pro.type}`}
        >
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>

        <WhatsappShareButton
          url={shareUrl}
          title={pro.company_info.name}
          separator=':: '
        >
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>
        <EmailShareButton url={shareUrl} subject={pro.company_info.name}>
          <EmailIcon size={40} round={true} />
        </EmailShareButton>
      </div>
    </>
  );
};

export default ShareButtons;
