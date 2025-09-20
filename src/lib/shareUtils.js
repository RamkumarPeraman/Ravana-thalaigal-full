// Email sharing functionality
export const shareViaEmail = (donationData, donorInfo, receiptBlob = null) => {
  const subject = `Donation Receipt - ${donationData.transactionId}`;
  const body = `Dear ${donorInfo.name},

Thank you for your generous donation of ₹${donationData.amount.toLocaleString()} to Raavana Thalaigal Trust!

Donation Details:
• Amount: ₹${donationData.amount.toLocaleString()}
• Cause: ${getCauseTitle(donationData.cause)}
• Transaction ID: ${donationData.transactionId}
• Date: ${donationData.date}
• Tax Benefit: ₹${(donationData.amount * 0.5).toLocaleString()} (50% under Section 80G)

Your contribution will make a real difference in the lives of those we serve.

Best regards,
Raavana Thalaigal Trust Team

---
This is an automated email. For queries, contact: contact@ravanathalaigaltrust.org`;

  const mailtoUrl = `mailto:${donorInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(mailtoUrl);
};

// WhatsApp sharing functionality
export const shareViaWhatsApp = (donationData, donorInfo) => {
  const message = `🎉 *Donation Successful!*

Thank you for supporting Raavana Thalaigal Trust!

💰 *Amount:* ₹${donationData.amount.toLocaleString()}
🎯 *Cause:* ${getCauseTitle(donationData.cause)}
📧 *Receipt ID:* ${donationData.transactionId}
📅 *Date:* ${donationData.date}
💳 *Tax Benefit:* ₹${(donationData.amount * 0.5).toLocaleString()} (50% under 80G)

Your generosity is creating positive change! 🙏

Visit: www.ravanathalaigaltrust.org`;

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};

// SMS sharing functionality
export const shareViaSMS = (donationData, donorInfo) => {
  const message = `Donation Receipt - Raavana Thalaigal Trust
Amount: ₹${donationData.amount.toLocaleString()}
Receipt: ${donationData.transactionId}
Tax Benefit: ₹${(donationData.amount * 0.5).toLocaleString()}
Thank you for your support!`;

  const smsUrl = `sms:?body=${encodeURIComponent(message)}`;
  window.open(smsUrl);
};

// Social media sharing
export const shareOnFacebook = (donationData) => {
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin)}&quote=${encodeURIComponent(`I just donated ₹${donationData.amount.toLocaleString()} to support ${getCauseTitle(donationData.cause)} at Raavana Thalaigal Trust. Join me in making a difference! 🙏`)}`;
  window.open(url, '_blank', 'width=600,height=400');
};

export const shareOnTwitter = (donationData) => {
  const text = `I just donated ₹${donationData.amount.toLocaleString()} to support ${getCauseTitle(donationData.cause)} @RaavanaThalaigalTrust. Every contribution makes a difference! 🙏 #Donation #MakeADifference`;
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.origin)}`;
  window.open(url, '_blank', 'width=600,height=400');
};

export const shareOnLinkedIn = (donationData) => {
  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}`;
  window.open(url, '_blank', 'width=600,height=400');
};

// Copy receipt details to clipboard
export const copyReceiptDetails = (donationData, donorInfo) => {
  const details = `Donation Receipt - Raavana Thalaigal Trust

Donor: ${donorInfo.name}
Amount: ₹${donationData.amount.toLocaleString()}
Cause: ${getCauseTitle(donationData.cause)}
Receipt ID: ${donationData.transactionId}
Date: ${donationData.date}
Tax Benefit: ₹${(donationData.amount * 0.5).toLocaleString()} (50% under Section 80G)

Thank you for your generous contribution!
www.ravanathalaigaltrust.org`;

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(details);
    return true;
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = details;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  }
};

const getCauseTitle = (cause) => {
  const causes = {
    education: 'Education for All',
    healthcare: 'Healthcare & Medical Aid',
    food: 'Food & Nutrition',
    disaster: 'Disaster Relief',
    environment: 'Environmental Conservation',
    elderly: 'Elderly Care'
  };
  return causes[cause] || 'General Fund';
};
