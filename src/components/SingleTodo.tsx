import { FormEvent, useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  index: number;
  todo: Todo;
  todos: Todo[];
  handleTodosChange: (newTodos: Todo[]) => void;
  isCompletedList?: boolean;
  handleTaskCompletion?: (todoId: number) => void;
}

const SingleTodo: React.FC<Props> = ({ 
  index, 
  todo, 
  todos, 
  handleTodosChange,
  isCompletedList = false,
  handleTaskCompletion
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>(todo.title);
  const [editDescription, setEditDescription] = useState<string>(todo.description);

  const handleDone = (id: number) => {
    if (handleTaskCompletion) {
      handleTaskCompletion(id);
    }
  };

  const handleDelete = (id: number) => {
    const updatedTodos: Todo[] = todos.filter((todo) => todo.id !== id);
    handleTodosChange(updatedTodos);
  };

  const handleEdit = (id: number) => {
    if (edit) {
      // Submit the edit
      const updatedTodos: Todo[] = todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              title: editTitle,
              description: editDescription
            }
          : todo
      );
      handleTodosChange(updatedTodos);
    }
    setEdit(!edit);
  };

  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form 
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
          onSubmit={(e) => {
            e.preventDefault();
            handleEdit(todo.id);
          }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <div className="edit-form">
              <input
                ref={inputRef}
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="todos__single--text"
                placeholder="Title"
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="todos__single--text"
                placeholder="Description"
              />
            </div>
          ) : todo.completed ? (
            <div>
              <s className="todos__single--text">{todo.title}</s>
              <s className="todos__single--text">{todo.description}</s>
            </div>
          ) : (
            <div>
              <span className="todos__single--text">{todo.title}</span>
              <span className="todos__single--text">{todo.description}</span>
            </div>
          )}

          <div>
          {!isCompletedList && (<span
              className="icon"
              onClick={() => {
                if (!todo.completed) {
                  handleEdit(todo.id);
                }
              }}
            >
              <AiFillEdit />
            </span> ) }
            
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            {!isCompletedList && (
              <span className="icon" onClick={() => handleDone(todo.id)}>
                <MdDone />
              </span>
            )}
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
