import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup'

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url)
    const take = Number(searchParams.get('take') ?? '10')
    const skip = Number(searchParams.get('skip') ?? '0')

    if (isNaN(take)) {
        return NextResponse.json({ msg: 'Error Take, debe ser un numero', }, { status: 400 })
    }
    if (isNaN(skip)) {
        return NextResponse.json({ msg: 'Error Skip, debe ser un numero', }, { status: 400 })
    }

    const todos = await prisma.todo.findMany({ take, skip })

    return NextResponse.json(todos);
}

const postSchema = yup.object({
    description: yup.string().required(),
    completed: yup.boolean().optional().default(false), // TODO: Mostrar algo interesante
})

export async function POST(request: Request) {

    try {
        const { completed, description } = await postSchema.validate(await request.json())

        const todo = await prisma.todo.create({ data: { completed, description } })

        return NextResponse.json(todo)
    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }
}