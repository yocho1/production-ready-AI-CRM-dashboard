'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { supabase } from '../../lib/supabase'
import LeadTable from '../../components/LeadTable'
import LeadFilters from '../../components/LeadFilters'
import LeadDetailPanel from '../../components/LeadDetailPanel'
import ChatPanel from '../../components/ChatPanel'
import useDebounce from '../../lib/useDebounce'

export default function LeadsPage() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [selectedScore, setSelectedScore] = useState('')
  const [selectedCompany, setSelectedCompany] = useState('')
  const [companies, setCompanies] = useState([])
  const [selectedLead, setSelectedLead] = useState(null)
  const [chatOpen, setChatOpen] = useState(false)

  const debouncedSearch = useDebounce(search, 400)

  const fetchCompanies = useCallback(async () => {
    const { data, error } = await supabase.from('leads').select('company')
    if (error) {
      console.error('[fetchCompanies] Supabase error:', error)
      return
    }
    console.log('[fetchCompanies] Data:', data)
    const list = Array.from(
      new Set((data || []).map((r) => r.company).filter(Boolean)),
    )
    console.log('[fetchCompanies] Unique companies:', list)
    setCompanies(list)
  }, [])

  const fetchLeads = useCallback(
    async (showLoading = true) => {
      if (showLoading) setLoading(true)
      setError(null)
      try {
        let query = supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false })

        if (selectedScore) query = query.eq('lead_score', selectedScore)
        if (selectedCompany) query = query.eq('company', selectedCompany)
        if (debouncedSearch) {
          const term = debouncedSearch.split('%').join('')
          query = query.or(
            `name.ilike.%${term}%,email.ilike.%${term}%,company.ilike.%${term}%`,
          )
        }

        const { data, error } = await query
        if (error) {
          console.error('[fetchLeads] Supabase error:', error)
          const errorMsg = error.message || 'Failed to load leads'
          setError(errorMsg)
          setLeads([])
        } else {
          console.log('[fetchLeads] Success, lead count:', data?.length)
          setLeads(data || [])
          setError(null)
        }
      } catch (err) {
        console.error('[fetchLeads] Catch error:', err)
        setError(err.message || 'Network error')
        setLeads([])
      } finally {
        if (showLoading) setLoading(false)
      }
    },
    [selectedScore, selectedCompany, debouncedSearch],
  )

  useEffect(() => {
    fetchCompanies()
  }, [fetchCompanies])

  useEffect(() => {
    // Diagnostic: test RLS access
    supabase
      .from('leads')
      .select('count()', { count: 'exact' })
      .then(({ data, error, count }) => {
        if (error) console.error('[RLS Diagnostic] Error:', error.message)
        else console.log('[RLS Diagnostic] Accessible rows:', count)
      })
  }, [])

  useEffect(() => {
    fetchLeads()
  }, [fetchLeads])

  useEffect(() => {
    const channel = supabase
      .channel('leads-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'leads' },
        async () => {
          await Promise.all([fetchLeads(false), fetchCompanies()])
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchCompanies, fetchLeads])

  function handleRowClick(lead) {
    setSelectedLead(lead)
  }

  function clearFilters() {
    setSearch('')
    setSelectedScore('')
    setSelectedCompany('')
  }

  return (
    <div>
      <div className='mb-6 sm:mb-8'>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6'>
          <div className='min-w-0'>
            <h1 className='text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent'>
              Leads
            </h1>
            <p className='text-gray-400 text-sm mt-2 max-w-prose'>
              Manage and nurture your sales pipeline
            </p>
          </div>
          <div className='flex items-center justify-between sm:justify-end gap-3 rounded-2xl border border-white/5 bg-white/5 px-4 py-3 sm:px-0 sm:py-0 sm:border-0 sm:bg-transparent'>
            <div className='text-right'>
              <div className='text-sm text-gray-400'>Total Leads</div>
              <div className='text-2xl font-bold text-white'>
                {leads.length}
              </div>
            </div>
            <div className='w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-xl'>
              👥
            </div>
          </div>
        </div>
      </div>

      <LeadFilters
        companies={companies}
        selectedScore={selectedScore}
        setSelectedScore={setSelectedScore}
        selectedCompany={selectedCompany}
        setSelectedCompany={setSelectedCompany}
        search={search}
        setSearch={setSearch}
        onClear={clearFilters}
      />

      {error && (
        <div className='bg-red-900/10 border border-red-700/30 rounded-xl p-5 mb-6 text-red-200 backdrop-blur-sm'>
          <div className='flex items-start gap-3'>
            <svg
              className='w-5 h-5 flex-shrink-0 mt-0.5'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                clipRule='evenodd'
              />
            </svg>
            <div>
              <p className='font-semibold'>Connection Error</p>
              <p className='text-sm mt-1'>{error}</p>
              <p className='text-xs mt-2 text-red-300/70'>
                Check your internet connection or Supabase configuration
              </p>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className='space-y-3'>
          <div className='skeleton h-16 rounded-xl' />
          <div className='skeleton h-96 rounded-xl' />
        </div>
      ) : (
        <LeadTable leads={leads} onRowClick={handleRowClick} />
      )}

      {/* Backdrop */}
      {selectedLead && (
        <button
          type='button'
          aria-label='Close lead details overlay'
          className='fixed inset-0 bg-black/50 z-40'
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              setSelectedLead(null)
            }
          }}
          onClick={() => setSelectedLead(null)}
        >
          <span className='sr-only'>Close lead details overlay</span>
        </button>
      )}

      {/* Detail Panel */}
      <LeadDetailPanel
        lead={selectedLead}
        onMarkDone={async (lead) => {
          if (!lead?.id) return

          const { error: updateError } = await supabase
            .from('leads')
            .update({ next_action: 'Completed' })
            .eq('id', lead.id)

          if (updateError) {
            setError(updateError.message || 'Failed to update lead')
            return
          }

          setSelectedLead(null)
          await fetchLeads(false)
        }}
        onSendEmail={(lead) => {
          const subject = encodeURIComponent(
            `Following up with ${lead.name || lead.email}`,
          )
          const body = encodeURIComponent(
            lead.email_draft ||
              lead.message ||
              'Hi, I wanted to follow up on our conversation.',
          )
          globalThis.location.href = `mailto:${lead.email}?subject=${subject}&body=${body}`
        }}
        onClose={() => setSelectedLead(null)}
      />

      {/* Chat Panel */}
      <ChatPanel
        leads={leads}
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
      />

      {/* Floating Chat Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 z-40 ${
          chatOpen
            ? 'bg-blue-600 hover:bg-blue-700'
            : 'bg-blue-600 hover:bg-blue-700 hover:scale-110'
        }`}
        title='Open AI Assistant'
      >
        <svg
          className='w-6 h-6 text-white'
          fill='currentColor'
          viewBox='0 0 20 20'
        >
          <path d='M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z' />
          <path d='M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm2 1a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V6zm6-1a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V6z' />
        </svg>
      </button>
    </div>
  )
}
