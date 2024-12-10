"use client"
import React from 'react';
import cls from './Contacts.module.scss';
import Breadcrumb from '@/components/ui/breadcrumb';

const Contacts: React.FC = () => {
  return (
    <section className={cls.section_constact}>
      <div className={`${cls.contacts_container} ${cls.container}`}>
        <Breadcrumb />
        <h2 className={cls.constact_header}>Контакты</h2>
        <div className={cls.contact_online}>
          <div className={cls.online_timeline}>
            <h3 className={cls.timeline_header}>Режим работы сайта:</h3>
            <p className={cls.timeline_time}>09:00 до 21:00</p>
          </div>
          <div className={cls.online_timeline}>
            <h3 className={cls.timeline_header}>Ардес магазина:</h3>
            <p className={cls.timeline_time}>Москва, ул. Большая Филевская дом 3, корп. 2</p>
          </div>
          <div className={cls.online_timeline}>
            <h3 className={cls.timeline_header}>Режим работы магазина:</h3>
            <p className={cls.timeline_time}>09:00 до 21:00</p>
          </div>
          <div className={cls.online_connection}>
            <h3 className={cls.connection_header}>Связаться с нами:</h3>
            <div className={cls.connection_tel}>
              <a href="tel:+79151777765" className={cls.connection_tel_number}>
                +7(915)-177-77-65
              </a>
            </div>
            <div className={cls.connection_mail}>
              <div className={cls.connection_mail_client}>
                <a href="" className={cls.mail_client_telink}>
                  info@morskoi-koktail.ru
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={`${cls.requisite} ${cls.mrb3015}`}>
          <h4 className={`${cls.requisite__title} ${cls.mrreset} ${cls.tac} ${cls.mrb3015}`}>
            Реквизиты
          </h4>
          <div className={`${cls.requisite__items} ${cls.df} ${cls.wrap}`}>
            {/* First Company */}
            <div className={cls.requisite__item}>
              <p className={`${cls.requisite__itemComp} ${cls.requisite__itemText} ${cls.mrreset} ${cls.tac}`}>
                Организация:
                <strong className={`${cls.requisite__itemTextAccent} ${cls.requisite__item_text}`}>ИП Давыдкин Александр Иванович</strong>
              </p>
              <p className={`${cls.requisite__itemComp} ${cls.requisite__itemText} ${cls.mrreset} ${cls.tac}`}>
                Магазин-ресторан:
                <strong className={`${cls.requisite__itemTextAccent} ${cls.requisite__item_text}`}>МОРСКОЙ КОКТЕЙЛЬ</strong>
              </p>
              <p className={`${cls.requisite__itemText} ${cls.requisite__itemAddress} ${cls.requisite__itemAddressLegal} ${cls.mrreset}`}>
                Юридический адрес:
                <span className={`${cls.requisite__itemTextAccent}`}>123290, г. Москва, Шмитовский проезд, д. 39, корпус 3, кв. 103</span>
              </p>
              {/* <p className={`${cls.requisite__itemText} ${cls.requisite__itemAddress} ${cls.requisite__itemAddressActual} ${cls.mrreset}`}>
                Почтовый адрес:
                <span className={`${cls.requisite__itemTextAccent}`}>143362, г. Московская область, г. Апрелевка, ул. Ясаня , д. 3</span>
              </p> */}

              <p className={`${cls.requisite__itemText} ${cls.requisite__itemAddress} ${cls.requisite__itemAddressActual} ${cls.mrreset}`}>
                ИНН:
                <span className={`${cls.requisite__itemTextAccent}`}>770304491900</span>
              </p>
              {/* <p className={`${cls.requisite__itemText} ${cls.requisite__itemAddress} ${cls.requisite__itemAddressActual} ${cls.mrreset}`}>
                КПП:
                <span className={`${cls.requisite__itemTextAccent}`}>507401001</span>
              </p> */}
              <p className={`${cls.requisite__itemText} ${cls.requisite__itemAddress} ${cls.requisite__itemAddressActual} ${cls.mrreset}`}>
                ОГРН:
                <span className={`${cls.requisite__itemTextAccent}`}>317774600406814</span>
              </p>
              <p className={`${cls.requisite__itemText} ${cls.requisite__itemAddress} ${cls.requisite__itemAddressActual} ${cls.mrreset}`}>
                Расчетный счет:
                <span className={`${cls.requisite__itemTextAccent}`}>40802810438000445985</span>
              </p>
              <p className={`${cls.requisite__itemText} ${cls.requisite__itemAddress} ${cls.requisite__itemAddressActual} ${cls.mrreset}`}>
                Банк:
                <span className={`${cls.requisite__itemTextAccent}`}>ПАО Сбербанк</span>
              </p>
              <p className={`${cls.requisite__itemText} ${cls.requisite__itemAddress} ${cls.requisite__itemAddressActual} ${cls.mrreset}`}>
                БИК:
                <span className={`${cls.requisite__itemTextAccent}`}>044525225</span>
              </p>
              <p className={`${cls.requisite__itemText} ${cls.requisite__itemAddress} ${cls.requisite__itemAddressActual} ${cls.mrreset}`}>
                К/сч:
                <span className={`${cls.requisite__itemTextAccent}`}>30101810400000000225</span>
              </p>
              {/* Add other details for the first company */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
