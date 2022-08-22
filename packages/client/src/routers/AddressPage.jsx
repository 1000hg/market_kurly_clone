import React from 'react';
import DaumPostcode from 'react-daum-postcode';
import { useNavigate } from 'react-router-dom';

const AddressPage = (props) => {
  const navigate = useNavigate();
  const handleResult = (e) => {
    const address = e.address + ' (' + e.buildingName + ')';
    console.log(address);
    navigate('/address/shipping-address/result', { state: address });
  };
  return (
    <div>
      <DaumPostcode
        onComplete={handleResult}
        style={{ width: '100%', height: '100vh' }}
      />
    </div>
  );
};

export default AddressPage;
