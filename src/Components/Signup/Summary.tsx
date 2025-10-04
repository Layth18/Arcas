import React, { useState } from 'react';
import { Check, ChevronLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom";

interface Farm {
  farmName: string;
  location?: string;
  surfaceArea?: string;
  cropType?: string;
}

interface SummaryProps {
  formData: {
    username: string;
    email: string;
    experienceLevel: string;
    farms?: Farm[];
    // add other fields as needed
  };
  onBack: () => void;
  onSubmit: (data: { verificationCode: string; agreedToTerms: boolean }) => void;
}

type Errors = {
  terms?: string;
  verification?: string;
};

const Summary: React.FC<SummaryProps> = ({ formData, onBack, onSubmit }) => {
  const navigate = useNavigate(); // ✅ move inside the component
  const [errors, setErrors] = useState<Errors>({});
  const [verificationSent, setVerificationSent] = useState(false);
  const [localVerificationCode, setLocalVerificationCode] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const farms = formData.farms || [];

  const validate = () => {
    const newErrors: Errors = {};
    if (!agreedToTerms) newErrors.terms = 'You must agree to the terms and conditions';
    if (!localVerificationCode || localVerificationCode.length !== 6)
      newErrors.verification = 'Please enter the 6-digit verification code';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendVerification = () => {
    setVerificationSent(true);
    setTimeout(() => alert('Verification code sent to ' + formData.email), 500);
  };

  const handleCreateAccount = () => {
    if (!validate()) return;
    onSubmit({ verificationCode: localVerificationCode, agreedToTerms });
    navigate("/"); // redirect to landing after successful submission
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#3B2F2F] mb-6">Review & Verify</h2>

      {/* Summary */}
      <div className="bg-[#F6F2E7] rounded-lg p-4 space-y-3">
        <div>
          <p className="text-xs text-[#3B2F2F] opacity-60 font-medium">USERNAME & EMAIL</p>
          <p className="text-[#3B2F2F] font-semibold">{formData.username} • {formData.email}</p>
        </div>
        <div>
          <p className="text-xs text-[#3B2F2F] opacity-60 font-medium">EXPERIENCE LEVEL</p>
          <p className="text-[#3B2F2F] font-semibold capitalize">
            {formData.experienceLevel === 'new' ? 'New Farmer' : 'Experienced Farmer'}
          </p>
        </div>
        <div>
          <p className="text-xs text-[#3B2F2F] opacity-60 font-medium">FARMS</p>
          <p className="text-[#3B2F2F] font-semibold">
            {farms.length === 0 ? 'No farms added' : `${farms.length} farm${farms.length > 1 ? 's' : ''} registered`}
          </p>
        </div>
        {farms.length > 0 && (
          <div className="pt-2 border-t border-[#E6E1DB] space-y-2">
            {farms.map((farm, index) => (
              <div key={index} className="text-sm">
                <p className="text-[#3B2F2F] font-medium">
                  {index + 1}. {farm.farmName} 
                  {farm.location && ` • ${farm.location}`}
                  {farm.surfaceArea && ` • ${farm.surfaceArea}`}
                </p>
                {farm.cropType && (
                  <p className="text-[#3B2F2F] opacity-70 text-xs ml-4">Crops: {farm.cropType}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Email Verification */}
      <div>
        <label className="block text-sm font-medium text-[#3B2F2F] mb-2">
          Email Verification Code
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={localVerificationCode}
            onChange={(e) => {
              setLocalVerificationCode(e.target.value);
              if (errors.verification) setErrors(prev => ({ ...prev, verification: '' }));
            }}
            maxLength={6}
            className={`flex-1 px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none focus:border-[#F29E4C] text-center text-lg font-semibold tracking-widest ${
              errors.verification ? 'border-red-400' : 'border-[#E6E1DB]'
            }`}
            placeholder="000000"
          />
          <button
            type="button"
            onClick={handleSendVerification}
            disabled={verificationSent}
            className={`px-4 py-3 rounded-lg font-semibold transition-colors ${
              verificationSent
                ? 'bg-green-500 text-white cursor-not-allowed'
                : 'bg-[#FFD166] hover:bg-[#f0c555] text-[#3B2F2F]'
            }`}
          >
            {verificationSent ? <Check className="w-5 h-5" /> : 'Send'}
          </button>
        </div>
        {errors.verification && <p className="text-red-500 text-sm mt-1">{errors.verification}</p>}
      </div>

      {/* Terms & Conditions */}
      <div>
        <label className="flex items-start cursor-pointer">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => {
              setAgreedToTerms(e.target.checked);
              if (errors.terms) setErrors(prev => ({ ...prev, terms: '' }));
            }}
            className="mt-1 w-5 h-5 rounded border-2 border-[#E6E1DB] text-[#F29E4C] focus:ring-[#F29E4C]"
          />
          <span className="ml-3 text-sm text-[#3B2F2F]">
            I agree to the <span className="text-[#F29E4C] font-semibold">Terms & Conditions</span> and <span className="text-[#F29E4C] font-semibold">Privacy Policy</span>
          </span>
        </label>
        {errors.terms && <p className="text-red-500 text-sm mt-1">{errors.terms}</p>}
      </div>

      <div className="flex gap-3 mt-6">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 bg-[#E6E1DB] hover:bg-[#d5cfc7] text-[#3B2F2F] font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Back
        </button>
        <button
          type="button"
          onClick={handleCreateAccount} // ✅ fixed
          className="flex-1 bg-[#F29E4C] hover:bg-[#e08d3d] text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
        >
          Create Account
          <Check className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Summary;
