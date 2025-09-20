import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

// Generates the PDF document for a donation receipt
export const generateReceiptPDF = async (donationData, donorInfo) => {
  // Create receipt HTML markup string
  const receiptHTML = createReceiptHTML(donationData, donorInfo)

  // Create temporary hidden container div for HTML
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = receiptHTML
  tempDiv.style.position = 'absolute'
  tempDiv.style.left = '-9999px'
  tempDiv.style.top = '-9999px'
  tempDiv.style.width = '800px'
  tempDiv.style.backgroundColor = 'white'
  tempDiv.style.padding = '20px'
  document.body.appendChild(tempDiv)

  try {
    // Render the container HTML as canvas
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      backgroundColor: '#ffffff',
      useCORS: true,
      allowTaint: true,
    })

    // Create PDF from canvas and add image
    const pdf = new jsPDF('p', 'mm', 'a4')
    const imgData = canvas.toDataURL('image/png')

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)

    // Clean up temporary div
    document.body.removeChild(tempDiv)

    return pdf
  } catch (error) {
    document.body.removeChild(tempDiv)
    throw error
  }
}

// Downloads the donation receipt PDF file
export const downloadReceipt = async (donationData, donorInfo) => {
  try {
    const pdf = await generateReceiptPDF(donationData, donorInfo)
    const fileName = `donation-receipt-${donationData.transactionId}.pdf`
    pdf.save(fileName)
    return true
  } catch (error) {
    console.error('Error generating receipt:', error)
    return false
  }
}

// Gets PDF Blob if you want to upload or store
export const getReceiptBlob = async (donationData, donorInfo) => {
  try {
    const pdf = await generateReceiptPDF(donationData, donorInfo)
    return pdf.output('blob')
  } catch (error) {
    console.error('Error generating receipt blob:', error)
    return null
  }
}

// Helper to create receipt HTML string with inline styles
const createReceiptHTML = (donationData, donorInfo) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getCauseTitle = (cause) => {
    const causes = {
      education: 'Education for All',
      healthcare: 'Healthcare & Medical Aid',
      food: 'Food & Nutrition',
      disaster: 'Disaster Relief',
      environment: 'Environmental Conservation',
      elderly: 'Elderly Care',
    }
    return causes[cause] || 'General Fund'
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background: white;">
      <!-- Header -->
      <div style="text-align: center; border-bottom: 3px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px;">
        <div style="display: inline-flex; align-items: center; margin-bottom: 10px;">
          <div style="width: 50px; height: 50px; background: #2563eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px;">
            <span style="color: white; font-weight: bold; font-size: 20px;">RT</span>
          </div>
          <div style="text-align: left;">
            <h1 style="color: #2563eb; margin: 0; font-size: 24px; font-weight: bold;">Raavana Thalaigal Trust</h1>
            <p style="color: #64748b; margin: 0; font-size: 14px;">Empowering Communities Across Tamil Nadu</p>
          </div>
        </div>
        <h2 style="color: #059669; margin: 10px 0 0 0; font-size: 20px;">DONATION RECEIPT</h2>
        <p style="color: #6b7280; margin: 5px 0 0 0; font-size: 12px;">Tax Exemption under Section 80G of Income Tax Act, 1961</p>
      </div>

      <!-- Receipt Details -->
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
          <span style="font-weight: 600; color: #374151;">Receipt No:</span>
          <span style="font-family: monospace; color: #1f2937;">${donationData.transactionId}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
          <span style="font-weight: 600; color: #374151;">Date:</span>
          <span style="color: #1f2937;">${formatDate(donationData.date)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
          <span style="font-weight: 600; color: #374151;">Time:</span>
          <span style="color: #1f2937;">${donationData.time}</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="font-weight: 600; color: #374151;">Payment Mode:</span>
          <span style="color: #1f2937;">${donationData.paymentMethod || 'Online Payment'}</span>
        </div>
      </div>

      <!-- Donor Information -->
      <div style="margin-bottom: 30px;">
        <h3 style="color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; margin-bottom: 20px;">Donor Information</h3>
        <div style="background: #fefefe; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <div style="margin-bottom: 10px;">
            <strong style="color: #374151;">Name:</strong>
            <span style="color: #1f2937;">${donorInfo.name}</span>
          </div>
          <div style="margin-bottom: 10px;">
            <strong style="color: #374151;">Email:</strong>
            <span style="color: #1f2937;">${donorInfo.email}</span>
          </div>
          <div style="margin-bottom: 10px;">
            <strong style="color: #374151;">Phone:</strong>
            <span style="color: #1f2937;">${donorInfo.phone}</span>
          </div>
          ${
            donorInfo.pan
              ? `<div style="margin-bottom: 10px;"><strong style="color: #374151;">PAN:</strong> <span style="color: #1f2937;">${donorInfo.pan}</span></div>`
              : ''
          }
          ${
            donorInfo.address
              ? `<div><strong style="color: #374151;">Address:</strong> <span style="color: #1f2937;">${donorInfo.address}</span></div>`
              : ''
          }
        </div>
      </div>

      <!-- Donation Details -->
      <div style="margin-bottom: 30px;">
        <h3 style="color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; margin-bottom: 20px;">Donation Details</h3>
        <div style="background: #fefefe; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #f3f4f6;">
            <span style="font-weight: 600; color: #374151;">Cause:</span>
            <span style="color: #1f2937;">${getCauseTitle(donationData.cause)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #f3f4f6;">
            <span style="font-weight: 600; color: #374151;">Donation Type:</span>
            <span style="color: #1f2937; text-transform: capitalize;">${donationData.type || 'One-time'}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 2px solid #e5e7eb;">
            <span style="font-weight: 700; color: #374151; font-size: 18px;">Donation Amount:</span>
            <span style="color: #059669; font-weight: 700; font-size: 20px;">${formatCurrency(donationData.amount)}</span>
          </div>

          <!-- Tax Benefit Calculation -->
          <div style="background: #ecfdf5; padding: 15px; border-radius: 6px; border-left: 4px solid #10b981;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
              <span style="font-weight: 600; color: #065f46;">Tax Benefit (50% under 80G):</span>
              <span style="color: #065f46; font-weight: 700;">${formatCurrency(donationData.amount * 0.5)}</span>
            </div>
            <p style="color: #047857; font-size: 12px; margin: 0; font-style: italic;">
              This donation is eligible for 50% tax deduction under Section 80G of the Income Tax Act, 1961
            </p>
          </div>
        </div>
      </div>

      <!-- Organization Details -->
      <div style="margin-bottom: 30px;">
        <h3 style="color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; margin-bottom: 20px;">Organization Details</h3>
        <div style="background: #fefefe; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <div style="margin-bottom: 10px;">
            <strong style="color: #374151;">Organization:</strong>
            <span style="color: #1f2937;">Raavana Thalaigal Trust</span>
          </div>
          <div style="margin-bottom: 10px;">
            <strong style="color: #374151;">Registration No:</strong>
            <span style="color: #1f2937;">TN/12345/2020</span>
          </div>
          <div style="margin-bottom: 10px;">
            <strong style="color: #374151;">80G Certificate No:</strong>
            <span style="color: #1f2937;">AAATD1234F20201</span>
          </div>
          <div style="margin-bottom: 10px;">
            <strong style="color: #374151;">PAN:</strong>
            <span style="color: #1f2937;">AAATD1234F</span>
          </div>
          <div>
            <strong style="color: #374151;">Address:</strong>
            <span style="color: #1f2937;">123 Charity Street, NGO Nagar, Chennai - 600001, Tamil Nadu</span>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div style="text-align: center; padding-top: 20px; border-top: 2px solid #e5e7eb; color: #6b7280; font-size: 12px;">
        <p style="margin-bottom: 10px;">Thank you for your generous contribution to our cause!</p>
        <p style="margin-bottom: 10px;">This is a computer-generated receipt and does not require a signature.</p>
        <p style="margin: 0;"><strong>For queries:</strong> <a href="mailto:contact@ravanathalaigaltrust.org" style="color:#2563eb;">contact@ravanathalaigaltrust.org</a> | +91 98765 43210</p>
        <p style="margin: 10px 0 0 0; color: #2563eb; font-weight: 600;">www.ravanathalaigaltrust.org</p>
      </div>
    </div>
  `
}

// Helper called inside receipt content
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const getCauseTitle = (cause) => {
  const causes = {
    education: 'Education for All',
    healthcare: 'Healthcare & Medical Aid',
    food: 'Food & Nutrition',
    disaster: 'Disaster Relief',
    environment: 'Environmental Conservation',
    elderly: 'Elderly Care',
  }
  return causes[cause] || 'General Fund'
}
