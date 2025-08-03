import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OTP = () => {
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/v1/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email,  verificationCode: otp }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('OTP verified successfully!');
        navigate('/'); // or wherever
      } else {
        alert(data.message || 'OTP verification failed');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      alert('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-teal-700 mb-6 text-center">Enter OTP</h2>

        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTP;
