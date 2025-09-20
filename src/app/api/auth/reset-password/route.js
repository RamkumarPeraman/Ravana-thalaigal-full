import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import crypto from 'crypto';

export async function POST(request) {
  try {
    const { token, newPassword } = await request.json();

    if (!token || !newPassword) {
      return NextResponse.json(
        { success: false, message: 'Token and new password are required' },
        { status: 400 }
      );
    }

    const resetTokenHash = crypto.createHash('sha256').update(token).digest('hex');

    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: resetTokenHash,
        resetPasswordExpire: { gte: new Date() }
      }
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'Invalid or expired token'
      }, { status: 400 });
    }

    // Update password and clear reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: newPassword, // ideally hash before saving
        resetPasswordToken: null,
        resetPasswordExpire: null
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Password has been reset successfully.'
    });

  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to reset password. Please try again.' },
      { status: 500 }
    );
  }
}
