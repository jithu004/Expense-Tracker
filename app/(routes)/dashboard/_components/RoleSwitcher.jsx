"use client";
import { useRole } from '../_context/RoleContext';
import { Shield, Eye } from 'lucide-react';

export default function RoleSwitcher() {
  const { role, setRole } = useRole();

  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg 
                    bg-slate-100 dark:bg-slate-800 border 
                    border-slate-200 dark:border-slate-700">
      <div className="flex rounded-md overflow-hidden border 
                      border-slate-300 dark:border-slate-600 text-xs font-medium">
        <button
          onClick={() => setRole('admin')}
          className={`flex items-center gap-1 px-3 py-1.5 transition-colors
            ${role === 'admin'
              ? 'bg-indigo-600 text-white'
              : 'bg-white dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-slate-50'
            }`}
        >
          <Shield className="h-3 w-3" />
          Admin
        </button>
        <button
          onClick={() => setRole('viewer')}
          className={`flex items-center gap-1 px-3 py-1.5 transition-colors
            ${role === 'viewer'
              ? 'bg-indigo-600 text-white'
              : 'bg-white dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-slate-50'
            }`}
        >
          <Eye className="h-3 w-3" />
          Viewer
        </button>
      </div>
    </div>
  );
}