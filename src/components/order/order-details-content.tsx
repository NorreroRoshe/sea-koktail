"use client"
import usePrice from '@/framework/basic-rest/product/use-price';
import Image from '@/components/ui/image';

export const OrderDetailsContent: React.FC<{ item?: any }> = ({ item }) => {


  const { price } = usePrice({
    amount: Number(item?.cost),
    currencyCode: 'RUB',
  });

  console.log(price,'itemOrderByIdProduct')


  return (
    <div className="relative grid grid-cols-12 py-2 pb-0 border-b border-solid border-skin-base text-[12px] md:text-[14px]">
      <div className="col-span-2 self-center">
      {item.image &&
        <img
          src={`https://api.morskoi-koktail.ru${item.image}`}
          alt={item?.name || 'Product Image'}
          width="60"
          height="60"
          // quality={100}
          className="object-cover"
        />
      }
      </div>
      <div className="col-span-5 self-center">
        <h2 className="text-skin-base" style={{fontSize: '14px', marginLeft: '5px'}}>{item?.name}</h2>
      </div>
      <div className="col-span-3 self-center md:text-start text-center">
        {/* {typeof item?.quantity === 'number' && <p>{item?.quantity}x</p>} */}
        <p className="text-center">{item?.count}
        {/* x */}
        </p>
      </div>
      <div className="col-span-2 self-center">
        <p>{price}</p>
      </div>
    </div>
  );
};
