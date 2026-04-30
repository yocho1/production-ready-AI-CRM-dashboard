"use client"
import React from 'react'
import PropTypes from 'prop-types'

export default function LeadFilters({
  companies = [],
  selectedScore,
  setSelectedScore,
  selectedCompany,
  setSelectedCompany,
  search,
  setSearch,
  onClear,
}) {
  return (
    <div className="space-y-4 mb-6">
      <div className="bg-gray-850/50 rounded-xl border border-gray-800 p-4 sm:p-5 backdrop-blur-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center w-full">
          <div className="flex-1 min-w-0">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search leads..."
              className="w-full bg-gray-800/80 rounded-lg px-4 py-3 text-sm text-gray-100 border border-gray-700/50 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition placeholder-gray-500"
            />
          </div>

          <select
            value={selectedScore}
            onChange={(e) => setSelectedScore(e.target.value)}
            className="w-full lg:w-auto bg-gray-800/80 border border-gray-700/50 text-sm rounded-lg px-4 py-3 text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition cursor-pointer"
          >
            <option value="">All scores</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
          </select>

          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="w-full lg:w-auto bg-gray-800/80 border border-gray-700/50 text-sm rounded-lg px-4 py-3 text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition cursor-pointer"
          >
            <option value="">All companies</option>
            {companies.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {(search || selectedScore || selectedCompany) && (
            <button onClick={onClear} className="w-full lg:w-auto bg-gray-700/50 hover:bg-gray-700 px-4 py-3 rounded-lg text-sm font-medium transition duration-150 text-gray-300 hover:text-white">Clear</button>
          )}
        </div>
      </div>
    </div>
  )
}

LeadFilters.propTypes = {
  companies: PropTypes.arrayOf(PropTypes.string),
  selectedScore: PropTypes.string,
  setSelectedScore: PropTypes.func.isRequired,
  selectedCompany: PropTypes.string,
  setSelectedCompany: PropTypes.func.isRequired,
  search: PropTypes.string,
  setSearch: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
}
