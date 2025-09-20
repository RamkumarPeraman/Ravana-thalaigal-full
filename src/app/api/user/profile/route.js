import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { verifyToken } from '../../../../lib/auth';

export async function PUT(request) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'No token provided' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      );
    }

    const profileData = await request.json();
    const {
      firstName,
      lastName,
      phone,
      street,
      city,
      state,
      pincode,
      occupation,
      organization
    } = profileData;

    // Find user
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: {
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        phone: phone || user.phone,
        street: street || user.street,
        city: city || user.city,
        state: state || user.state,
        pincode: pincode || user.pincode,
        occupation,
        organization
      }
    });

    console.log('✅ Profile updated for user:', updatedUser.email);

    // Remove password from response
    const { password, ...userWithoutPassword } = updatedUser;

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('❌ Profile update error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
