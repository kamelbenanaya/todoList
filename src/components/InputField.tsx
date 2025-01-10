import { FormEvent, useRef, useState } from "react";

interface Props {
  todo: string;
  description: string;
  handleTodoChange: (newTodo: string) => void;
  handleDescriptionChange: (newDescription: string) => void;
  handleAdd: () => void;
}

const InputField: React.FC<Props> = ({
  todo,
  description,
  handleTodoChange,
  handleDescriptionChange,
  handleAdd
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [titleError, setTitleError] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Reset error messages
    setTitleError("");
    setDescriptionError("");
    
    // Validate inputs
    let isValid = true;
    
    if (!todo.trim()) {
      setTitleError("Title is required");
      isValid = false;
    }
    
    if (!description.trim()) {
      setDescriptionError("Description is required");
      isValid = false;
    }
    
    if (isValid) {
      handleAdd();
      inputRef.current?.blur();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleTodoChange(e.target.value);
    if (e.target.value.trim()) {
      setTitleError("");
    }
  };

  const handleDescriptionInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleDescriptionChange(e.target.value);
    if (e.target.value.trim()) {
      setDescriptionError("");
    }
  };

  return (
    <form className="input" onSubmit={handleSubmit}>
      <div className="input_container">
        <div className="input_field">
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter a task"
            className="input_box"
            value={todo}
            onChange={handleInputChange}
          />
          {titleError && <span className="error_message">{titleError}</span>}
        </div>
        <div className="input_field">
          <textarea
            placeholder="Enter description"
            className="input_box description"
            value={description}
            onChange={handleDescriptionInputChange}
          />
          {descriptionError && <span className="error_message">{descriptionError}</span>}
        </div>
        <div style={{display:"flex",justifyContent:"flex-end"}} >
          <button type="submit" className="input_submit">
            Go
          </button>
        </div>
      </div>
    </form>
  );
};

export default InputField;