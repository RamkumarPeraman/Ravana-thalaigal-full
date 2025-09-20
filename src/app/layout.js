import './globals.css'

export const metadata = {
  title: 'Raavana Thalaigal Trust - Tamil Nadu',
  description: 'NGO dedicated to serving communities in Tamil Nadu',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  )
}
