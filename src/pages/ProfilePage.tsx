
import React, { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Camera, MapPin, Calendar, Bird, Phone, Mail, AlertTriangle } from 'lucide-react';
import BackgroundVideo from '../components/BackgroundVideo';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const ProfilePage: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Rajesh Kumar",
    email: "rajesh@farmerfriendly.com",
    phone: "+91 98765 43210",
    location: "Bangalore Rural, Karnataka",
    joinDate: "15 January, 2023",
    chickenCount: 5000,
    avatarUrl: "",
  });
  
  // Mock health alerts
  const healthAlerts = [
    { id: 1, date: "2025-05-02", message: t('lowFeedAlert'), severity: "medium" },
    { id: 2, date: "2025-05-01", message: t('temperatureAlert'), severity: "high" },
    { id: 3, date: "2025-04-28", message: t('vaccinationReminder'), severity: "low" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        if (event.target && event.target.result) {
          setProfileData({
            ...profileData,
            avatarUrl: event.target.result.toString()
          });
        }
      };
      fileReader.readAsDataURL(e.target.files[0]);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const saveChanges = () => {
    // In a real app, you would save these changes to a database
    setIsEditing(false);
    console.log("Saving profile data:", profileData);
  };

  return (
    <div className={theme === 'light' ? 'light-mode min-h-screen' : 'dark-mode min-h-screen'}>
      {/* Background */}
      <BackgroundVideo />
      
      {/* NavBar */}
      <NavBar />
      
      {/* Main Content */}
      <main className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <h1 className={`text-3xl md:text-4xl font-bold mb-8 ${theme === 'light' ? 'text-gray-800' : 'text-gradient'}`}>
            {t('farmerProfile')}
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Information Card */}
            <Card className={`${theme === 'light' ? 'light-glass-morphism' : 'glass-morphism'} p-6 col-span-1`}>
              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4 group">
                  <Avatar className="w-32 h-32 border-4 border-farm-green">
                    {profileData.avatarUrl ? (
                      <AvatarImage src={profileData.avatarUrl} alt={profileData.name} />
                    ) : (
                      <AvatarFallback className="text-4xl bg-farm-green/20">
                        {profileData.name.charAt(0)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  
                  {isEditing && (
                    <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 p-2 bg-farm-green rounded-full cursor-pointer hover:bg-farm-green/80 transition-colors">
                      <Camera className="h-5 w-5 text-white" />
                      <input 
                        id="avatar-upload" 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>
                
                {isEditing ? (
                  <Input 
                    name="name"
                    value={profileData.name} 
                    onChange={handleInputChange} 
                    className="text-xl font-semibold text-center mb-2 bg-secondary/50"
                  />
                ) : (
                  <h2 className="text-xl font-semibold mb-1">{profileData.name}</h2>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-farm-green flex-shrink-0" />
                  <div className="flex-grow">
                    <p className="text-sm opacity-70">{t('phone')}</p>
                    {isEditing ? (
                      <Input 
                        name="phone"
                        value={profileData.phone} 
                        onChange={handleInputChange} 
                        className="bg-secondary/50"
                      />
                    ) : (
                      <p>{profileData.phone}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-farm-green flex-shrink-0" />
                  <div className="flex-grow">
                    <p className="text-sm opacity-70">{t('email')}</p>
                    {isEditing ? (
                      <Input 
                        name="email"
                        value={profileData.email} 
                        onChange={handleInputChange}
                        type="email" 
                        className="bg-secondary/50"
                      />
                    ) : (
                      <p>{profileData.email}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-farm-green flex-shrink-0" />
                  <div className="flex-grow">
                    <p className="text-sm opacity-70">{t('farmLocation')}</p>
                    {isEditing ? (
                      <Textarea 
                        name="location"
                        value={profileData.location} 
                        onChange={handleInputChange} 
                        className="bg-secondary/50"
                      />
                    ) : (
                      <p>{profileData.location}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Bird className="h-5 w-5 text-farm-green flex-shrink-0" />
                  <div className="flex-grow">
                    <p className="text-sm opacity-70">{t('chickenCount')}</p>
                    {isEditing ? (
                      <Input 
                        name="chickenCount"
                        value={profileData.chickenCount.toString()} 
                        onChange={handleInputChange}
                        type="number" 
                        className="bg-secondary/50"
                      />
                    ) : (
                      <p>{profileData.chickenCount.toLocaleString()}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-farm-green flex-shrink-0" />
                  <div>
                    <p className="text-sm opacity-70">{t('joiningDate')}</p>
                    <p>{profileData.joinDate}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                {isEditing ? (
                  <div className="flex gap-3">
                    <Button 
                      onClick={saveChanges}
                      className="flex-1 bg-farm-green hover:bg-farm-green/90"
                    >
                      {t('saveChanges')}
                    </Button>
                    <Button 
                      onClick={toggleEdit} 
                      variant="outline"
                      className="flex-1"
                    >
                      {t('cancel')}
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={toggleEdit} 
                    className="w-full bg-farm-green hover:bg-farm-green/90"
                  >
                    {t('editProfile')}
                  </Button>
                )}
              </div>
            </Card>
            
            {/* Health Status & Conveyor Belt Status Cards */}
            <div className="col-span-1 lg:col-span-2 space-y-8">
              {/* Conveyor Belt Status Card */}
              <Card className={`${theme === 'light' ? 'light-glass-morphism' : 'glass-morphism'} p-6`}>
                <h3 className="text-xl font-semibold mb-4">{t('conveyorBeltStatus')}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="mb-6">
                      <p className="text-sm opacity-70 mb-2">{t('currentStatus')}</p>
                      <div className="flex items-center">
                        <div className={`h-4 w-4 rounded-full ${30 > 25 ? 'bg-green-500 animate-pulse' : 'bg-red-500'} mr-2`}></div>
                        <span className="text-lg font-medium">{30 > 25 ? t('on') : t('off')}</span>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm opacity-70">{t('ammoniaLevel')}</p>
                        <span className="text-lg font-medium">30 ppm</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-farm-green rounded-full" 
                          style={{ width: `${(30 / 50) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm opacity-70">{t('thresholdValue')}</p>
                        <span className="text-lg font-medium">25 ppm</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-farm-yellow rounded-full" 
                          style={{ width: `${(25 / 50) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <p className="text-sm opacity-70 mb-2">{t('statusMessage')}</p>
                    <div className={`flex-grow p-4 rounded-lg ${30 > 25 ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'}`}>
                      <p>
                        {30 > 25 
                          ? t('conveyorBeltOnMessage', { ammonia: '30', threshold: '25' })
                          : t('conveyorBeltOffMessage', { ammonia: '30', threshold: '25' })
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
              
              {/* Health Status Card */}
              <Card className={`${theme === 'light' ? 'light-glass-morphism' : 'glass-morphism'} p-6`}>
                <h3 className="text-xl font-semibold mb-4">{t('healthStatus')}</h3>
                
                <div className="space-y-4">
                  {healthAlerts.length > 0 ? (
                    healthAlerts.map((alert) => (
                      <div 
                        key={alert.id} 
                        className={`p-4 rounded-lg border ${
                          alert.severity === 'high' ? 'bg-red-500/20 border-red-500/30' : 
                          alert.severity === 'medium' ? 'bg-farm-yellow/20 border-farm-yellow/30' :
                          'bg-blue-500/20 border-blue-500/30'
                        }`}
                      >
                        <div className="flex items-start">
                          <AlertTriangle className={`h-5 w-5 mr-3 flex-shrink-0 ${
                            alert.severity === 'high' ? 'text-red-500' : 
                            alert.severity === 'medium' ? 'text-farm-yellow' :
                            'text-blue-500'
                          }`} />
                          <div>
                            <p className="font-medium">{alert.message}</p>
                            <p className="text-sm opacity-70 mt-1">{alert.date}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center py-4">{t('noHealthAlerts')}</p>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProfilePage;
