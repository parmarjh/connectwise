import React from 'react';
import type { Company } from '../types';
import { BriefcaseIcon, ExternalLinkIcon, DollarIcon } from './icons';

interface CompanyCardProps {
  company: Company;
  onSelect: () => void;
  isSelected: boolean;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company, onSelect, isSelected }) => {
  return (
    <div
      onClick={onSelect}
      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
        isSelected ? 'bg-base-300 border-brand-primary shadow-lg' : 'bg-base-200 border-base-300 hover:border-brand-light'
      }`}
    >
      <div className="flex items-center space-x-4">
        <img
          src={company.logo_url || 'https://picsum.photos/seed/placeholder/100'}
          alt={`${company.name} logo`}
          className="w-16 h-16 rounded-lg object-cover border-2 border-base-300 flex-shrink-0"
        />
        <div className="flex-1">
          <div className="flex items-baseline gap-x-2 flex-wrap">
            <h3 className="text-xl font-bold text-gray-100">{company.name}</h3>
            <a
              href={`https://${company.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-sm text-gray-400 hover:text-brand-light transition-colors flex items-center gap-1"
            >
              <span>{company.domain}</span>
              <ExternalLinkIcon className="w-3.5 h-3.5" />
            </a>
          </div>
          <p className="text-sm text-brand-light">{company.industry}</p>
        </div>
      </div>
      
      <p className="mt-4 text-gray-300 text-sm">{company.description}</p>

      {/* New combined section for funding and hiring signals */}
      <div className="mt-4 pt-4 border-t border-base-300">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 text-sm">
          {/* Funding Stage Column */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <DollarIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <h4 className="font-semibold text-gray-300">Funding Stage</h4>
            </div>
            <span className="ml-7 px-2.5 py-1 bg-gray-600 text-gray-200 text-xs font-medium rounded-full">
              {company.funding_stage}
            </span>
          </div>
          
          {/* Hiring Signals Column */}
          {company.hiring_signals && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BriefcaseIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <h4 className="font-semibold text-gray-300">Hiring For</h4>
              </div>
              <div className="flex flex-wrap gap-2 ml-7">
                {company.hiring_signals.roles.map((role) => (
                  <span key={role} className="px-2.5 py-1 bg-brand-dark text-brand-light text-xs font-medium rounded-full">
                    {role}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};