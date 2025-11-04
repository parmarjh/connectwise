
import React, { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { AIChatbox } from './components/AIChatbox';
import { CompanyCard } from './components/CompanyCard';
import { GDPRConsent } from './components/GDPRConsent';
import { MOCK_COMPANIES } from './data/companies';
import type { Company } from './types';
import { LoadingIcon } from './components/icons';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Select the first company by default on initial load
    if (MOCK_COMPANIES.length > 0) {
      setFilteredCompanies(MOCK_COMPANIES);
      setSelectedCompany(MOCK_COMPANIES[0]);
    }
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsLoading(true);
    setSelectedCompany(null);

    // Simulate API call delay
    setTimeout(() => {
      if (!query) {
        setFilteredCompanies(MOCK_COMPANIES);
        setIsLoading(false);
        return;
      }
      const lowercasedQuery = query.toLowerCase();
      const results = MOCK_COMPANIES.filter(
        (company) =>
          company.name.toLowerCase().includes(lowercasedQuery) ||
          company.description.toLowerCase().includes(lowercasedQuery) ||
          company.industry.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredCompanies(results);
      setIsLoading(false);
    }, 500);
  };

  const handleSelectCompany = (company: Company) => {
    setSelectedCompany(company);
  };

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen">
      <GDPRConsent />
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-light text-transparent bg-clip-text">
          ConnectWise AI
        </h1>
        <p className="text-lg text-gray-400">
          Discover company insights and market intelligence ethically.
        </p>
      </header>

      <main>
        <SearchBar onSearch={handleSearch} className="mb-8 max-w-2xl mx-auto" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Company Results */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-200">Company Results</h2>
            {isLoading && (
              <div className="flex justify-center items-center h-64">
                <LoadingIcon className="w-8 h-8" />
              </div>
            )}
            {!isLoading && filteredCompanies.length === 0 && searchQuery && (
              <div className="bg-base-200 p-6 rounded-lg text-center">
                <p>No companies found for "{searchQuery}".</p>
                <p className="text-sm text-gray-400">Try a different keyword or an empty search to see all companies.</p>
              </div>
            )}
            {!isLoading && (
              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                {filteredCompanies.map((company) => (
                  <CompanyCard
                    key={company.id}
                    company={company}
                    onSelect={() => handleSelectCompany(company)}
                    isSelected={selectedCompany?.id === company.id}
                  />
                ))}
              </div>
            )}
          </section>

          {/* AI Chatbox */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-200">AI Assistant</h2>
            <AIChatbox selectedCompany={selectedCompany} />
          </section>
        </div>
      </main>
    </div>
  );
}
