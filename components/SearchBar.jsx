"use client"
import React from 'react'

export default function SearchBar({ value, onChange, placeholder = 'Search by name, email, company' }) {
  return (
    <div className="flex items-center bg-gray-800 rounded-md px-3 py-2 w-full">
      <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7 7 0 1116.65 16.65z" />
      </svg>
      <input
        className="bg-transparent outline-none w-full text-sm text-gray-100"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button onClick={() => onChange('')} className="text-gray-400 text-sm ml-2">Clear</button>
      )}
    </div>
  )
}
