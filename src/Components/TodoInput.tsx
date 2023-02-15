import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";

const InputBox = styled.div`
  margin-top: 5px;
  form {
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
    padding: 5px;
  }
  input {
    border: none;
    background-color: ${(props) => props.theme.boardColor};
  }
  button {
    margin-left: 5px;
    cursor: pointer;
    border-width: 1px;
    border-color: rgba(0, 0, 0, 0.2);
  }
  select {
    border: none;
    margin-left: 5px;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.7);
  }
`;

interface IForm {
  toDo: string;
  todoCat: string;
}

const TodoInput = () => {
  const [todos, setTodos] = useRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onTodoValid = ({ toDo, todoCat }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setTodos((allBoards) => {
      return {
        ...allBoards,
        [todoCat]: [newToDo, ...allBoards[todoCat]],
      };
    });
    setValue("toDo", "");
  };
  return (
    <>
      <InputBox>
        <form onSubmit={handleSubmit(onTodoValid)}>
          <input {...register("toDo")} placeholder="내용"></input>
          <select {...register("todoCat")} name="todoCat">
            {Object.keys(todos).map((boardName, index) => (
              <option key={index} value={boardName}>
                {boardName}
              </option>
            ))}
          </select>
          <button>추가</button>
        </form>
      </InputBox>
    </>
  );
};

export default TodoInput;
