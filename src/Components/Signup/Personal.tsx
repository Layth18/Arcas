import React, { useState } from 'react';
import { Mail, Lock, User, Sprout, Phone, MapPin } from 'lucide-react';

type PersonalProps = {
  formData: {
    username?: string;
    email?: string;
    experienceLevel?: string;
    password?: string;
    confirmPassword?: string;
    gender?: string;
    phoneNumber?: string;
    location?: string;
    [key: string]: any;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  onNext: () => void;
};

const Personal: React.FC<PersonalProps> = ({ formData, setFormData, onNext }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let fieldValue = value;
    if (type === 'checkbox' && 'checked' in e.target) {
      fieldValue = (e.target as HTMLInputElement).checked.toString();
    }
    setFormData((prev: typeof formData) => ({
      ...prev,
      [name]: fieldValue
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleExperienceLevelChange = (level: string) => {
    setFormData((prev: typeof formData) => ({
      ...prev,
      experienceLevel: level
    }));
    if (errors.experienceLevel) {
      setErrors(prev => ({ ...prev, experienceLevel: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.username?.trim()) newErrors.username = 'Full name is required';
    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.experienceLevel) {
      newErrors.experienceLevel = 'Please select your experience level';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-[#3B2F2F] mb-6">Personal Information</h2>

      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-[#3B2F2F] mb-2">
          <User className="w-4 h-4 inline mr-1" />
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="username"
          value={formData.username || ''}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none focus:border-[#F29E4C] ${
            errors.username ? 'border-red-400' : 'border-[#E6E1DB]'
          }`}
          placeholder="Your full name"
        />
        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm font-medium text-[#3B2F2F] mb-2">Gender</label>
        <div className="flex gap-3">
          {['male', 'female', 'prefer_not_to_say'].map((option) => {
            const labelText =
              option === 'male'
                ? 'Male'
                : option === 'female'
                ? 'Female'
                : 'Prefer not to specify';
            const isSelected =
              formData.gender === option || (!formData.gender && option === 'prefer_not_to_say');

            return (
              <button
                key={option}
                type="button"
                onClick={() => setFormData((prev: any) => ({ ...prev, gender: option }))}
                className={`px-4 py-2 rounded-lg border-2 font-medium transition-all text-sm ${
                  isSelected
                    ? 'bg-[#F29E4C] text-white border-[#F29E4C]'
                    : 'bg-white text-[#3B2F2F] border-[#E6E1DB] hover:border-[#F29E4C] hover:text-[#F29E4C]'
                }`}
              >
                {labelText}
              </button>
            );
          })}
        </div>
      </div>

      {/* Phone Number | Location */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-[#3B2F2F] mb-2">
            <Phone className="w-4 h-4 inline mr-1" />
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-[#E6E1DB] focus:outline-none focus:border-[#F29E4C]"
            placeholder="+123 456 7890"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-[#3B2F2F] mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-[#E6E1DB] focus:outline-none focus:border-[#F29E4C]"
            placeholder="City, Country"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-[#3B2F2F] mb-2">
          <Mail className="w-4 h-4 inline mr-1" />
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email || ''}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none focus:border-[#F29E4C] ${
            errors.email ? 'border-red-400' : 'border-[#E6E1DB]'
          }`}
          placeholder="example@example.com"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      {/* Password | Confirm */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-[#3B2F2F] mb-2">
            <Lock className="w-4 h-4 inline mr-1" />
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            name="password"
            value={formData.password || ''}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none focus:border-[#F29E4C] ${
              errors.password ? 'border-red-400' : 'border-[#E6E1DB]'
            }`}
            placeholder="Min. 8 characters"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-[#3B2F2F] mb-2">
            <Lock className="w-4 h-4 inline mr-1" />
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword || ''}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none focus:border-[#F29E4C] ${
              errors.confirmPassword ? 'border-red-400' : 'border-[#E6E1DB]'
            }`}
            placeholder="Re-enter your password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>
      </div>

      {/* Experience */}
      <div>
        <label className="block text-sm font-medium text-[#3B2F2F] mb-2">
          <Sprout className="w-4 h-4 inline mr-1" />
          Experience Level <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => handleExperienceLevelChange('new')}
            className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
              formData.experienceLevel === 'new'
                ? 'border-[#F29E4C] bg-[#F29E4C] text-white'
                : 'border-[#E6E1DB] text-[#3B2F2F] hover:border-[#F29E4C]'
            }`}
          >
            New Farmer
          </button>
          <button
            type="button"
            onClick={() => handleExperienceLevelChange('experienced')}
            className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
              formData.experienceLevel === 'experienced'
                ? 'border-[#F29E4C] bg-[#F29E4C] text-white'
                : 'border-[#E6E1DB] text-[#3B2F2F] hover:border-[#F29E4C]'
            }`}
          >
            Experienced
          </button>
        </div>
        {errors.experienceLevel && (
          <p className="text-red-500 text-sm mt-1">{errors.experienceLevel}</p>
        )}
      </div>

      <button
        type="button"
        onClick={handleNext}
        className="w-full bg-[#F29E4C] hover:bg-[#e08d3d] text-white font-semibold py-3 px-6 rounded-lg transition-colors mt-6"
      >
        Continue to Farm Details
      </button>
    </div>
  );
};

export default Personal;
