import { Droppable } from "react-beautiful-dnd";
import { Todo } from "../model"
import SingleTodo from "./SingleTodo";

interface Props {
  todos: Todo[];
  handleTodosChange: (newTodos: Todo[]) => void;
  handleCompletedTodosChange: (newTodos: Todo[]) => void;
  completedTodos: Todo[];
  handleTaskCompletion: (todoId: number) => void;
}

const TodoList: React.FC<Props> = ({
  todos,
  handleTodosChange,
  handleCompletedTodosChange,
  completedTodos,
  handleTaskCompletion
}) => {
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div 
            ref={provided.innerRef} 
            {...provided.droppableProps}
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
          >
            <span className="todos__heading">Active Tasks</span>
            {todos.map((todo, index) => (
              <SingleTodo 
                todo={todo} 
                index={index} 
                key={todo.id} 
                todos={todos} 
                handleTodosChange={handleTodosChange}
                isCompletedList={false}
                handleTaskCompletion={handleTaskCompletion}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div 
            ref={provided.innerRef} 
            {...provided.droppableProps}
            className={`todos remove ${snapshot.isDraggingOver ? "dragcomplete" : ""}`}
          >
            <span className="todos__heading">Completed Tasks</span>
            {completedTodos.map((todo, index) => (
              <SingleTodo 
                todo={todo} 
                index={index} 
                key={todo.id} 
                todos={completedTodos} 
                handleTodosChange={handleCompletedTodosChange}
                isCompletedList={true}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;