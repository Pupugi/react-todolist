import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
  background-color: ${(props) =>
    props.isDragging ? "#e4f2ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
  position: relative;
  button {
    position: absolute;
    right: 10%;
    border-width: 1px;
    border-color: rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
`;

interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
  boardId: string;
}

const DraggableCard = ({
  toDoId,
  toDoText,
  index,
  boardId,
}: IDraggableCardProps) => {
  const setTodos = useSetRecoilState(toDoState);
  const onClick = () => {
    setTodos((allBoards) => {
      const copyBoard = [...allBoards[boardId]];
      copyBoard.splice(index, 1);
      return {
        ...allBoards,
        [boardId]: copyBoard,
      };
    });
  };
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDoText}
          <button onClick={onClick}>X</button>
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DraggableCard);
