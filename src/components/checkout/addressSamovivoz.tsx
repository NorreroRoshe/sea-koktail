import { useAddressQuery } from '@/framework/basic-rest/address/address';
import AddressSamovivozGrid from '@/components/address/address-samovivoz-grid';

const AddressSamovivoz: React.FC = () => {
  let { data, isLoading } = useAddressQuery();
  return !isLoading ? (
    <AddressSamovivozGrid address={data?.data} />
  ) : (
    <div>Loading...</div>
  );
};

export default AddressSamovivoz;