import { useState } from 'react';
import axios from 'axios';

function ClaimCoupon() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClaimCoupon = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/coupon/claim-coupon`,
        null,
        {
          withCredentials: true,
        },
      );
      setMessage(response.data.message);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
      console.log(import.meta.env.VITE_API_URL);
      
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full sm:w-96">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Claim Your Coupon!
        </h1>
        <p className="text-center text-gray-600 mb-4">
          Click the button below to claim your coupon. Only one claim per hour!
        </p>

        <button
          onClick={handleClaimCoupon}
          className="w-full py-3 bg-indigo-600 text-gray rounded-lg hover:bg-indigo-700 transition duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-300"
          disabled={loading}
        >
          {loading ? 'Claiming...' : 'Claim Coupon'}
        </button>

        {message && (
          <div
            className={`mt-4 text-center text-lg ${message.startsWith('Congratulations!') ? 'text-green-500' : 'text-red-500'}`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default ClaimCoupon;
