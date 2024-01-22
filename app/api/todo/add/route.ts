import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';



export async function POST(request: Request) {
  try {

    const task = await request.json();

    const response = await sql`
      INSERT INTO todos (task, description)
      VALUES (${task.title}, ${task.description})
    `;
    console.log(response)
    const responseBody = { message: 'Task added successfully' };

    return Response.json(responseBody)
  } catch (e) {
    console.error(e);

    const errorBody: { message: string } = { message: 'Failed to add task' };

    return new NextResponse(JSON.stringify(errorBody), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function GET(request: Request) {
  try {
    // Fetch tasks logic goes here
    const tasks = await sql`
      SELECT * FROM todos;
    `;

    return new NextResponse(JSON.stringify({ data: tasks.rows }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error(e);

    const errorBody: { message: string } = { message: 'Failed to fetch tasks' };

    return new NextResponse(JSON.stringify(errorBody), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchparams = request.nextUrl.searchParams;
    const response = await sql`
      DELETE FROM todos
      WHERE todoid = ${searchparams.get('taskId')}
    `;

    if (response) {
      const responseBody = { message: 'Task deleted successfully' };

      return new Response(JSON.stringify(responseBody), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      const errorBody: { message: string } = { message: 'Task not found' };

      return new Response(JSON.stringify(errorBody), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (e) {
    console.error(e);

    const errorBody: { message: string } = { message: 'Failed to delete task' };

    return new Response(JSON.stringify(errorBody), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(request: NextRequest) {
  try {
    
    const searchparams = request.nextUrl.searchParams;
    const task = await request.json();
    const response = await sql`
    
    UPDATE todos
    SET task = ${task.title}, description = ${task.description}
    WHERE todoid = ${searchparams.get('taskId')}
    `;

    if (response) {
      const responseBody = { message: 'Task updated successfully' };

      return new Response(JSON.stringify(responseBody), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      const errorBody: { message: string } = { message: 'Task not found' };

      return new Response(JSON.stringify(errorBody), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (e) {
    console.error(e);

    const errorBody: { message: string } = { message: 'Failed to updated task' };

    return new Response(JSON.stringify(errorBody), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}






