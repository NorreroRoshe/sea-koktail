import cn from 'classnames';
import cls from './feedbackPhone.module.scss';
import { useModalAction } from '../../common/modal/modal.context';
import Link from 'next/link';
import { ReturnForm } from './feedbackPhoneReturnForm/PhoneReturnForm';
import phonehov from '@/assets/img/contactIcon/Group134.svg'
import message from '@/assets/img/contactIcon/Group3.svg'
import video from '@/assets/img/contactIcon/Group2.svg'

export interface LoginFormProps {
  isPopup?: boolean;
  className?: string;
}


const FeedbackPhone: React.FC<LoginFormProps> = ({ isPopup = true, className }) => {

  const { closeModal, openModal } = useModalAction();

  function handleFeedbackMessage() {
    return openModal('FEEDBACK_MESSAGE');
  }

  function handleFeedbackVideo() {
    return openModal('FEEDBACK_VIDEO');
  }


  return (
    <div className={cn('w-full relative', className)} style={{ maxWidth: '425px' }}>
      <div className="flex bg-skin-fill mx-auto rounded-lg overflow-hidden">
        <div className="w-full rounded-md shadow-dropDown flex flex-col justify-center" style={{ padding: '30px', paddingBottom: '55px' }}>
          <div className={cls.feedback_container}>
            <div className={cls.feedback_tubs}>
              <div>
                <div className={cls.feedback_tubs_iconsWrapper}>
                  <div className={cls.iconsWrapper_itemIcon}><img src={phonehov.src} alt="" /></div>
                  <div onClick={handleFeedbackMessage} className={cls.iconsWrapper_itemIcon}><img src={message.src} alt="" /></div>
                  {/* <div onClick={handleFeedbackVideo} className={cls.iconsWrapper_itemIcon}><img src={video.src} alt="" /></div> */}
                </div>
              </div>
              {isPopup === true && <div className={cls.feedback_tubs_close} onClick={closeModal}>
                <svg className="ui-9F9ST" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.00045 24L24 0.999999M23.9995 24L0.999999 1" stroke="currentColor" stroke-miterlimit="10"></path>
                </svg>
              </div>}
            </div>
            <div
              className={cls.feedback_formo}>
              <div className={cls.formo_title}>Закажите обратный звонок</div>
              <ReturnForm />
              <div className={cls.politic_container}>
                *При отправке заявки, я соглашаюсь с условиями &nbsp;
                <a target="_blank" className={cls.politic_container_link} href="/static-page/privacy-policy">
                  Политики конфиденциальности
                </a>
                &nbsp; и даю согласие на обработку персональных данных на их основе
              </div>
              <div className={cls.callme_container}>Вы можете сэкономить время, позвонив нам прямо сейчас:</div>
              <div className={cls.phnumber_container}>
                <div className={cls.phnumber_container_wrapp}>
                  <Link className={cls.phnumber_container_wrapp_phone} href="tel:+79151777765">
                    +7 (915) 177-77-65
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPhone;
