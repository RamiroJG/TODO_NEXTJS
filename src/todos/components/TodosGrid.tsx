'use client'

import { Todo } from '@prisma/client'
import React from 'react'
import TodoItems from './TodoItems'

import * as todosApi from '@/todos/helpers/todos';

interface Props {
    todos?: Todo[]
}

const TodosGrid = ({ todos = [] }: Props) => {

    return (
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
            {
                todos.map(todo => {
                    return (
                        <TodoItems key={todo.id} todo={todo} toggleTodo={todosApi.updateTodo} />
                    )
                })
            }
        </div>
    )
}

export default TodosGrid