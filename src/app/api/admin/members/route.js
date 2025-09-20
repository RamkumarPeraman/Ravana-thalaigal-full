import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import bcrypt from 'bcryptjs'

export async function GET() {
  try {
    const members = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      // Select fields you want to expose to frontend
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        city: true,
        state: true,
        userType: true,
        isActive: true,
        createdAt: true,
      }
    })
    return NextResponse.json({ success: true, members })
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, password, phone, city, state, ...other } = body

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newMember = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone,
        city,
        state,
        userType: 'MEMBER',
        ...other,
      },
    })

    return NextResponse.json({ success: true, member: newMember })
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}
