import React, { useState } from 'react';
import { User, Lock, Edit2, Save, X, Plus, Trash2, Award, MapPin, Sprout, Calendar, MessageCircle, ShoppingBag, Bell, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';

// Define types for our data structures
interface PersonalInfo {
  name: string;
  email: string;
  location: string;
}

interface Role {
  id: number;
  name: string;
  status: 'approved' | 'pending';
  appliedDate: string;
}

interface Farm {
  id: number;
  name: string;
  type: string;
  location: string;
  crops: string;
  area: string;
}

interface NewRole {
  name: string;
  expertise: string;
  motivation: string;
}

interface NewFarm {
  name: string;
  type: string;
  location: string;
  crops: string;
  area: string;
}

interface Settings {
  emailAlerts: boolean;
  appAlerts: boolean;
  language: string;
}

interface Activity {
  id: number;
  type: string;
  title: string;
  date: string;
  icon: React.ComponentType<any>;
  color: string;
}

const Account = () => {
  const [editingPersonal, setEditingPersonal] = useState(false);
  const [showRoleForm, setShowRoleForm] = useState(false);
  const [showFarmForm, setShowFarmForm] = useState(false);
  const [editingFarm, setEditingFarm] = useState<Farm | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>('personal');
  
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: 'Ahmed Khalil',
    email: 'ahmed.khalil@irisfields.com',
    location: 'Sfax, Tunisia'
  });

  const [tempPersonalInfo, setTempPersonalInfo] = useState<PersonalInfo>({ ...personalInfo });

  const [roles, setRoles] = useState<Role[]>([
    { id: 1, name: 'Farmer', status: 'approved', appliedDate: '2024-01-15' },
    { id: 2, name: 'Agronomist', status: 'approved', appliedDate: '2024-03-20' },
    { id: 3, name: 'Geologist', status: 'pending', appliedDate: '2024-10-01' }
  ]);

  const [newRole, setNewRole] = useState<NewRole>({
    name: '',
    expertise: '',
    motivation: ''
  });

  const [farms, setFarms] = useState<Farm[]>([
    { id: 1, name: 'Sunset Valley Farm', type: 'Mixed Crops', location: 'Northern District', crops: 'Wheat, Tomatoes, Corn', area: '25 hectares' },
    { id: 2, name: 'Green Acres', type: 'Greenhouse', location: 'Central Valley', crops: 'Vegetables, Herbs', area: '5 hectares' },
    { id: 3, name: 'River Bend Farm', type: 'Livestock', location: 'Riverside', crops: 'Pasture, Feed Crops', area: '40 hectares' }
  ]);

  const [newFarm, setNewFarm] = useState<NewFarm>({
    name: '',
    type: '',
    location: '',
    crops: '',
    area: ''
  });

  const [settings, setSettings] = useState<Settings>({
    emailAlerts: true,
    appAlerts: true,
    language: 'English'
  });

  const recentActivity: Activity[] = [
    { id: 1, type: 'trade', title: 'Sold Tomatoes (100kg)', date: '2 hours ago', icon: ShoppingBag, color: 'text-orange-600' },
    { id: 2, type: 'question', title: 'Asked: Best organic pest control?', date: '5 hours ago', icon: MessageCircle, color: 'text-purple-600' },
    { id: 3, type: 'trade', title: 'Purchased Premium Rice Seeds', date: '1 day ago', icon: ShoppingBag, color: 'text-green-600' },
    { id: 4, type: 'question', title: 'Answered: Soil pH management', date: '2 days ago', icon: MessageCircle, color: 'text-blue-600' },
    { id: 5, type: 'trade', title: 'Listed Wheat Seeds for sale', date: '3 days ago', icon: ShoppingBag, color: 'text-yellow-600' }
  ];

  const availableRoles = ['Veterinarian', 'Technician', 'Entomologist', 'Agricultural Engineer'];

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleSavePersonal = () => {
    setPersonalInfo({ ...tempPersonalInfo });
    setEditingPersonal(false);
  };

  const handleCancelPersonal = () => {
    setTempPersonalInfo({ ...personalInfo });
    setEditingPersonal(false);
  };

  const handleApplyRole = () => {
    if (!newRole.name || !newRole.expertise || !newRole.motivation) {
      alert('Please fill in all fields');
      return;
    }

    const role: Role = {
      id: Date.now(),
      name: newRole.name,
      status: 'pending',
      appliedDate: new Date().toISOString().split('T')[0]
    };

    setRoles([...roles, role]);
    setShowRoleForm(false);
    setNewRole({ name: '', expertise: '', motivation: '' });
  };

  const handleAddFarm = () => {
    if (!newFarm.name || !newFarm.type || !newFarm.location) {
      alert('Please fill in required fields');
      return;
    }

    const farm: Farm = {
      id: Date.now(),
      ...newFarm
    };

    setFarms([...farms, farm]);
    setShowFarmForm(false);
    setNewFarm({ name: '', type: '', location: '', crops: '', area: '' });
  };

  const handleUpdateFarm = () => {
    if (!editingFarm) return;
    
    setFarms(farms.map(f => f.id === editingFarm.id ? editingFarm : f));
    setEditingFarm(null);
  };

  const handleRemoveFarm = (id: number) => {
    if (window.confirm('Are you sure you want to remove this farm?')) {
      setFarms(farms.filter(f => f.id !== id));
    }
  };

  const handleToggleSetting = (setting: keyof Pick<Settings, 'emailAlerts' | 'appAlerts'>) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Account Settings</h1>
          <p className="text-gray-600">Manage your profile, roles, and farms</p>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-orange-200 mb-6">
          <button
            onClick={() => toggleSection('personal')}
            className="w-full flex items-center justify-between mb-4"
          >
            <div className="flex items-center space-x-3">
              <User className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
            </div>
            {expandedSection === 'personal' ? (
              <ChevronUp className="w-6 h-6 text-gray-600" />
            ) : (
              <ChevronDown className="w-6 h-6 text-gray-600" />
            )}
          </button>

          {expandedSection === 'personal' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                {editingPersonal ? (
                  <input
                    type="text"
                    value={tempPersonalInfo.name}
                    onChange={(e) => setTempPersonalInfo({ ...tempPersonalInfo, name: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-300 focus:outline-none"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{personalInfo.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                {editingPersonal ? (
                  <input
                    type="email"
                    value={tempPersonalInfo.email}
                    onChange={(e) => setTempPersonalInfo({ ...tempPersonalInfo, email: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-300 focus:outline-none"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{personalInfo.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                {editingPersonal ? (
                  <input
                    type="text"
                    value={tempPersonalInfo.location}
                    onChange={(e) => setTempPersonalInfo({ ...tempPersonalInfo, location: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-300 focus:outline-none"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{personalInfo.location}</p>
                )}
              </div>

              <div className="flex items-center space-x-3 pt-4">
                {editingPersonal ? (
                  <>
                    <button
                      onClick={handleSavePersonal}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleCancelPersonal}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setEditingPersonal(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                )}
                {!editingPersonal && (
                  <button className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                    <Lock className="w-4 h-4" />
                    <span>Reset Password</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Role Management */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-purple-200 mb-6">
          <button
            onClick={() => toggleSection('roles')}
            className="w-full flex items-center justify-between mb-4"
          >
            <div className="flex items-center space-x-3">
              <Award className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-800">Role Management</h2>
            </div>
            {expandedSection === 'roles' ? (
              <ChevronUp className="w-6 h-6 text-gray-600" />
            ) : (
              <ChevronDown className="w-6 h-6 text-gray-600" />
            )}
          </button>

          {expandedSection === 'roles' && (
            <div className="space-y-4">
              <div className="space-y-2">
                {roles.map((role) => (
                  <div key={role.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <div>
                      <p className="font-medium text-gray-800">{role.name}</p>
                      <p className="text-xs text-gray-500">Applied: {role.appliedDate}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        role.status === 'approved'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {role.status}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowRoleForm(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Apply for New Role</span>
              </button>
            </div>
          )}
        </div>

        {/* Farm Management */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-green-200 mb-6">
          <button
            onClick={() => toggleSection('farms')}
            className="w-full flex items-center justify-between mb-4"
          >
            <div className="flex items-center space-x-3">
              <Sprout className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-800">Farm Management</h2>
            </div>
            {expandedSection === 'farms' ? (
              <ChevronUp className="w-6 h-6 text-gray-600" />
            ) : (
              <ChevronDown className="w-6 h-6 text-gray-600" />
            )}
          </button>

          {expandedSection === 'farms' && (
            <div className="space-y-4">
              <div className="space-y-3">
                {farms.map((farm) => (
                  <div key={farm.id} className="bg-gray-50 rounded-lg p-4">
                    {editingFarm?.id === farm.id ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editingFarm.name}
                          onChange={(e) => setEditingFarm({ ...editingFarm, name: e.target.value })}
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-green-300 focus:outline-none"
                          placeholder="Farm Name"
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={editingFarm.type}
                            onChange={(e) => setEditingFarm({ ...editingFarm, type: e.target.value })}
                            className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-green-300 focus:outline-none"
                            placeholder="Type"
                          />
                          <input
                            type="text"
                            value={editingFarm.location}
                            onChange={(e) => setEditingFarm({ ...editingFarm, location: e.target.value })}
                            className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-green-300 focus:outline-none"
                            placeholder="Location"
                          />
                        </div>
                        <input
                          type="text"
                          value={editingFarm.crops}
                          onChange={(e) => setEditingFarm({ ...editingFarm, crops: e.target.value })}
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-green-300 focus:outline-none"
                          placeholder="Crops"
                        />
                        <input
                          type="text"
                          value={editingFarm.area}
                          onChange={(e) => setEditingFarm({ ...editingFarm, area: e.target.value })}
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-green-300 focus:outline-none"
                          placeholder="Area"
                        />
                        <div className="flex space-x-2">
                          <button
                            onClick={handleUpdateFarm}
                            className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingFarm(null)}
                            className="flex-1 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-gray-800 text-lg">{farm.name}</h3>
                            <p className="text-sm text-gray-600">{farm.type}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setEditingFarm({ ...farm })}
                              className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleRemoveFarm(farm.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            {farm.location}
                          </p>
                          <p>Crops: {farm.crops}</p>
                          <p>Area: {farm.area}</p>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowFarmForm(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Farm</span>
              </button>
            </div>
          )}
        </div>

        {/* Activity & History */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-yellow-200 mb-6">
          <button
            onClick={() => toggleSection('activity')}
            className="w-full flex items-center justify-between mb-4"
          >
            <div className="flex items-center space-x-3">
              <Calendar className="w-6 h-6 text-yellow-600" />
              <h2 className="text-2xl font-bold text-gray-800">Activity & History</h2>
            </div>
            {expandedSection === 'activity' ? (
              <ChevronUp className="w-6 h-6 text-gray-600" />
            ) : (
              <ChevronDown className="w-6 h-6 text-gray-600" />
            )}
          </button>

          {expandedSection === 'activity' && (
            <div className="space-y-2">
              {recentActivity.map((activity) => {
                const ActivityIcon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
                    <ActivityIcon className={`w-5 h-5 ${activity.color}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Settings */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-pink-200 mb-6">
          <button
            onClick={() => toggleSection('settings')}
            className="w-full flex items-center justify-between mb-4"
          >
            <div className="flex items-center space-x-3">
              <Bell className="w-6 h-6 text-pink-600" />
              <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
            </div>
            {expandedSection === 'settings' ? (
              <ChevronUp className="w-6 h-6 text-gray-600" />
            ) : (
              <ChevronDown className="w-6 h-6 text-gray-600" />
            )}
          </button>

          {expandedSection === 'settings' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Email Alerts</span>
                <button
                  onClick={() => handleToggleSetting('emailAlerts')}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings.emailAlerts ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.emailAlerts ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">App Notifications</span>
                <button
                  onClick={() => handleToggleSetting('appAlerts')}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings.appAlerts ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.appAlerts ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <select
                  value={settings.language}
                  onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-pink-300 focus:outline-none"
                >
                  <option>English</option>
                  <option>Arabic</option>
                  <option>French</option>
                </select>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-start space-x-3 mb-3">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-sm font-bold text-gray-800">Danger Zone</p>
                    <p className="text-xs text-gray-600">This action cannot be undone</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Apply Role Modal */}
      {showRoleForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowRoleForm(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-purple-400 to-purple-600 text-white p-6 rounded-t-2xl flex justify-between items-center">
              <h3 className="text-2xl font-bold">Apply for New Role</h3>
              <button
                onClick={() => setShowRoleForm(false)}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role *</label>
                <select
                  value={newRole.name}
                  onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-300 focus:outline-none"
                >
                  <option value="">Select role</option>
                  {availableRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expertise *</label>
                <input
                  type="text"
                  value={newRole.expertise}
                  onChange={(e) => setNewRole({ ...newRole, expertise: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-300 focus:outline-none"
                  placeholder="e.g., 10 years in livestock health"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Motivation *</label>
                <textarea
                  value={newRole.motivation}
                  onChange={(e) => setNewRole({ ...newRole, motivation: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-300 focus:outline-none"
                  placeholder="Why do you want this role?"
                />
              </div>

              <button
                onClick={handleApplyRole}
                className="w-full py-3 bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-medium text-lg"
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Farm Modal */}
      {showFarmForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowFarmForm(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-t-2xl flex justify-between items-center">
              <h3 className="text-2xl font-bold">Add New Farm</h3>
              <button
                onClick={() => setShowFarmForm(false)}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Farm Name *</label>
                <input
                  type="text"
                  value={newFarm.name}
                  onChange={(e) => setNewFarm({ ...newFarm, name: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-300 focus:outline-none"
                  placeholder="e.g., Sunrise Farm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
                  <input
                    type="text"
                    value={newFarm.type}
                    onChange={(e) => setNewFarm({ ...newFarm, type: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-300 focus:outline-none"
                    placeholder="e.g., Mixed Crops"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                  <input
                    type="text"
                    value={newFarm.location}
                    onChange={(e) => setNewFarm({ ...newFarm, location: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-300 focus:outline-none"
                    placeholder="e.g., Northern District"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Crops</label>
                <input
                  type="text"
                  value={newFarm.crops}
                  onChange={(e) => setNewFarm({ ...newFarm, crops: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-300 focus:outline-none"
                  placeholder="e.g., Wheat, Tomatoes, Corn"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Area</label>
                <input
                  type="text"
                  value={newFarm.area}
                  onChange={(e) => setNewFarm({ ...newFarm, area: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-300 focus:outline-none"
                  placeholder="e.g., 25 hectares"
                />
              </div>

              <button
                onClick={handleAddFarm}
                className="w-full py-3 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg hover:shadow-lg transition-all font-medium text-lg"
              >
                Add Farm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;