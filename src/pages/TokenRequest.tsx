
import { Navigation } from '@/components/Navigation';
import { TokenRequestForm } from '@/components/TokenRequestForm';

const TokenRequest = () => {
  return (
    <>
      <Navigation />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Request a Token</h1>
        <TokenRequestForm />
      </div>
    </>
  );
};

export default TokenRequest;
