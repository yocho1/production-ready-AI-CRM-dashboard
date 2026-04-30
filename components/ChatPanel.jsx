"use client"
import React from 'react'
import PropTypes from 'prop-types'

export default function ChatPanel({ leads = [], isOpen, onClose }) {
  const quickPrompts = [
    'Summarize my pipeline',
    'Show high priority leads',
    'Which lead needs attention?',
  ]

  const [messages, setMessages] = React.useState([
    {
      id: 1,
      type: 'bot',
      text: 'I can help you review your pipeline, surface priorities, and suggest next actions.',
    },
  ])
  const [input, setInput] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const messagesEndRef = React.useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateMockResponse = (query) => {
    const q = query.toLowerCase()

    if (
      q.includes('high') ||
      q.includes('priority') ||
      q.includes('urgent') ||
      q.includes('important')
    ) {
      const highScoreLeads = leads.filter((lead) => lead.lead_score === 'High')
      if (highScoreLeads.length === 0) {
        return "You don't have any high-priority leads right now. Keep nurturing your pipeline."
      }

      return `You have ${highScoreLeads.length} high-priority leads:\n\n${highScoreLeads
        .map((lead) => `• ${lead.name} (${lead.company}) - ${lead.next_action || 'No next action set yet'}`)
        .join('\n')}`
    }

    if (q.includes('what') && q.includes('lead')) {
      if (leads.length === 0) {
        return 'You have no leads yet. Create your first lead to get started.'
      }

      const randomLead = leads[Math.floor(Math.random() * leads.length)]
      return `Here is a suggestion for ${randomLead.name}:\n\n${randomLead.next_action || 'Send a follow-up email to learn more about their needs.'}`
    }

    if (q.includes('summarize') || q.includes('summary')) {
      if (leads.length === 0) {
        return 'No leads to summarize yet. Keep building your pipeline.'
      }

      const highCount = leads.filter((lead) => lead.lead_score === 'High').length
      const mediumCount = leads.filter((lead) => lead.lead_score === 'Medium').length
      return `Lead Summary:\n• Total leads: ${leads.length}\n• High priority: ${highCount}\n• Medium priority: ${mediumCount}\n\nFocus on the highest-intent leads first.`
    }

    if (q.includes('count') || q.includes('how many')) {
      return `You have ${leads.length} leads in your pipeline. ${leads.length > 0 ? 'Keep momentum.' : 'Time to start building your pipeline.'}`
    }

    return `I can see ${leads.length} leads right now. Try asking about high-priority leads, summaries, or the next action for a specific lead.`
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const prompt = input.trim()
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: prompt,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        text: generateMockResponse(prompt),
      }
      setMessages((prev) => [...prev, botResponse])
      setLoading(false)
    }, 600)
  }

  const handleQuickPrompt = (prompt) => {
    setInput(prompt)
  }

  if (!isOpen) return null

  return (
    <>
      <button
        type="button"
        aria-label="Close AI assistant overlay"
        className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px]"
        onClick={onClose}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            onClose()
          }
        }}
      >
        <span className="sr-only">Close AI assistant overlay</span>
      </button>

      <aside className="fixed inset-0 sm:inset-y-4 sm:right-4 z-50 flex w-full sm:w-[420px] flex-col overflow-hidden rounded-none sm:rounded-3xl border-0 sm:border border-white/10 bg-gray-950/95 shadow-2xl backdrop-blur-xl">
        <div className="border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent px-5 py-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/20">
                🤖
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold text-white">AI Assistant</h2>
                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
                    Live
                  </span>
                </div>
                <p className="mt-1 text-xs leading-5 text-gray-400">Pipeline guidance, summaries, and next-best actions</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-gray-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
              aria-label="Close assistant"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-2xl border border-white/5 bg-white/5 px-3 py-2">
              <div className="text-lg font-semibold text-white">{leads.length}</div>
              <div className="text-[11px] uppercase tracking-[0.14em] text-gray-500">Leads</div>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/5 px-3 py-2">
              <div className="text-lg font-semibold text-white">{leads.filter((lead) => lead.lead_score === 'High').length}</div>
              <div className="text-[11px] uppercase tracking-[0.14em] text-gray-500">High</div>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/5 px-3 py-2">
              <div className="text-lg font-semibold text-white">{leads.filter((lead) => lead.lead_score === 'Medium').length}</div>
              <div className="text-[11px] uppercase tracking-[0.14em] text-gray-500">Medium</div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleQuickPrompt(prompt)}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-gray-300 transition hover:border-blue-400/30 hover:bg-blue-500/10 hover:text-white"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[85%] gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${msg.type === 'user' ? 'bg-blue-600 text-white' : 'border border-white/10 bg-white/8 text-gray-200'}`}>
                    {msg.type === 'user' ? 'You' : 'AI'}
                  </div>

                  <div
                    className={`rounded-2xl px-4 py-3 shadow-sm ${
                      msg.type === 'user'
                        ? 'rounded-tr-md bg-gradient-to-br from-blue-600 to-blue-500 text-white'
                        : 'rounded-tl-md border border-white/8 bg-white/5 text-gray-100'
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-sm leading-6">{msg.text}</p>
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="flex max-w-[85%] gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/8 text-xs font-semibold text-gray-200">
                    AI
                  </div>
                  <div className="rounded-2xl rounded-tl-md border border-white/8 bg-white/5 px-4 py-3">
                    <div className="flex gap-2">
                      <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-400/80" />
                      <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-400/80 [animation-delay:120ms]" />
                      <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-400/80 [animation-delay:240ms]" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="border-t border-white/5 bg-gray-950/95 px-4 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-2 shadow-inner shadow-black/20">
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                placeholder="Ask about priorities, next steps, or a lead..."
                className="min-h-[52px] max-h-32 flex-1 resize-none rounded-xl border border-transparent bg-transparent px-3 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none"
                disabled={loading}
                rows={1}
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white transition hover:from-blue-400 hover:to-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Send message"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.94 2.94a1.5 1.5 0 011.62-.32l12 5a1.5 1.5 0 010 2.76l-12 5a1.5 1.5 0 01-2.04-1.38V10.5H10a.75.75 0 000-1.5H2.52V4.32a1.5 1.5 0 01.42-1.38z" />
                </svg>
              </button>
            </div>
          </div>
          <p className="mt-2 text-[11px] leading-5 text-gray-500">Press Enter to send, Shift+Enter for a new line.</p>
        </div>
      </aside>
    </>
  )
}

ChatPanel.propTypes = {
  leads: PropTypes.array,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
}
