import "./App.css";
import InputField from "./components/InputField";
import { useState } from "react";
import { Todo } from "./model";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const handleTodoChange = (newTodo: string) => {
    setTodo(newTodo);
  };
  const handleDescriptionChange = (newDescription: string) => {
    setDescription(newDescription);
  };
  const handleTodosChange = (newTodos: Todo[]) => {
    setTodos(newTodos);
  };
  const handleCompletedTodosChange = (newTodos: Todo[]) => {
    setCompletedTodos(newTodos);
  };
  const handleAdd = () => {
    if (todo) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          title: todo,
          description: description,
          createdAt: new Date(),
          completed: false
        }
      ]);
      setTodo("");
      setDescription("");
    }
  };
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let complete = completedTodos;

    // Source Logic
    if (source.droppableId === "TodosList") {
      add = { ...active[source.index], completed: destination.droppableId === "TodosRemove" };
      active.splice(source.index, 1);
    } else {
      add = { ...complete[source.index], completed: destination.droppableId === "TodosRemove" };
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  };
  const handleTaskCompletion = (todoId: number) => {
    const todoToMove = todos.find((todo) => todo.id === todoId);
    if (todoToMove) {
      // Remove from active todos
      const newTodos = todos.filter((todo) => todo.id !== todoId);
      setTodos(newTodos);
      
      // Add to completed todos with completed flag set to true
      setCompletedTodos([...completedTodos, { ...todoToMove, completed: true }]);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Typescript</span>
        <InputField
          todo={todo}
          description={description}
          handleTodoChange={handleTodoChange}
          handleDescriptionChange={handleDescriptionChange}
          handleAdd={handleAdd}
        />
        <TodoList
          todos={todos}
          handleTodosChange={handleTodosChange}
          handleCompletedTodosChange={handleCompletedTodosChange}
          completedTodos={completedTodos}
          handleTaskCompletion={handleTaskCompletion}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
