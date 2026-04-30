import React from 'react'
import PropTypes from 'prop-types'

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-64 bg-gray-900 text-gray-100 h-full border-r border-gray-800 flex-col">
      {/* Logo */}
      <div className="px-6 py-8 border-b border-gray-800">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">📊</div>
          <div>
            <div className="text-lg font-bold">Sales OS</div>
            <div className="text-xs text-gray-400">AI CRM</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        <NavLink href="/" icon="📈">Dashboard</NavLink>
        <NavLink href="/leads" icon="👥" active>Leads</NavLink>
        <NavLink href="/settings" icon="⚙️">Settings</NavLink>
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-800 text-xs text-gray-500">
        <p>v1.0 Beta</p>
      </div>
    </aside>
  )
}

function NavLink({ href, icon, children, active }) {
  return (
    <a
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
        active
          ? 'bg-blue-600 text-white'
          : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-medium">{children}</span>
    </a>
  )
}

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  active: PropTypes.bool,
}
