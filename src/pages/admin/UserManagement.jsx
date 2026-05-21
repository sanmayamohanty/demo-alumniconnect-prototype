import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import AdminSidebar from '../../components/layout/AdminSidebar';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import { 
  Users, 
  Search, 
  Download, 
  Upload, 
  Plus, 
  CheckCircle, 
  XCircle, 
  Edit, 
  Trash2, 
  UploadCloud, 
  AlertCircle,
  X
} from 'lucide-react';

export const UserManagement = () => {
  const { institution } = useApp();
  const [toastMessage, setToastMessage] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBatch, setFilterBatch] = useState('all');
  const [filterBranch, setFilterBranch] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const [users, setUsers] = useState([
    { id: 1, name: 'Priya Krishnan', email: 'priya@amazon.com', batch: 2015, branch: 'ECE', source: 'Self-Registered', status: 'APPROVED' },
    { id: 2, name: 'Rahul Sharma', email: 'rahul@microsoft.com', batch: 2014, branch: 'CS', source: 'Self-Registered', status: 'APPROVED' },
    { id: 6, name: 'Arun Thomas', email: 'arun.t@gmail.com', batch: 2017, branch: 'CS', source: 'Self-Registered', status: 'PENDING' },
    { id: 10, name: 'Karthik Reddy', email: 'kreddy@startups.co', batch: 2018, branch: 'CS', source: 'CSV Import', status: 'PENDING' },
    { id: 13, name: 'Sanjay Dutt', email: 'sdutt@bolly.com', batch: 2012, branch: 'ME', source: 'CSV Import', status: 'REJECTED' },
  ]);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleStatusChange = (id, name, newStatus) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: newStatus } : u));
    triggerToast(`Status for ${name} updated to ${newStatus}.`);
  };

  const handleAddUser = () => {
    alert('In the live portal, this opens a modal form to add a single user record manually.');
  };

  const handleDownloadTemplate = () => {
    triggerToast('Downloading CSV Template: gitc_alumni_template.csv');
  };

  const handleBulkUpload = (e) => {
    e.preventDefault();
    setShowUploadModal(false);
    triggerToast('CSV parsed successfully: 142 new records imported in PENDING state.');
  };

  // Filter logic
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBatch = filterBatch === 'all' || user.batch === Number(filterBatch);
    const matchesBranch = filterBranch === 'all' || user.branch === filterBranch;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesBatch && matchesBranch && matchesStatus;
  });

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
        <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-gray-150 pb-5">
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold font-sora text-primary flex items-center gap-2">
              <Users className="w-6 h-6 text-accent" />
              <span>User Management</span>
            </h1>
            <p className="text-xs text-gray-500 font-sans mt-0.5">
              Review, approve, and manage registered alumni accounts
            </p>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              className="text-xs font-semibold px-3 py-2 bg-white text-gray-700 border-gray-200 flex items-center gap-1.5"
              onClick={handleDownloadTemplate}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CSV Template</span>
            </Button>
            <Button
              variant="accent"
              size="sm"
              className="text-xs font-semibold px-3 py-2 flex items-center gap-1.5"
              onClick={() => setShowUploadModal(true)}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Bulk Upload CSV</span>
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="text-xs font-semibold px-3 py-2 flex items-center gap-1.5"
              onClick={handleAddUser}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Manually</span>
            </Button>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="bg-white p-4 rounded-xl border border-gray-150 shadow-xs grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 w-full text-xs font-sans border border-gray-200 rounded-md focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <select
              value={filterBatch}
              onChange={(e) => setFilterBatch(e.target.value)}
              className="px-3 py-2 w-full text-xs font-sans border border-gray-200 rounded-md bg-white focus:outline-none focus:border-accent text-gray-600"
            >
              <option value="all">All Batches</option>
              <option value="2015">Batch 2015</option>
              <option value="2014">Batch 2014</option>
              <option value="2017">Batch 2017</option>
              <option value="2018">Batch 2018</option>
              <option value="2012">Batch 2012</option>
            </select>
          </div>

          <div>
            <select
              value={filterBranch}
              onChange={(e) => setFilterBranch(e.target.value)}
              className="px-3 py-2 w-full text-xs font-sans border border-gray-200 rounded-md bg-white focus:outline-none focus:border-accent text-gray-600"
            >
              <option value="all">All Branches</option>
              <option value="CS">Computer Science (CS)</option>
              <option value="ECE">Electronics (ECE)</option>
              <option value="ME">Mechanical (ME)</option>
            </select>
          </div>

          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 w-full text-xs font-sans border border-gray-200 rounded-md bg-white focus:outline-none focus:border-accent text-gray-600"
            >
              <option value="all">All Statuses</option>
              <option value="APPROVED">Approved</option>
              <option value="PENDING">Pending</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </section>

        {/* Users Table */}
        <section className="bg-white rounded-xl border border-gray-150 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-[10px] font-bold font-sora text-gray-500 uppercase tracking-wider">Name / Email</th>
                  <th className="px-6 py-3 text-center text-[10px] font-bold font-sora text-gray-500 uppercase tracking-wider">Batch</th>
                  <th className="px-6 py-3 text-center text-[10px] font-bold font-sora text-gray-500 uppercase tracking-wider">Branch</th>
                  <th className="px-6 py-3 text-center text-[10px] font-bold font-sora text-gray-500 uppercase tracking-wider">Source</th>
                  <th className="px-6 py-3 text-center text-[10px] font-bold font-sora text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-center text-[10px] font-bold font-sora text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-10 text-center text-xs text-gray-400 font-sans">
                      No alumni matches found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-xs font-bold font-sora text-gray-800">{user.name}</div>
                        <div className="text-[10px] text-gray-400 font-sans mt-0.5">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs font-semibold text-gray-700 font-sora">
                        {user.batch}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs font-semibold text-gray-700 font-sans">
                        {user.branch}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-[10px] text-gray-500 font-medium font-sans">
                        {user.source}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <Badge 
                          variant={user.status === 'APPROVED' ? 'success' : user.status === 'PENDING' ? 'warning' : 'danger'}
                          className="text-[9px] font-bold font-sora"
                        >
                          {user.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-2">
                          {user.status === 'PENDING' ? (
                            <>
                              <button
                                onClick={() => handleStatusChange(user.id, user.name, 'APPROVED')}
                                className="text-emerald-600 hover:text-emerald-800 text-[10px] font-bold font-sora flex items-center gap-0.5 bg-emerald-50 px-2 py-1 rounded border border-emerald-100"
                              >
                                <CheckCircle className="w-3 h-3" />
                                <span>Approve</span>
                              </button>
                              <button
                                onClick={() => handleStatusChange(user.id, user.name, 'REJECTED')}
                                className="text-rose-600 hover:text-rose-800 text-[10px] font-bold font-sora flex items-center gap-0.5 bg-rose-50 px-2 py-1 rounded border border-rose-100"
                              >
                                <XCircle className="w-3 h-3" />
                                <span>Reject</span>
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => alert(`Edit profile details for ${user.name}`)}
                                className="text-gray-600 hover:text-primary text-[10px] font-bold font-sora flex items-center gap-0.5 bg-gray-50 px-2 py-1 rounded border border-gray-100"
                              >
                                <Edit className="w-3 h-3" />
                                <span>Edit</span>
                              </button>
                              {user.status === 'APPROVED' && (
                                <button
                                  onClick={() => handleStatusChange(user.id, user.name, 'REJECTED')}
                                  className="text-rose-600 hover:text-rose-800 text-[10px] font-bold font-sora flex items-center gap-0.5 bg-rose-50 px-2 py-1 rounded border border-rose-100"
                                >
                                  <Trash2 className="w-3 h-3" />
                                  <span>Revoke</span>
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Bulk Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-[#0F2238] bg-opacity-50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
            <Card className="w-full max-w-md p-6 border border-gray-100 shadow-2xl relative bg-white">
              <button 
                onClick={() => setShowUploadModal(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div className="text-center space-y-1">
                  <h3 className="text-base font-extrabold font-sora text-primary flex items-center justify-center gap-2">
                    <UploadCloud className="w-5 h-5 text-accent" />
                    <span>Bulk Upload Alumni CSV</span>
                  </h3>
                  <p className="text-xs text-gray-500 font-sans">
                    Import multiple records at once to speed up onboarding
                  </p>
                </div>

                <form onSubmit={handleBulkUpload} className="space-y-4">
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-2 hover:border-accent transition-all cursor-pointer">
                    <UploadCloud className="w-8 h-8 text-gray-300" />
                    <div>
                      <p className="text-xs font-bold text-gray-700">Drag and drop your CSV here</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">Max size: 5MB (Excel / CSV format)</p>
                    </div>
                  </div>

                  <div className="bg-amber-50 border-l-3 border-accent p-3 rounded-r-lg flex gap-2.5 items-start">
                    <AlertCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <div className="text-[10px] text-amber-800 leading-relaxed font-sans">
                      <span className="font-bold">Required columns:</span> full_name, email, batch_year, branch_code, roll_no. Missing values will default to PENDING status.
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      type="button"
                      size="sm"
                      className="w-1/2 text-xs font-bold"
                      onClick={() => setShowUploadModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="accent"
                      type="submit"
                      size="sm"
                      className="w-1/2 text-xs font-bold"
                    >
                      Parse & Import
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
          </div>
        )}

      </main>
    </div>
  );
};

export default UserManagement;
