import React, { useState } from 'react';
import { Clock, Activity, Monitor, ShieldCheck, Search } from 'lucide-react';
import { useAuditLogs } from '../../hooks/useAuditLog';
import Pagination from '../../components/common/Pagination';

const AuditLogs = () => {
  const { logs, loading, error } = useAuditLogs();
  const [searchTerm, setSearchTerm] = useState("");
  const ITEMS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const filteredLogs = logs
    .filter(
      (log) =>
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.module.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const totalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE);

  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );


  const getActionStyle = (action) => {
    switch (action.toUpperCase()) {
      case 'CREATE': return 'bg-green-100 text-green-700 border-green-200';
      case 'DELETE': return 'bg-red-100 text-red-700 border-red-200';
      case 'UPDATE': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };


  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading audit logs...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <ShieldCheck className="text-indigo-600" />
              System Audit Logs
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Track all administrative actions and system changes
            </p>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by action or module..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none w-full md:w-64"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col min-h-[500px]">

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-nowrap">Timestamp</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-nowrap">Module</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-nowrap">User Agent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        {new Date(log.createdAt).toLocaleString("en-IN", {
                          timeZone: "Asia/Kolkata",
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: true,
                        })}
                      </div>

                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${getActionStyle(log.action)}`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                      {log.module}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-md">
                      {log.description}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-xs text-gray-400 max-w-[200px] truncate" title={log.userAgent}>
                        <Monitor className="w-3.5 h-3.5 flex-shrink-0" />
                        {log.userAgent}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {logs.length === 0 && (
            <div className="py-20 text-center">
              <Activity className="w-12 h-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-500">No audit logs found.</p>
            </div>
          )}


        </div>
      </div>
      {totalPages > 1 && (
        <div className="mt-auto border-t border-gray-100 ">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AuditLogs;