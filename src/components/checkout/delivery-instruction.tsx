'use client'
import React, { useEffect } from 'react';
import TextArea from '@/components/ui/form/text-area';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { observer } from 'mobx-react';
import { useStore } from '@/hooks/useStore'; // Assuming you have a custom hook to access the store
import debounce from 'lodash.debounce'; // Import debounce from lodash

interface ContactFormValues {
  instructionNote: string;
  default: boolean;
}

const DeliveryInstructions: React.FC<{ data?: any }> = observer(({ data }) => {
  const { t } = useTranslation();
  const store = useStore(); // Access your store
  const userStore = store.auth;

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<ContactFormValues>({
    defaultValues: {
      instructionNote: data || '',
      default: data || false,
    },
  });

  // Watch the instructionNote field for changes
  const instructionNote = watch('instructionNote');

  // Define the debounced function
  const debouncedSetDescription = React.useMemo(
    () => debounce((note: string) => {
      userStore.setDescription(note);
      console.log(userStore.description, 'Delivery Note');
    }, 500), [userStore]
  );

  useEffect(() => {
    debouncedSetDescription(instructionNote);
    // Cleanup function to cancel debounce on component unmount
    return () => {
      debouncedSetDescription.cancel();
    };
  }, [instructionNote, debouncedSetDescription]);

  return (
    <div className="w-full">
      <div className="w-full mx-auto">
        <form noValidate>
          <div className="mb-6">
            <TextArea
              variant="normal"
              inputClassName="focus:border-2 focus:outline-none focus:border-skin-primary"
              label="Введите свой комментарий "
              {...register('instructionNote')}
            />
          </div>
          {/* Uncomment if you want to include a submit button */}
          {/* <div className="text-end">
            <Button 
              type="submit"
              variant="formButton"
              className="bg-skin-primary text-skin-inverted rounded font-semibold font-[14px] px-4 py-3 "
            >
              {t('Сохранить комментарий')}
            </Button>
          </div> */}
        </form>
      </div>
    </div>
  );
});

export default DeliveryInstructions;
