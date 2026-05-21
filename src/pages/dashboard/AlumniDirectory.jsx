import React, { useState, useMemo } from 'react';
import { mockAlumni } from '../../data/mockData';
import Sidebar from '../../components/layout/Sidebar';
import AlumniCard from '../../components/features/AlumniCard';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import { Search, Filter, X, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

export const AlumniDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [batchFilter, setBatchFilter] = useState('');
  const [branchFilter, setBranchFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleConnect = (name) => {
    showToast(`Connection request sent to ${name}!`);
  };

  // Extract unique batches, branches, and cities from mockData for dropdowns
  const filterOptions = useMemo(() => {
    const batches = [...new Set(mockAlumni.map(a => a.batch))].sort((a, b) => b - a);
    const branches = [...new Set(mockAlumni.map(a => a.branch))].sort();
    const cities = [...new Set(mockAlumni.map(a => a.city))].sort();
    return { batches, branches, cities };
  }, []);

  // Filtered Alumni list
  const filteredAlumni = useMemo(() => {
    return mockAlumni.filter(alumni => {
      const matchesSearch = 
        alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.employer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.city.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesBatch = batchFilter ? alumni.batch === Number(batchFilter) : true;
      const matchesBranch = branchFilter ? alumni.branch === branchFilter : true;
      const matchesCity = cityFilter ? alumni.city === cityFilter : true;

      return matchesSearch && matchesBatch && matchesBranch && matchesCity;
    });
  }, [searchTerm, batchFilter, branchFilter, cityFilter]);

  const clearFilters = () => {
    setSearchTerm('');
    setBatchFilter('');
    setBranchFilter('');
    setCityFilter('');
  };

  return (
    <div className="min-h-screen flex bg-surface font-sans pb-16 md:pb-0">
      <Sidebar />

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[99999] flex items-center gap-2 bg-green-50 border border-green-200 text-green-850 px-4 py-3 rounded-lg shadow-lg text-xs font-semibold font-sora animate-slide-in backdrop-blur-sm">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <span>{toast}</span>
        </div>
      )}

      <main className="flex-1 md:ml-20 lg:ml-56 p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Header Title & Counter Badge */}
        <section className="flex items-center gap-3 pb-2 border-b border-gray-200">
          <div>
            <h1 className="text-xl font-extrabold font-sora text-primary">Alumni Directory</h1>
            <p className="text-xs text-gray-500 font-sans">Search and network with registered graduates</p>
          </div>
          <Badge variant="primary" className="mt-1 font-sora font-semibold">
            {filteredAlumni.length} of {mockAlumni.length} Profiles
          </Badge>
        </section>

        {/* Filter Bar */}
        <section className="bg-white p-4 rounded-xl border border-gray-150 shadow-xs space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Search */}
            <div className="relative">
              <Input
                placeholder="Search name, employer, city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-8.5" />
            </div>

            {/* Batch Filter */}
            <div className="w-full">
              <label className="block text-[10px] font-semibold text-gray-700 mb-1 font-sora uppercase tracking-wider">
                Batch Year
              </label>
              <select
                value={batchFilter}
                onChange={(e) => setBatchFilter(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              >
                <option value="">All Batches</option>
                {filterOptions.batches.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* Branch Filter */}
            <div className="w-full">
              <label className="block text-[10px] font-semibold text-gray-700 mb-1 font-sora uppercase tracking-wider">
                Branch / Degree
              </label>
              <select
                value={branchFilter}
                onChange={(e) => setBranchFilter(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              >
                <option value="">All Branches</option>
                {filterOptions.branches.map(branch => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>
            </div>

            {/* City Filter */}
            <div className="w-full">
              <label className="block text-[10px] font-semibold text-gray-700 mb-1 font-sora uppercase tracking-wider">
                Current City
              </label>
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              >
                <option value="">All Cities</option>
                {filterOptions.cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Active Chips Row */}
          {(searchTerm || batchFilter || branchFilter || cityFilter) && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mr-1">Active filters:</span>
              
              {searchTerm && (
                <span className="inline-flex items-center gap-1 bg-light text-primary text-xs font-medium px-2 py-0.5 rounded">
                  <span>Search: "{searchTerm}"</span>
                  <button onClick={() => setSearchTerm('')}><X className="w-3 h-3 text-gray-500 hover:text-red-500" /></button>
                </span>
              )}
              {batchFilter && (
                <span className="inline-flex items-center gap-1 bg-light text-primary text-xs font-medium px-2 py-0.5 rounded">
                  <span>Class of {batchFilter}</span>
                  <button onClick={() => setBatchFilter('')}><X className="w-3 h-3 text-gray-500 hover:text-red-500" /></button>
                </span>
              )}
              {branchFilter && (
                <span className="inline-flex items-center gap-1 bg-light text-primary text-xs font-medium px-2 py-0.5 rounded">
                  <span>Branch: {branchFilter}</span>
                  <button onClick={() => setBranchFilter('')}><X className="w-3 h-3 text-gray-500 hover:text-red-500" /></button>
                </span>
              )}
              {cityFilter && (
                <span className="inline-flex items-center gap-1 bg-light text-primary text-xs font-medium px-2 py-0.5 rounded">
                  <span>City: {cityFilter}</span>
                  <button onClick={() => setCityFilter('')}><X className="w-3 h-3 text-gray-500 hover:text-red-500" /></button>
                </span>
              )}

              <button 
                onClick={clearFilters}
                className="text-xs font-bold text-accent hover:text-primary transition-colors ml-auto"
              >
                Clear all
              </button>
            </div>
          )}
        </section>

        {/* Directory Results Grid */}
        {filteredAlumni.length > 0 ? (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlumni.map((alumni) => (
              <AlumniCard
                key={alumni.id}
                alumni={alumni}
                onConnect={() => handleConnect(alumni.name)}
              />
            ))}
          </section>
        ) : (
          <section className="bg-white border border-gray-150 rounded-xl p-16 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center mx-auto border border-gray-100">
              <Filter className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold font-sora text-primary">No Alumni Found</h3>
              <p className="text-xs text-gray-400 font-sans max-w-sm mx-auto leading-relaxed mt-1">
                We couldn't find any results matching your search. Try resetting your filter dropdowns or searching for a different keyword.
              </p>
            </div>
            <Button variant="outline" size="sm" className="font-semibold" onClick={clearFilters}>
              Reset Filters
            </Button>
          </section>
        )}

        {/* Pagination (Visual Only) */}
        {filteredAlumni.length > 0 && (
          <section className="flex items-center justify-between border-t border-gray-200 pt-6">
            <span className="text-xs text-gray-500 font-sans">
              Showing 1-{filteredAlumni.length} of {filteredAlumni.length} alumni
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="opacity-50 cursor-not-allowed" disabled>
                <ChevronLeft className="w-4 h-4 mr-1" />
                <span>Prev</span>
              </Button>
              <Button variant="outline" size="sm" className="opacity-50 cursor-not-allowed" disabled>
                <span>Next</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </section>
        )}

      </main>
    </div>
  );
};

export default AlumniDirectory;
