import prisma from '@/lib/prisma'
import { Todo } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup'

interface Segments {
    params: {
        id: string
    }
}

const getTodo = async (id: string): Promise<Todo | null> => {

    const todo = await prisma.todo.findFirst({ where: { id: id } })

    return todo;
}

export async function GET(request: Request, { params }: Segments) {

    const todo = await getTodo(params.id)

    if (!todo) {
        return NextResponse.json({ msg: `Todo con id ${params.id} no existe}`, }, { status: 400 })
    }

    return NextResponse.json(todo)
}

const putSchema = yup.object({
    completed: yup.boolean().optional(),
    description: yup.string().optional()
})

export async function PUT(request: Request, { params }: Segments) {

    const todo = await getTodo(params.id)

    if (!todo) {
        return NextResponse.json({ msg: `Todo con id ${params.id} no existe}`, }, { status: 400 })
    }

    try {
        const { completed, description } = await putSchema.validate(request.json())

        const updatedTodo = await prisma.todo.update({
            where: { id: params.id },
            data: { completed, description }
        })

        return NextResponse.json(updatedTodo)
    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }


}
