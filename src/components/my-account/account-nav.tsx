import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLogoutMutation } from '@/framework/basic-rest/auth/use-logout';
import { useTranslation } from 'next-i18next';
import LogoutIcon from '@/components/iconsCode/account-logout';

type Option = {
  name: string;
  slug: string;
  icon?: JSX.Element;
};

export default function AccountNav({ options }: { options: Option[] }) {
  
  const { t } = useTranslation('common');
  const { mutate: logout } = useLogoutMutation();
  const pathname = usePathname();
  const newPathname = pathname.split('/').slice(2, 3);
  const mainPath = `/${newPathname[0]}`;

  return (
    <nav className="flex flex-col pb-2 md:pb-6 border border-skin-base rounded-md overflow-hidden">
      {options.map((item) => {
        const menuPathname = item.slug.split('/').slice(2, 3);
        const menuPath = `/${menuPathname[0]}`;

        return (
          <Link key={item.slug} href={item.slug}>
            <span
              className={`flex items-center cursor-pointer text-sm lg:text-15px text-skin-base py-3.5 px-3.5 xl:px-4 2xl:px-5 mb-1 ${mainPath === menuPath
                ? 'bg-skin-two font-extrabold'
                : 'font-normal'
                }`}
            >
              <span className="w-9 xl:w-10 flex-shrink-0 flex justify-center">
                {item.icon}
              </span>
              <span className="ps-1.5">{t(item.name)}</span>
            </span>
          </Link>
        );
      })}
      <button
        className="flex items-center text-sm lg:text-15px text-skin-base py-3.5 px-3.5 xl:px-4 2xl:px-5 mb-1 cursor-pointer focus:outline-none"
        onClick={() => logout()}
      >
        <span className="w-9 xl:w-10 flex-shrink-0 flex justify-center">
          <LogoutIcon className="w-5 md:w-[22px] h-5 md:h-[22px]" />
        </span>
        <span className="ps-1.5">{t('Выйти с аккаунта')}</span>
      </button>
    </nav>
  );
}
