import { prisma } from '../../../lib/prisma'

export default async function MemberDetailPage({ params }) {
  const { id } = params

  const member = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      dateOfBirth: true,
      gender: true,
      street: true,
      city: true,
      state: true,
      pincode: true,
      occupation: true,
      organization: true,
      profileImage: true,
      userType: true,
      interests: true,
      howDidYouHear: true,
      emergencyContactName: true,
      emergencyContactPhone: true,
      subscribeNewsletter: true,
      isVerified: true,
      isActive: true,
      membershipDate: true,
      createdAt: true,
      updatedAt: true
    }
  })

  if (!member) {
    return <p className="p-8">Member not found.</p>
  }

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{member.firstName} {member.lastName}</h1>
      {member.profileImage && (
        <img
          src={member.profileImage}
          alt={`${member.firstName} ${member.lastName}`}
          className="w-32 h-32 rounded-full mb-6"
        />
      )}
      <div className="space-y-2 text-gray-700">
        <p><strong>Email:</strong> {member.email}</p>
        <p><strong>Phone:</strong> {member.phone}</p>
        <p><strong>Date of Birth:</strong> {new Date(member.dateOfBirth).toLocaleDateString()}</p>
        <p><strong>Gender:</strong> {member.gender}</p>
        <p><strong>Address:</strong> {member.street}, {member.city}, {member.state} - {member.pincode}</p>
        <p><strong>Occupation:</strong> {member.occupation || 'N/A'}</p>
        <p><strong>Organization:</strong> {member.organization || 'N/A'}</p>
        <p><strong>Interests:</strong> {member.interests ? JSON.stringify(member.interests) : 'N/A'}</p>
        <p><strong>How did you hear about us:</strong> {member.howDidYouHear || 'N/A'}</p>
        <p><strong>Emergency Contact:</strong> {member.emergencyContactName || 'N/A'}</p>
        <p><strong>Emergency Phone:</strong> {member.emergencyContactPhone || 'N/A'}</p>
        <p><strong>Subscribed to Newsletter:</strong> {member.subscribeNewsletter ? 'Yes' : 'No'}</p>
        <p><strong>Verified:</strong> {member.isVerified ? 'Yes' : 'No'}</p>
        <p><strong>Active:</strong> {member.isActive ? 'Yes' : 'No'}</p>
        <p><strong>Member Since:</strong> {new Date(member.membershipDate).toLocaleDateString()}</p>
      </div>
    </main>
  )
}
