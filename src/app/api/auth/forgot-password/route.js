import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import crypto from 'crypto';

export async function POST(request) {
  try {
    const { email } = await request.json();

    console.log('📧 Forgot password request for:', email);

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      // Return success even if user doesn't exist (security best practice)
      return NextResponse.json({
        success: true,
        message: 'If an account with that email exists, we have sent a password reset link.'
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
    const resetTokenExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save reset token to database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: resetTokenHash,
        resetPasswordExpire: resetTokenExpire
      }
    });

    // Create reset URL
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

    console.log('🔗 Reset URL:', resetUrl);
    console.log('⏰ Token expires:', resetTokenExpire);

    // TODO: Send email with reset link
    // For now, we'll just log it
    console.log(`
    📧 Password reset email would be sent to: ${email}
    🔗 Reset link: ${resetUrl}
    ⏰ Expires: ${resetTokenExpire.toLocaleString()}
    `);

    return NextResponse.json({
      success: true,
      message: 'Password reset instructions have been sent to your email.'
    });

  } catch (error) {
    console.error('❌ Forgot password error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process request. Please try again.' },
      { status: 500 }
    );
  }
}
