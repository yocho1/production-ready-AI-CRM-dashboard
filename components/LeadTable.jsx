"use client"
import React from 'react'
import PropTypes from 'prop-types'
import Badge from './Badge'

export default function LeadTable({ leads = [], onRowClick = () => {} }) {
  const formatPreview = (text, limit) => {
    if (!text) return '-'
    if (text.length <= limit) return text
    return `${text.slice(0, limit)}…`
  }

  if (leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-gray-850/50 rounded-xl border border-gray-800 backdrop-blur-sm text-center px-4">
        <svg className="w-12 h-12 text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-gray-400 text-sm font-medium">No leads found</p>
        <p className="text-gray-500 text-xs mt-1">Adjust your filters or create your first lead</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-800 shadow-xl bg-gray-850/50 backdrop-blur-sm">
      <table className="min-w-full divide-y divide-gray-800/50">
        <thead className="bg-gray-800/50 text-gray-300 text-xs uppercase tracking-wider font-semibold">
          <tr>
            <th className="px-4 py-4 sm:px-6 text-left">Name</th>
            <th className="px-4 py-4 sm:px-6 text-left">Company</th>
            <th className="px-4 py-4 sm:px-6 text-left">Lead Score</th>
            <th className="hidden md:table-cell px-6 py-4 text-left">Summary</th>
            <th className="hidden lg:table-cell px-6 py-4 text-left">Next Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800/50">
          {leads.map((lead) => (
            (() => {
              const summaryText = formatPreview(lead.summary, 80)
              const actionText = formatPreview(lead.next_action, 50)

              return (
            <tr
              key={lead.id}
              className="hover:bg-gray-800/30 cursor-pointer transition duration-200 ease-in-out border-b border-gray-800/20"
              onClick={() => onRowClick(lead)}
            >
              <td className="px-4 py-4 sm:px-6 text-sm font-medium text-gray-100">{lead.name || lead.email}</td>
              <td className="px-4 py-4 sm:px-6 text-sm text-gray-400">{lead.company || '-'}</td>
              <td className="px-4 py-4 sm:px-6 text-sm">
                {lead.lead_score === 'High' ? <Badge variant="high">High</Badge> : <Badge variant="medium">Medium</Badge>}
              </td>
              <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-500">{summaryText}</td>
              <td className="hidden lg:table-cell px-6 py-4 text-sm text-gray-500">{actionText}</td>
            </tr>
              )
            })()
          ))}
        </tbody>
      </table>
    </div>
  )
}

LeadTable.propTypes = {
  leads: PropTypes.array,
  onRowClick: PropTypes.func,
}
