import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export async function POST(request) {
  try {
    const { token, password } = await request.json();

    console.log('🔄 Reset password attempt with token');

    if (!token || !password) {
      return NextResponse.json(
        { success: false, message: 'Token and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Hash the provided token
    const resetTokenHash = crypto.createHash('sha256').update(token).digest('hex');

    // Find user with valid reset token
    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: resetTokenHash,
        resetPasswordExpire: {
          gt: new Date()
        }
      }
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired reset token' },
        { status: 400 }
      );
    }

    console.log('✅ Valid reset token for user:', user.email);

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update user password and clear reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpire: null
      }
    });

    console.log('🎉 Password reset successful for:', user.email);

    return NextResponse.json({
      success: true,
      message: 'Password has been reset successfully'
    });

  } catch (error) {
    console.error('❌ Reset password error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to reset password. Please try again.' },
      { status: 500 }
    );
  }
}
