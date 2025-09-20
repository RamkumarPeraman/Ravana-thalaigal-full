import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { verifyToken } from '../../../../lib/auth';
import { writeFile, unlink, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import crypto from 'crypto';

const UPLOAD_DIR = path.join(process.cwd(), 'public/uploads/profiles');

// Generate unique ID using built-in crypto
function generateUniqueId() {
  return crypto.randomBytes(16).toString('hex');
}

// Ensure upload directory exists
async function ensureUploadDir() {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true });
  }
}

export async function POST(request) {
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

    const formData = await request.formData();
    const image = formData.get('image');
    const userId = formData.get('userId');

    if (!image || !userId) {
      return NextResponse.json(
        { success: false, message: 'Image and user ID are required' },
        { status: 400 }
      );
    }

    // Verify user exists and token matches user
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user || user.id !== decoded.userId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Ensure upload directory exists
    await ensureUploadDir();

    // Generate unique filename using crypto
    const uniqueId = generateUniqueId();
    const fileName = `${userId}-${uniqueId}.jpg`;
    const filePath = path.join(UPLOAD_DIR, fileName);

    // Convert image to buffer and save
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Write file
    await writeFile(filePath, buffer);

    // Delete old profile image if exists
    if (user.profileImage) {
      try {
        const oldImagePath = path.join(process.cwd(), 'public', user.profileImage);
        if (existsSync(oldImagePath)) {
          await unlink(oldImagePath);
        }
      } catch (error) {
        console.log('Could not delete old image:', error);
      }
    }

    // Update user profile image in database
    const imageUrl = `/uploads/profiles/${fileName}`;
    await prisma.user.update({
      where: { id: userId },
      data: { profileImage: imageUrl }
    });

    console.log('✅ Profile image uploaded:', imageUrl);

    return NextResponse.json({
      success: true,
      message: 'Profile image uploaded successfully',
      imageUrl: imageUrl
    });

  } catch (error) {
    console.error('❌ Profile image upload error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to upload profile image' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
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

    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }

    // Verify user exists and token matches user
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user || user.id !== decoded.userId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Delete old profile image if exists
    if (user.profileImage) {
      try {
        const oldImagePath = path.join(process.cwd(), 'public', user.profileImage);
        if (existsSync(oldImagePath)) {
          await unlink(oldImagePath);
        }
      } catch (error) {
        console.log('Could not delete image file:', error);
      }
    }

    // Update user profile image in database
    await prisma.user.update({
      where: { id: userId },
      data: { profileImage: null }
    });

    console.log('✅ Profile image deleted for user:', userId);

    return NextResponse.json({
      success: true,
      message: 'Profile image removed successfully'
    });

  } catch (error) {
    console.error('❌ Profile image delete error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to remove profile image' },
      { status: 500 }
    );
  }
}
