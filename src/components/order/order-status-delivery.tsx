"use client"
import ProgressBox from './progress-box';

interface Props {
  status: number;
}

const data = {
  data: [
    {
        "id": 1,
        "name": "Оплчен",
        "serial": 1,
        "color": "#02B290",
        "created_at": "Thu Jun 17 2021 22:12:50 GMT+0600",
        "updated_at": "Thu Jun 17 2021 22:12:35 GMT+0600"
    },
    {
        "id": 2,
        "name": "В работе",
        "serial": 2,
        "color": "#02B290",
        "created_at": "Thu Jun 17 2021 22:12:50 GMT+0600",
        "updated_at": "Thu Jun 17 2021 22:12:35 GMT+0600"
    },
    {
        "id": 3,
        "name": "Передан на доставку",
        "serial": 3,
        "color": "#FED030",
        "created_at": "Thu Jun 17 2021 22:12:50 GMT+0600",
        "updated_at": "Thu Jun 17 2021 22:12:35 GMT+0600"
    },
    {
        "id": 4,
        "name": "Доставлен",
        "serial": 4,
        "color": "#02B290",
        "created_at": "Thu Jun 17 2021 22:12:50 GMT+0600",
        "updated_at": "Thu Jun 17 2021 22:12:35 GMT+0600"
    }
  ]
}

const OrderStatusDelivery = ({ status }: Props) => {

  const normalizedStatus = status === 9 ? 3 : status;

  return (
    <ProgressBox data={data} status={normalizedStatus} />
  );
};

export default OrderStatusDelivery;