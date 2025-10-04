import React, { useState } from 'react';
import { Plus, ChevronDown, ChevronUp, Pencil, Trash2, MapPin, Sprout, X, Check } from 'lucide-react';

type Farm = {
  farmStatus: string;
  farmName: string;
  location: string;
  surfaceArea: string;
  cropType: string;
  farmType: string;
  soilComposition: string;
  additionalNotes: string;
};

type FarmsProps = {
  formData: { farms?: Farm[]; [key: string]: any };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  onNext: () => void;
  onBack: () => void;
};

const Farms: React.FC<FarmsProps> = ({ formData, setFormData, onNext, onBack }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [expandedFarm, setExpandedFarm] = useState<number | null>(null);
  const [currentFarm, setCurrentFarm] = useState<Farm>({
    farmStatus: 'established',
    farmName: '',
    location: '',
    surfaceArea: '',
    cropType: '',
    farmType: '',
    soilComposition: '',
    additionalNotes: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const farms = formData.farms || [];

  // Handle form input changes
  const handleFarmInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrentFarm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // Validation
  const validateFarm = () => {
    const newErrors: Record<string, string> = {};
    if (!currentFarm.farmName.trim()) newErrors.farmName = 'Farm name is required';
    if (!currentFarm.farmStatus.trim()) newErrors.farmStatus = 'Farm status is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Add or update farm
  const handleAddFarm = () => {
    if (!validateFarm()) return;

    const updatedFarms =
      editingIndex !== null
        ? farms.map((f, i) => (i === editingIndex ? { ...currentFarm } : f))
        : [...farms, { ...currentFarm }];

    setFormData((prev: any) => ({ ...prev, farms: updatedFarms }));

    setCurrentFarm({
      farmStatus: 'established',
      farmName: '',
      location: '',
      surfaceArea: '',
      cropType: '',
      farmType: '',
      soilComposition: '',
      additionalNotes: ''
    });
    setShowForm(false);
    setEditingIndex(null);
    setErrors({});
  };

  const handleEditFarm = (index: number) => {
    setCurrentFarm({ ...farms[index] });
    setEditingIndex(index);
    setShowForm(true);
    setExpandedFarm(null);
  };

  const handleDeleteFarm = (index: number) => {
    if (!window.confirm('Are you sure you want to delete this farm?')) return;
    const updatedFarms = farms.filter((_, i) => i !== index);
    setFormData((prev: any) => ({ ...prev, farms: updatedFarms }));
    if (expandedFarm === index) setExpandedFarm(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingIndex(null);
    setCurrentFarm({
      farmStatus: 'established',
      farmName: '',
      location: '',
      surfaceArea: '',
      cropType: '',
      farmType: '',
      soilComposition: '',
      additionalNotes: ''
    });
    setErrors({});
  };

  const toggleExpand = (index: number) => {
    setExpandedFarm(expandedFarm === index ? null : index);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#3B2F2F]">Farm Management</h2>

      {/* Add/Edit Farm Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-[#3B2F2F]">
              {editingIndex !== null ? 'Edit Farm' : 'Add New Farm'}
            </h2>
            <button onClick={handleCancel} className="text-[#3B2F2F] hover:text-[#F29E4C] transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {errors.general && <p className="text-red-500 text-sm mb-4">{errors.general}</p>}

          {/* Farm Status * */}
          <div>
            <label className="block text-sm font-medium text-[#3B2F2F] mb-2">
              Farm Status <span className="text-red-500">*</span>
            </label>
            <select
              name="farmStatus"
              value={currentFarm.farmStatus}
              onChange={handleFarmInputChange}
              className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-[#F29E4C] transition-colors ${
                errors.farmStatus ? 'border-red-400' : 'border-[#E6E1DB]'
              }`}
            >
              <option value="established">Established</option>
              <option value="planned">Planned</option>
            </select>
          </div>

          {/* Farm Name * */}
          <div>
            <label className="block text-sm font-medium text-[#3B2F2F] mb-2">
              Farm Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="farmName"
              value={currentFarm.farmName}
              onChange={handleFarmInputChange}
              placeholder="Your Farm Name"
              className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none focus:border-[#F29E4C] ${
                errors.farmName ? 'border-red-400' : 'border-[#E6E1DB]'
              }`}
            />
          </div>

          {/* Location | Surface Area */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-[#3B2F2F] mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Location
              </label>
              <input
                type="text"
                name="location"
                value={currentFarm.location}
                onChange={handleFarmInputChange}
                placeholder="City, Country"
                className="w-full px-4 py-3 rounded-lg border-2 border-[#E6E1DB] focus:outline-none focus:border-[#F29E4C] transition-colors"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-[#3B2F2F] mb-2">Surface Area</label>
              <input
                type="text"
                name="surfaceArea"
                value={currentFarm.surfaceArea}
                onChange={handleFarmInputChange}
                placeholder="in hectares or acres"
                className="w-full px-4 py-3 rounded-lg border-2 border-[#E6E1DB] focus:outline-none focus:border-[#F29E4C] transition-colors"
              />
            </div>
          </div>

          {/* Crop Type | Farm Type */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-[#3B2F2F] mb-2">
                <Sprout className="w-4 h-4 inline mr-1" />
                Crop Type
              </label>
              <input
                type="text"
                name="cropType"
                value={currentFarm.cropType}
                onChange={handleFarmInputChange}
                placeholder="e.g., Wheat, Tomatoes"
                className="w-full px-4 py-3 rounded-lg border-2 border-[#E6E1DB] focus:outline-none focus:border-[#F29E4C] transition-colors"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-[#3B2F2F] mb-2">Farm Type</label>
              <select
                name="farmType"
                value={currentFarm.farmType}
                onChange={handleFarmInputChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-[#E6E1DB] focus:outline-none focus:border-[#F29E4C] transition-colors"
              >
                <option value="">Select type</option>
                <option value="open-field">Open Field</option>
                <option value="greenhouse">Greenhouse</option>
                <option value="hydroponics">Hydroponics</option>
                <option value="vertical">Vertical Farming</option>
                <option value="organic">Organic</option>
              </select>
            </div>
          </div>

          {/* Soil Composition */}
          <div>
            <label className="block text-sm font-medium text-[#3B2F2F] mb-2">Soil Composition</label>
            <input
              type="text"
              name="soilComposition"
              value={currentFarm.soilComposition}
              onChange={handleFarmInputChange}
              placeholder="e.g., Loamy, Sandy"
              className="w-full px-4 py-3 rounded-lg border-2 border-[#E6E1DB] focus:outline-none focus:border-[#F29E4C] transition-colors"
            />
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-medium text-[#3B2F2F] mb-2">Additional Notes</label>
            <textarea
              name="additionalNotes"
              value={currentFarm.additionalNotes}
              onChange={handleFarmInputChange}
              rows={3}
              className="w-full px-4 py-3 rounded-lg border-2 border-[#E6E1DB] focus:outline-none focus:border-[#F29E4C] transition-colors resize-none"
              placeholder="Any other information..."
            />
          </div>

          {/* Add/Update Button */}
          <button
            type="button"
            onClick={handleAddFarm}
            className="w-full bg-[#F29E4C] hover:bg-[#e08d3d] text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
          >
            <Check className="w-5 h-5 mr-2" />
            {editingIndex !== null ? 'Update Farm' : 'Add Farm'}
          </button>
        </div>
      )}

      {/* Farm List */}
      <div className="space-y-3 w-full max-w-4xl mx-auto">
        {farms.length === 0 ? (
          <div className="text-center py-8">
            <Sprout className="w-16 h-16 mx-auto text-[#E6E1DB] mb-4" />
            <p className="text-[#3B2F2F] opacity-60 mb-4">No farms added yet</p>
          </div>
        ) : (
          farms.map((farm, index) => (
            <div key={index} className="border-2 border-[#E6E1DB] rounded-lg overflow-hidden">
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#F6F2E7] transition-colors"
                onClick={() => toggleExpand(index)}
              >
                <div className="flex items-center gap-3">
                  <Sprout className="w-5 h-5 text-[#F29E4C]" />
                  <div>
                    <h3 className="font-semibold text-[#3B2F2F]">{farm.farmName}</h3>
                    <p className="text-xs text-[#3B2F2F] opacity-60 capitalize">{farm.farmStatus}</p>
                  </div>
                </div>
                {expandedFarm === index ? (
                  <ChevronUp className="w-5 h-5 text-[#3B2F2F]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#3B2F2F]" />
                )}
              </div>

              {expandedFarm === index && (
                <div className="border-t-2 border-[#E6E1DB] p-4 bg-[#F6F2E7] space-y-2">
                  {farm.location && (
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[#F29E4C] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-[#3B2F2F]">{farm.location}</span>
                    </div>
                  )}
                  {farm.surfaceArea && <p className="text-sm text-[#3B2F2F]"><span className="font-medium">Area:</span> {farm.surfaceArea}</p>}
                  {farm.cropType && <p className="text-sm text-[#3B2F2F]"><span className="font-medium">Crops:</span> {farm.cropType}</p>}
                  {farm.farmType && <p className="text-sm text-[#3B2F2F]"><span className="font-medium">Type:</span> {farm.farmType}</p>}
                  {farm.soilComposition && <p className="text-sm text-[#3B2F2F]"><span className="font-medium">Soil:</span> {farm.soilComposition}</p>}
                  {farm.additionalNotes && <p className="text-sm text-[#3B2F2F]"><span className="font-medium">Notes:</span> {farm.additionalNotes}</p>}

                  <div className="flex gap-2 mt-4 pt-3 border-t border-[#E6E1DB]">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleEditFarm(index); }}
                      className="flex-1 bg-[#FFD166] hover:bg-[#f0c555] text-[#3B2F2F] font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <Pencil className="w-4 h-4 mr-2" /> Edit
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDeleteFarm(index); }}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <Trash2 className="w-4 h-4 mr-2" /> Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add New Farm Button */}
      {!showForm && (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="w-full max-w-4xl mx-auto bg-[#FFD166] hover:bg-[#f0c555] text-[#3B2F2F] font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
        >
          <Plus className="w-5 h-5 mr-2" /> Add New Farm
        </button>
      )}

      {/* Navigation */}
      <div className="flex gap-3 pt-4 max-w-4xl mx-auto">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 bg-[#E6E1DB] hover:bg-[#d5cfc7] text-[#3B2F2F] font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex-1 bg-[#F29E4C] hover:bg-[#e08d3d] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Farms;
