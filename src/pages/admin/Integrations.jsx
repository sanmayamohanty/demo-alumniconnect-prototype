import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import AdminSidebar from '../../components/layout/AdminSidebar';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import { 
  Key, 
  CheckCircle, 
  AlertCircle,
  Eye,
  EyeOff,
  Settings
} from 'lucide-react';

export const Integrations = () => {
  const { institution } = useApp();
  const [toastMessage, setToastMessage] = useState('');
  
  const [services, setServices] = useState([
    { id: 'wati', name: 'WATI', category: 'WhatsApp Gateway', connected: true, apiKey: 'd2df7389s8dfy3u1h2j1k231', endpoint: 'https://api.wati.io/v1/greenfield' },
    { id: 'msg91', name: 'MSG91', category: 'SMS Gateway', connected: true, apiKey: '918237198273981273912739', endpoint: 'https://api.msg91.com/v5/otp' },
    { id: 'brevo', name: 'Brevo (Sendinblue)', category: 'Email Service', connected: false, apiKey: '', endpoint: 'https://api.brevo.com/v3' },
    { id: 'razorpay', name: 'Razorpay API', category: 'Payment Gateway', connected: true, apiKey: 'rzp_live_G27fS81hJa8f', endpoint: 'Key Secret: **********' },
    { id: 'google_oauth', name: 'Google OAuth Client', category: 'Authentication', connected: true, apiKey: '7392183921-googleusercontent.apps.com', endpoint: 'Secret: **********' },
    { id: 'facebook_oauth', name: 'Facebook Login API', category: 'Authentication', connected: false, apiKey: '', endpoint: '' },
  ]);

  const [visibleKeyId, setVisibleKeyId] = useState(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleToggleVisibility = (id) => {
    if (visibleKeyId === id) {
      setVisibleKeyId(null);
    } else {
      setVisibleKeyId(id);
    }
  };

  const handleSave = (id, name) => {
    triggerToast(`Configuration for ${name} saved and verified!`);
  };

  const handleToggleConnection = (id, name, currentStatus) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, connected: !currentStatus } : s));
    triggerToast(currentStatus ? `Disconnected ${name} integration.` : `Connected ${name} integration successfully!`);
  };

  return (
    <div className="min-h-screen flex bg-surface font-sans pb-16 md:pb-0">
      <AdminSidebar />

      <main className="flex-1 md:ml-20 lg:ml-56 p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Toast */}
        {toastMessage && (
          <div className="fixed top-4 right-4 z-50 bg-[#0F2238] text-white text-xs font-semibold py-3 px-5 rounded-lg shadow-xl border border-accent flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-accent" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Header */}
        <section className="border-b border-gray-150 pb-5">
          <h1 className="text-xl md:text-2xl font-extrabold font-sora text-primary flex items-center gap-2">
            <Key className="w-6 h-6 text-accent" />
            <span>Integrations</span>
          </h1>
          <p className="text-xs text-gray-500 font-sans mt-0.5">
            Configure third-party API accounts, gateways, and sign-in services
          </p>
        </section>

        {/* Integrations Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((ser) => {
            const isVisible = visibleKeyId === ser.id;
            return (
              <Card 
                key={ser.id} 
                className={`p-5 bg-white border flex flex-col justify-between space-y-4 ${
                  ser.connected ? 'border-emerald-250 ring-1 ring-emerald-100 shadow-sm' : 'border-gray-150'
                }`}
              >
                <div>
                  {/* Card Header info */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-0.5">
                      <h3 className="text-xs font-extrabold font-sora text-primary flex items-center gap-1.5">
                        {ser.name}
                      </h3>
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider font-sora">{ser.category}</p>
                    </div>

                    <Badge 
                      variant={ser.connected ? 'success' : 'outline'} 
                      className="text-[8px] font-bold font-sora uppercase cursor-pointer"
                      onClick={() => handleToggleConnection(ser.id, ser.name, ser.connected)}
                    >
                      {ser.connected ? 'Connected' : 'Inactive'}
                    </Badge>
                  </div>

                  {/* Config Inputs */}
                  <div className="space-y-2 mt-4">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <label className="text-[9px] font-extrabold font-sora uppercase text-gray-450">API Public Key / Token</label>
                        {ser.connected && (
                          <button
                            onClick={() => handleToggleVisibility(ser.id)}
                            className="text-gray-400 hover:text-primary transition-colors focus:outline-none"
                            title="Toggle Visibility"
                          >
                            {isVisible ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                          </button>
                        )}
                      </div>
                      
                      <div className="relative">
                        <Input
                          type={isVisible || !ser.connected ? 'text' : 'password'}
                          placeholder={ser.connected ? '••••••••••••••••••••••••' : 'Enter API Key...'}
                          defaultValue={ser.apiKey}
                          disabled={!ser.connected}
                          className="w-full text-xs font-mono"
                        />
                      </div>
                    </div>

                    {ser.endpoint && (
                      <div className="space-y-1">
                        <label className="text-[9px] font-extrabold font-sora uppercase text-gray-450">Endpoint / Extra Param</label>
                        <Input
                          type="text"
                          defaultValue={ser.endpoint}
                          disabled={!ser.connected}
                          className="w-full text-xs font-mono text-gray-500 bg-gray-50"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Card footer actions */}
                <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                  <Button
                    variant={ser.connected ? 'outline' : 'primary'}
                    size="sm"
                    className="w-full text-[10px] font-bold py-1.5 flex items-center justify-center gap-1"
                    onClick={() => handleSave(ser.id, ser.name)}
                    disabled={!ser.connected}
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>Save Config</span>
                  </Button>
                </div>

              </Card>
            );
          })}
        </section>

      </main>
    </div>
  );
};

export default Integrations;
