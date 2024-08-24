"use client"
import { Table } from '@/components/ui/table';
import Input from '@/components/ui/form/input';
import { useState } from 'react';
import Pagination from '@/components/ui/pagination';
import ActionsButton from '@/components/ui/action-button';
import { TotalPrice } from '@/components/order/price';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { BsSearch } from 'react-icons/bs';
import {observer} from "mobx-react";
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export const CreatedAt: React.FC<{ createdAt?: any }> = observer(({ createdAt }) => {
  dayjs.extend(relativeTime);
  dayjs.extend(utc);
  dayjs.extend(timezone);
  return (
    <span className="whitespace-nowrap">
      {dayjs.utc(createdAt).tz(dayjs.tz.guess()).fromNow()}
    </span>
  );
});

export const Status: React.FC<{ item?: any }> = observer(({ item }) => {
  return (
    <span className={item?.status?.name?.replace(/\s/g, '_').toLowerCase()}>
      <span
        className="bullet"
        style={{ backgroundColor: item?.status?.color }}
      />
      {item?.status?.name}
    </span>
  );
});


export const formatDate = (dateString: any) => {
  if (!dateString) {
    return "Неизвестная дата"; // Можете вернуть значение по умолчанию или пустую строку
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Неверная дата"; // На случай, если дата не может быть распознана
  }

  return format(date, "d MMMM yyyy", { locale: ru });
}

const columns = [
  {
    title: 'Номер заказа',
    dataIndex: 'id',
    key: 'id',
    className: 'id-cell',
  },
  {
    title: 'Дата',
    dataIndex: 'created_at',
    key: 'created_at',
    render: function createdAt(items: any) {
      return <CreatedAt createdAt={items} />;
    },
    // render: (created_at: any) => {
    //   return formatDate(created_at);
    // },
  },
  // {
  //   title: 'Статус',
  //   key: 'status',
  //   render: function status(item: any) {
  //     return <Status item={item} />;
  //   },
  // },
  {
    title: 'Дата доставки',
    dataIndex: 'updated_at',
    key: 'updated_at',
    render: (updated_at: any) => {
      return formatDate(updated_at);
    },
  },
  {
    title: 'Цена',
    key: 'total',
    render: function totalPrice(items: any) {
      return <TotalPrice items={items} />;
    },
  },
  {
    dataIndex: '',
    key: 'operations',
    render: function actionsButton(item: any) {
      return <ActionsButton item={item} />;
    },
    className: 'operations-cell',
  },
];

const OrderTable: React.FC<{ orders?: any }> = observer(({ orders }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [value, setValue] = useState('');
  const countPerPage = 5;
  
  let reversedOrders = orders ? [...orders].reverse() : [];

  let [filterData, setDataValue] = useState(reversedOrders?.slice(0, countPerPage));



  const updatePage = (p: any) => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setDataValue(orders.slice(from, to));
  };

  // const onChangeSearch = (e: any) => {
  //   setCurrentPage(1);
  //   let filter: any = orders
  //     .filter((item: any) =>
  //     toString(item.id)
  //     // item.tracking_number
  //     .toLowerCase()
  //         .includes(e.target.value.toLowerCase())
  //     )
  //     .slice(0, countPerPage);
  //   setValue(e.target.value);
  //   if (!e.target.value) {
  //     updatePage(1);
  //   }
  //   setDataValue(filter);
  // };

  const onSubmitHandle = (e: any) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="md:flex md:justify-between items-center mb-5 sm:mb-10">
        <h2 className="font-semibold text-sm md:text-xl text-skin-base mb-4 md:mb-0">
          Список моих заказов
        </h2>
        {/* <form onSubmit={onSubmitHandle} className="relative">
          <span className="absolute end-3 top-[80%] transform -translate-y-1/2 order-icon-color">
            <BsSearch size={19} />
          </span>
          <Input
            name="search"
            type="search"
            value={value}
            onChange={onChangeSearch}
            placeholder="Поиск по номеру заказа"
            inputClassName=" h-[46px] w-full placeholder-[rgba(0, 0, 0, .3)] bg-white border border-[#E3E8EC] rounded-md order-search focus:border-2 focus:outline-none focus:border-skin-primary"
          />
        </form> */}
      </div>
      <div className="order-list-table-wraper">
        <Table
          className="order-list-table"
          columns={columns}
          data={filterData}
          rowKey="id"
        />
      </div>
      {!value.trim() && (
        <div className="text-end mt-5">
          <Pagination
            current={currentPage}
            onChange={updatePage}
            pageSize={countPerPage}
            total={orders?.length}
            prevIcon={<GrPrevious size={12} style={{ color: '#090B17' }} />}
            nextIcon={<GrNext size={12} style={{ color: '#090B17' }} />}
            className="order-table-pagination"
          />
        </div>
      )}
    </>
  );
});

export default OrderTable;
