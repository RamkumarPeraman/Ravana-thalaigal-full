import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, generateToken, generateMemberID } from '@/lib/auth';

export async function POST(request) {
    try {
        const body = await request.json();

        const {
            firstName,
            lastName,
            email,
            password,
            phone,
            dateOfBirth,
            gender,
            address,
            occupation,
            organization,
            userType,
            interests,
            howDidYouHear,
            emergencyContact,
            subscribeNewsletter
        } = body;

        // Basic validation
        if (!firstName || !lastName || !email || !password || !phone || !dateOfBirth || !gender) {
            return NextResponse.json(
                { success: false, message: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json(
                { success: false, message: 'User already exists with this email' },
                { status: 400 }
            );
        }

        // Hash password
        // Hash password
        const hashedPassword = await hashPassword(password);
        console.log('Original password:', password); // Debug log
        console.log('Hashed password (first 10 chars):', hashedPassword.substring(0, 10)); // Debug log


        // Generate member ID for members
        let memberID = null;
        if (userType === 'member' || !userType) {
            const memberCount = await prisma.user.count({
                where: { userType: 'MEMBER' }
            });
            memberID = generateMemberID(memberCount);
        }

        // Create user
        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                phone,
                dateOfBirth: new Date(dateOfBirth),
                gender: gender.toUpperCase(),
                street: address?.street || address || 'Not provided',
                city: address?.city || 'Unknown',
                state: address?.state || 'Tamil Nadu',
                pincode: address?.pincode || '000000',
                occupation,
                organization,
                userType: (userType || 'member').toUpperCase(),
                memberID,
                interests: interests ? JSON.stringify(interests) : null,
                howDidYouHear,
                emergencyContactName: emergencyContact?.name,
                emergencyContactPhone: emergencyContact?.phone,
                subscribeNewsletter: subscribeNewsletter !== false,
                loginCount: 1,
                lastLogin: new Date()
            }
        });

        // Generate JWT token
        const token = generateToken(user.id);

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;

        return NextResponse.json({
            success: true,
            message: 'User registered successfully',
            user: userWithoutPassword,
            token
        }, { status: 201 });

    } catch (error) {
        console.error('Registration error:', error);

        // Handle Prisma unique constraint errors
        if (error.code === 'P2002') {
            return NextResponse.json(
                { success: false, message: 'Email already exists' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: false, message: 'Internal server error', error: error.message },
            { status: 500 }
        );
    }
}
