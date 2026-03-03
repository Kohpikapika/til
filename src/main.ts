interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface CreateTaskRequest {
  title: string;
}

let tasks: Task[] = [];

function addTask(title: string): Task {
  const newTask: Task = {
    id: tasks.length + 1,
    title,
    done: false
  };

  tasks.push(newTask);
  return newTask;
}

Deno.serve(async (req) => {
  const url = new URL(req.url);

  // GET /tasks
  if (req.method === "GET" && url.pathname === "/tasks") {
    return Response.json(tasks);
  }

  // POST /tasks
  if (req.method === "POST" && url.pathname === "/tasks") {
    const body = await req.json();

    if (typeof body.title !== "string") {
      return new Response("Invalid title", { status: 400 });
    }
    const task = addTask(body.title);
    return Response.json(task);
  }

  return new Response("Not Found", { status: 404 });
});