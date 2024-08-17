'use client'
import { useAddressQuery } from '@/framework/basic-rest/address/address';
import AddressSamovivozGrid from '@/components/address/address-samovivoz-grid';
import {observer} from "mobx-react";
 
const AddressSamovivoz: React.FC = observer(() => {
  let { data, isLoading } = useAddressQuery();
  return !isLoading ? (
    <AddressSamovivozGrid address={data?.data} />
  ) : (
    <div>Loading...</div>
  );
});

export default AddressSamovivoz;