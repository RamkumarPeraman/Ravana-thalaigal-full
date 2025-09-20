'use client'
import { useRef } from 'react'
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import Navigation from '@/app/components/Navigation'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28EFF']

const eventsData = [
  { name: 'Completed', value: 30 },
  { name: 'Pending', value: 8 },
]

const participantsData = [
  { name: 'Volunteers', value: 75 },
  { name: 'Members', value: 120 },
  { name: 'Training Sessions', value: 5 },
]

const donationsData = [{ name: 'Donations', value: 15400.5 }]

export default function ReportsPage() {
  const reportRef = useRef(null)

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new()

    const sheetEvents = XLSX.utils.json_to_sheet(eventsData)
    XLSX.utils.book_append_sheet(workbook, sheetEvents, 'Events')

    const sheetParticipants = XLSX.utils.json_to_sheet(participantsData)
    XLSX.utils.book_append_sheet(workbook, sheetParticipants, 'Participants')

    const sheetDonations = XLSX.utils.json_to_sheet(donationsData)
    XLSX.utils.book_append_sheet(workbook, sheetDonations, 'Donations')

    XLSX.writeFile(workbook, 'report.xlsx')
  }

  const exportToPDF = async () => {
    if (!reportRef.current) return
    const canvas = await html2canvas(reportRef.current, { backgroundColor: '#1e293b' }) // dark background
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfWidth = 210
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
    pdf.save('report.pdf')
  }

  return (
    <>
    <Navigation/>
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <div
        ref={reportRef}
        className="max-w-7xl mx-auto rounded-lg shadow p-8 bg-gray-800"
      >
        <h1 className="text-4xl font-bold mb-6">Reports & Analytics</h1>
        <div className="flex gap-4 mb-6">
          <button
            onClick={exportToExcel}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
          >
            Download Excel
          </button>
          <button
            onClick={exportToPDF}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
          >
            Download PDF
          </button>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Events Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={eventsData} margin={{ top: 20, right: 30, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#cbd5e1" />
              <YAxis allowDecimals={false} stroke="#cbd5e1" />
              <Tooltip contentStyle={{ backgroundColor: '#334155', borderRadius: 8 }} />
              <Legend wrapperStyle={{ color: '#cbd5e1' }} />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Participants</h2>
          <PieChart width={400} height={300}>
            <Pie
              data={participantsData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {participantsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#334155', borderRadius: 8 }} />
            <Legend wrapperStyle={{ color: '#cbd5e1' }} verticalAlign="bottom" height={36} />
          </PieChart>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Donations</h2>
          <BarChart
            layout="vertical"
            width={400}
            height={150}
            data={donationsData}
            margin={{ top: 10, right: 30, left: 100, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis type="number" stroke="#cbd5e1" />
            <YAxis dataKey="name" type="category" stroke="#cbd5e1" />
            <Tooltip contentStyle={{ backgroundColor: '#334155', borderRadius: 8 }} />
            <Bar dataKey="value" fill="#10b981" />
          </BarChart>
        </section>
      </div>
    </div>
    </>
  )
}
