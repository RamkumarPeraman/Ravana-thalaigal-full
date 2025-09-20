import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  console.log('🚀 LOGIN API HIT');
  
  try {
    const body = await request.json();
    const { email, password } = body;

    console.log('📧 Email:', email);
    console.log('🔑 Password length:', password?.length);

    if (!email || !password) {
      console.log('❌ Missing credentials');
      return NextResponse.json(
        { success: false, message: 'Email and password required' },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email }
    });

    console.log('👤 User found:', user ? 'YES' : 'NO');

    if (!user) {
      console.log('❌ No user with email:', email);
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    console.log('📋 User details:', {
      id: user.id,
      email: user.email,
      hasPassword: !!user.password,
      active: user.isActive
    });

    // Direct bcrypt comparison
    console.log('🔍 Comparing passwords...');
    console.log('Input password:', password);
    console.log('Hash from DB:', user.password?.substring(0, 30) + '...');
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('✅ Password match:', passwordMatch);

    if (!passwordMatch) {
      console.log('❌ Password mismatch');
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    console.log('🎉 Login successful for:', email);

    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: userWithoutPassword,
      token
    });

  } catch (error) {
    console.error('💥 Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}
