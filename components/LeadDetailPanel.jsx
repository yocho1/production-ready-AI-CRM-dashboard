"use client"
import React from 'react'
import PropTypes from 'prop-types'
import Badge from './Badge'

export default function LeadDetailPanel({ lead, onClose, onMarkDone, onSendEmail }) {
  const [copied, setCopied] = React.useState(false)

  if (!lead) return null

  async function handleCopyEmail() {
    if (!lead.email_draft) return

    await navigator.clipboard.writeText(lead.email_draft)
    setCopied(true)
    globalThis.setTimeout(() => setCopied(false), 1500)
  }

  function handleMarkDone() {
    onMarkDone?.(lead)
  }

  function handleSendEmail() {
    onSendEmail?.(lead)
  }

  return (
    <aside className="fixed inset-0 sm:inset-y-4 sm:right-4 z-50 flex w-full sm:w-full sm:max-w-md flex-col overflow-hidden rounded-none sm:rounded-3xl border border-white/10 bg-gray-950/95 shadow-xl backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-white">Lead Details</h2>
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-300">
                CRM
              </span>
            </div>
            <p className="mt-1 text-xs leading-5 text-gray-400">Review context, draft copy, and next steps</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-gray-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
            aria-label="Close lead details"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mt-4 rounded-3xl border border-white/5 bg-white/5 p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-white break-words">{lead.name || 'Unknown'}</h3>
              <p className="mt-1 text-sm text-gray-400 break-words">{lead.email}</p>
            </div>
            <Badge variant={lead.lead_score === 'High' ? 'high' : 'medium'}>
              {lead.lead_score || 'N/A'}
            </Badge>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="rounded-2xl border border-white/5 bg-black/20 px-3 py-2">
              <div className="text-[10px] uppercase tracking-[0.18em] text-gray-500">Company</div>
              <div className="mt-1 font-medium text-gray-100 break-words">{lead.company || '-'}</div>
            </div>
            <div className="rounded-2xl border border-white/5 bg-black/20 px-3 py-2">
              <div className="text-[10px] uppercase tracking-[0.18em] text-gray-500">Source</div>
              <div className="mt-1 font-medium text-gray-100 break-words">{lead.source || '-'}</div>
            </div>
            <div className="rounded-2xl border border-white/5 bg-black/20 px-3 py-2">
              <div className="text-[10px] uppercase tracking-[0.18em] text-gray-500">Created</div>
              <div className="mt-1 font-medium text-gray-100">
                {lead.created_at ? new Date(lead.created_at).toLocaleDateString() : '-'}
              </div>
            </div>
            <div className="rounded-2xl border border-white/5 bg-black/20 px-3 py-2">
              <div className="text-[10px] uppercase tracking-[0.18em] text-gray-500">Status</div>
              <div className="mt-1 font-medium text-gray-100">Active</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {lead.summary && (
          <section className="rounded-3xl border border-white/5 bg-white/5 p-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">Summary</h4>
            <p className="mt-3 text-sm leading-6 text-gray-200">{lead.summary}</p>
          </section>
        )}

        {lead.next_action && (
          <section className="rounded-3xl border border-amber-400/15 bg-amber-400/8 p-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200/80">Next Action</h4>
            <p className="mt-3 text-sm leading-6 text-amber-50">{lead.next_action}</p>
          </section>
        )}

        {lead.email_draft && (
          <section className="rounded-3xl border border-white/5 bg-white/5 p-4">
            <div className="flex items-center justify-between gap-3">
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">Email Draft</h4>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-gray-200 transition hover:border-blue-400/30 hover:bg-blue-500/10 hover:text-white"
              >
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <div className="mt-3 max-h-56 overflow-y-auto rounded-2xl border border-white/5 bg-black/20 p-4 text-sm leading-6 text-gray-200 whitespace-pre-wrap">
              {lead.email_draft}
            </div>
          </section>
        )}

        {lead.message && (
          <section className="rounded-3xl border border-white/5 bg-white/5 p-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">Message</h4>
            <p className="mt-3 text-sm leading-6 text-gray-200">{lead.message}</p>
          </section>
        )}
      </div>

      <div className="border-t border-white/5 bg-gray-950/95 px-4 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleSendEmail}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:from-blue-400 hover:to-blue-500"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.94 2.94a1.5 1.5 0 011.62-.32l12 5a1.5 1.5 0 010 2.76l-12 5a1.5 1.5 0 01-2.04-1.38V10.5H10a.75.75 0 000-1.5H2.52V4.32a1.5 1.5 0 01.42-1.38z" />
            </svg>
            Send Email
          </button>
          <button
            type="button"
            onClick={handleMarkDone}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-gray-200 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            Mark Done
          </button>
        </div>
      </div>
    </aside>
  )
}

LeadDetailPanel.propTypes = {
  lead: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    email: PropTypes.string,
    company: PropTypes.string,
    source: PropTypes.string,
    created_at: PropTypes.string,
    lead_score: PropTypes.string,
    summary: PropTypes.string,
    email_draft: PropTypes.string,
    next_action: PropTypes.string,
    message: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  onMarkDone: PropTypes.func,
  onSendEmail: PropTypes.func,
}
