import prisma from "@/lib/prisma";
import TodosGrid from "@/todos/components/TodosGrid";



export const metadata = {
 title: 'Listado de TODOS',
 description: 'SEO Title',
};

export default async function RestTodosPage() {

  const todos = await prisma.todo.findMany({orderBy: {description: 'asc'}})

  return (
    <div>
      {/* TODO: Formulario para agregar los todos */}
      <TodosGrid todos={todos} />
    </div>
  );
}