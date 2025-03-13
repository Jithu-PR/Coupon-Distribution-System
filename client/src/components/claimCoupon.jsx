import { useState } from 'react';
import axios from 'axios';

function ClaimCoupon() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClaimCoupon = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('/claim-coupon');
      if (response.status === 200) {
        const couponMessage = await response.text();
        setMessage(couponMessage);
      } else {
        const errorMessage = await response.text();
        setMessage(errorMessage);
      }
    } catch (error) {
      setMessage('Something went wrong, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full sm:w-96">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Claim Your Coupon!</h1>
        <p className="text-center text-gray-600 mb-4">Click the button below to claim your coupon. Only one claim per hour!</p>

        <button
          onClick={handleClaimCoupon}
          className="w-full py-3 bg-indigo-600 text-gray rounded-lg hover:bg-indigo-700 transition duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-300"
          disabled={loading}
        >
          {loading ? 'Claiming...' : 'Claim Coupon'}
        </button>

        {message && (
          <div className={`mt-4 text-center text-lg ${message.startsWith('You') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClaimCoupon;
