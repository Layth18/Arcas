import React, { useState } from 'react';
import { Check } from 'lucide-react';
import Personal from '../Components/Signup/Personal';
import Farms from '../Components/Signup/Farms';
import Summary from '../Components/Signup/Summary';
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    experienceLevel: '',
    password: '',
    confirmPassword: '',
    farms: []
  });

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = (additionalData: any) => {
    const finalData = {
      ...formData,
      ...additionalData
    };
    alert('Account created successfully! 🌸');
    console.log('Form submitted:', finalData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFD166] via-[#F6F2E7] to-[#E6E1DB] py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#3B2F2F] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Signing Up
          </h1>
          <p className="text-[#3B2F2F] text-sm opacity-80">Welcome to our family</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                    step >= s ? 'bg-[#F29E4C] text-white' : 'bg-[#E6E1DB] text-[#3B2F2F]'
                  }`}>
                    {step > s ? <Check className="w-5 h-5" /> : s}
                  </div>
                  <span className="text-xs mt-1 text-[#3B2F2F] font-medium">
                    {s === 1 ? 'Personal' : s === 2 ? 'Farms' : 'Verify'}
                  </span>
                </div>
                {s < 3 && (
                  <div className={`flex-1 h-1 mx-2 rounded transition-all duration-300 ${
                    step > s ? 'bg-[#F29E4C]' : 'bg-[#E6E1DB]'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-80%">

          {step === 1 && (
            <Personal 
              formData={formData} 
              setFormData={setFormData} 
              onNext={handleNext} 
            />
          )}

          {step === 2 && (
            <Farms 
              formData={formData} 
              setFormData={setFormData} 
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {step === 3 && (
            <Summary 
              formData={formData} 
              onBack={handleBack}
              onSubmit={handleSubmit}
            />
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-[#3B2F2F] opacity-60 mt-6">
          Already have an account? <button onClick={() => navigate("/")} className="text-[#F29E4C] font-semibold hover:underline">Sign In</button>
        </p>
      </div>
    </div>
  );
};

export default Signup;