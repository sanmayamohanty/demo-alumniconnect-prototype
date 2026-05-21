import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import AdminSidebar from '../../components/layout/AdminSidebar';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import { 
  Share2, 
  Plus, 
  Edit2, 
  Check, 
  ExternalLink,
  MessageSquare, 
  Facebook,
  CheckCircle
} from 'lucide-react';

export const CommunityManager = () => {
  const { institution } = useApp();
  const [toastMessage, setToastMessage] = useState('');
  const [editId, setEditId] = useState(null);
  const [editWa, setEditWa] = useState('');
  const [editFb, setEditFb] = useState('');

  const [batches, setBatches] = useState([
    { year: 2023, members: 142, waLink: 'https://chat.whatsapp.com/demo2023', fbLink: 'https://facebook.com/groups/git2023', status: 'ACTIVE' },
    { year: 2022, members: 198, waLink: 'https://chat.whatsapp.com/demo2022', fbLink: 'https://facebook.com/groups/git2022', status: 'ACTIVE' },
    { year: 2021, members: 224, waLink: 'https://chat.whatsapp.com/demo2021', fbLink: 'https://facebook.com/groups/git2021', status: 'ACTIVE' },
    { year: 2020, members: 256, waLink: 'https://chat.whatsapp.com/demo2020', fbLink: 'https://facebook.com/groups/git2020', status: 'ACTIVE' },
    { year: 2019, members: 267, waLink: 'https://chat.whatsapp.com/demo2019', fbLink: 'https://facebook.com/groups/git2019', status: 'ACTIVE' },
    { year: 2018, members: 289, waLink: 'https://chat.whatsapp.com/demo2018', fbLink: 'https://facebook.com/groups/git2018', status: 'ACTIVE' },
    { year: 2016, members: 276, waLink: 'https://chat.whatsapp.com/demo2016', fbLink: 'https://facebook.com/groups/git2016', status: 'ACTIVE' },
    { year: 2015, members: 312, waLink: 'https://chat.whatsapp.com/demo2015', fbLink: 'https://facebook.com/groups/git2015', status: 'ACTIVE', isCurrentUserBatch: true },
  ]);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleEditClick = (batch) => {
    setEditId(batch.year);
    setEditWa(batch.waLink);
    setEditFb(batch.fbLink);
  };

  const handleSaveClick = (year) => {
    setBatches(prev => prev.map(b => b.year === year ? { ...b, waLink: editWa, fbLink: editFb } : b));
    setEditId(null);
    triggerToast(`Links updated for Class of ${year}!`);
  };

  const handleAddBatch = () => {
    const nextYear = Math.max(...batches.map(b => b.year)) + 1;
    const newRecord = {
      year: nextYear,
      members: 0,
      waLink: `https://chat.whatsapp.com/demo${nextYear}`,
      fbLink: `https://facebook.com/groups/git${nextYear}`,
      status: 'ACTIVE'
    };
    setBatches([newRecord, ...batches]);
    triggerToast(`Added Class of ${nextYear} batch listing!`);
  };

  const handleTestLink = (platform, link) => {
    triggerToast(`Verifying API connection to ${platform}: Redirecting...`);
    setTimeout(() => {
      window.open(link, '_blank');
    }, 500);
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
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-150 pb-5">
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold font-sora text-primary flex items-center gap-2">
              <Share2 className="w-6 h-6 text-accent" />
              <span>Community Manager</span>
            </h1>
            <p className="text-xs text-gray-500 font-sans mt-0.5">
              Administer chat rooms and social channels for graduating batches
            </p>
          </div>
          
          <div>
            <Button
              variant="primary"
              size="sm"
              className="text-xs font-semibold px-4 py-2 hover:scale-[1.02] transition-transform flex items-center gap-1.5"
              onClick={handleAddBatch}
            >
              <Plus className="w-4 h-4" />
              <span>Add Batch Group</span>
            </Button>
          </div>
        </section>

        {/* Info Banner */}
        <section className="bg-blue-50 border-l-4 border-primary p-4 rounded-r-xl shadow-xs">
          <div className="flex gap-3">
            <MessageSquare className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-sora font-semibold text-xs text-primary-dark">
                Automatic Redirection Active
              </h4>
              <p className="text-[11px] text-gray-600 leading-relaxed mt-0.5 font-sans">
                These links are synchronized with the alumni directory. Whenever an alumnus completes verification, their specific batch cards on the Community Hub page link to these channels automatically.
              </p>
            </div>
          </div>
        </section>

        {/* Batches Table Card */}
        <section className="bg-white rounded-xl border border-gray-150 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-[10px] font-bold font-sora text-gray-500 uppercase tracking-wider">Batch Year</th>
                  <th className="px-6 py-3 text-left text-[10px] font-bold font-sora text-gray-500 uppercase tracking-wider">WhatsApp Link</th>
                  <th className="px-6 py-3 text-left text-[10px] font-bold font-sora text-gray-500 uppercase tracking-wider">Facebook Link</th>
                  <th className="px-6 py-3 text-center text-[10px] font-bold font-sora text-gray-500 uppercase tracking-wider">Verified Members</th>
                  <th className="px-6 py-3 text-center text-[10px] font-bold font-sora text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-center text-[10px] font-bold font-sora text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {batches.map((batch) => {
                  const isEditing = editId === batch.year;
                  return (
                    <tr key={batch.year} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold font-sora text-gray-800">Class of {batch.year}</span>
                          {batch.isCurrentUserBatch && (
                            <span className="bg-accent bg-opacity-20 text-accent text-[8px] font-bold font-sora px-1.5 py-0.5 rounded">
                              Your Batch
                            </span>
                          )}
                        </div>
                      </td>

                      {/* WhatsApp cell */}
                      <td className="px-6 py-4">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editWa}
                            onChange={(e) => setEditWa(e.target.value)}
                            className="px-2 py-1 text-xs border border-gray-250 rounded font-sans focus:outline-none w-full"
                          />
                        ) : (
                          <div className="flex items-center gap-1.5 max-w-[200px]">
                            <MessageSquare className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                            <span className="text-xs text-gray-500 truncate font-mono">{batch.waLink}</span>
                          </div>
                        )}
                      </td>

                      {/* Facebook cell */}
                      <td className="px-6 py-4">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editFb}
                            onChange={(e) => setEditFb(e.target.value)}
                            className="px-2 py-1 text-xs border border-gray-250 rounded font-sans focus:outline-none w-full"
                          />
                        ) : (
                          <div className="flex items-center gap-1.5 max-w-[200px]">
                            <Facebook className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                            <span className="text-xs text-gray-500 truncate font-mono">{batch.fbLink}</span>
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs font-bold text-gray-700 font-sora">
                        {batch.members}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <Badge variant="success" className="text-[8px] font-bold font-sora">
                          {batch.status}
                        </Badge>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-2">
                          {isEditing ? (
                            <button
                              onClick={() => handleSaveClick(batch.year)}
                              className="text-white hover:bg-opacity-95 text-[10px] font-bold font-sora flex items-center gap-0.5 bg-accent px-2 py-1 rounded shadow-xs"
                            >
                              <Check className="w-3 h-3" />
                              <span>Save</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleEditClick(batch)}
                              className="text-gray-600 hover:text-primary text-[10px] font-bold font-sora flex items-center gap-0.5 bg-gray-50 px-2 py-1 rounded border border-gray-100"
                            >
                              <Edit2 className="w-3 h-3" />
                              <span>Edit</span>
                            </button>
                          )}
                          <button
                            onClick={() => handleTestLink('WhatsApp', batch.waLink)}
                            className="text-gray-550 hover:text-accent text-[10px] font-bold font-sora flex items-center gap-0.5 bg-gray-50 px-2 py-1 rounded border border-gray-100"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Test</span>
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </div>
  );
};

export default CommunityManager;
