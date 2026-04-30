import '../styles/globals.css'
import Sidebar from '../components/Sidebar'
import PropTypes from 'prop-types'

export const metadata = {
  title: 'AI Sales OS',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <div className='flex min-h-dvh bg-gray-900'>
          <Sidebar />
          <main className='flex-1 min-w-0 overflow-auto'>
            <div className='min-h-dvh p-4 sm:p-6 lg:p-8'>{children}</div>
          </main>
        </div>
      </body>
    </html>
  )
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
}
