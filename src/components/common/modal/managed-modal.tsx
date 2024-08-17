'use client'
import Modal from '@/components/common/modal/modal';
import dynamic from 'next/dynamic';
import {
  useModalAction,
  useModalState,
} from '@/components/common/modal/modal.context';
const LoginForm = dynamic(() => import('@/components/auth/login-form'));
const FeedbackPhone = dynamic(() => import('@/components/feedback/feedbackPhone/feedbackPhone'));
const FeedbackMessage = dynamic(() => import('@/components/feedback/feedbackMessage/feedbackMessage'));
const FeedbackVideo = dynamic(() => import('@/components/feedback/feedbackVideo/feedbackVideo'));
const ThxMod = dynamic(() => import('@/components/feedback/ThxMod/ThxMod'));
const AfterLoginForm = dynamic(() => import('@/components/auth/after-login-form'));
const SignUpForm = dynamic(() => import('@/components/auth/sign-up-form'));
const PasswordReset = dynamic(() => import('@/components/auth/password-reset'));
const ForgetPasswordForm = dynamic(
  () => import('@/components/auth/forget-password-form')
);
const EmailConfirmForm = dynamic(
  () => import('@/components/auth/email-confirm')
);
const SuccessChangePassword = dynamic(
  () => import('@/components/auth/success-change-password')
);
const PrePopup = dynamic(() => import('@/components/product/pre-popup'));
const DishPrePopup = dynamic(() => import('@/components/product/dish-pre-popup'));

const AddressPopup = dynamic(
  () => import('@/components/common/form/add-address')
);
const EditAddressForm = dynamic(
  () => import('@/components/common/form/edit-address')
);
const PaymentPopup = dynamic(
  () => import('@/components/common/form/add-payment')
);
const PhoneNumberPopup = dynamic(
  () => import('@/components/common/form/add-contact')
);
const PhoneNumberEditPopup = dynamic(
  () => import('@/components/common/form/edit-contact')
);
const DeliveryAddresses = dynamic(
  () => import('@/components/address/delivery-addresses')
);


const ManagedModal: React.FC = () => {
  const { isOpen, view } = useModalState();
  const { closeModal } = useModalAction();

  // if (view === 'CATEGORY_VIEW') {
  //   return (
  //     <Modal open={isOpen} onClose={closeModal} variant="bottom">
  //       {view === 'CATEGORY_VIEW' && <CategoryPopup />}
  //     </Modal>
  //   );
  // }
  return (
    <Modal open={isOpen} onClose={closeModal}>
      {view === 'LOGIN_VIEW' && <LoginForm />}
      {view === 'FEEDBACK_PHONE' && <FeedbackPhone />}
      {view === 'FEEDBACK_MESSAGE' && <FeedbackMessage />}
      {view === 'FEEDBACK_VIDEO' && <FeedbackVideo />}
      {view === 'AFTER_LOGIN_VIEW' && <AfterLoginForm />}
      {view === 'SIGN_UP_VIEW' && <SignUpForm />}
      {view === 'FORGET_PASSWORD' && <ForgetPasswordForm />}
      {view === 'PASSWORD_RESET' && <PasswordReset />}
      {view === 'EMAIL_CONFIRM' && <EmailConfirmForm />}
      {view === 'SUCCESS_CHANGE_PASSWORD' && <SuccessChangePassword />}
      {view === 'PRODUCT_VIEW' && <PrePopup />}
      {view === 'DISHES_VIEW' && <DishPrePopup />}
      {view === 'THX_MOD' && <ThxMod />}

      {view === 'ADDRESS_VIEW_AND_EDIT' && <AddressPopup />}
      {view === 'ADDRESS_EDIT' && <EditAddressForm />}
      {view === 'PAYMENT' && <PaymentPopup />}
      {view === 'PHONE_NUMBER' && <PhoneNumberPopup />}
      {view === 'PHONE_NUMBER_EDIT' && <PhoneNumberEditPopup />}
      {view === 'DELIVERY_VIEW' && <DeliveryAddresses />}
    </Modal>
  );
};

export default ManagedModal;
