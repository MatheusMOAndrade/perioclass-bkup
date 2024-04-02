import React from "react";
import Button from "../Button";
import * as S from "./styles";
import { Edit } from "@styled-icons/fluentui-system-filled/Edit";
import { Trash } from "@styled-icons/bootstrap/Trash";

// import { Delete } from "@styled-icons/fluentui-system-regular/Delete";

export interface CardProperties {
  title: string;
  date: string;
  detail: string | null;
  onEdit: () => void;
  onDelete: () => void;
  onClick: () => void;
}

const Card = ({ title, date, detail, onEdit, onDelete, onClick }: CardProperties) => {
  return (
    <S.Wrapper>
      <S.LWrapper onClick={onClick}>
        <S.Title>
          {detail &&
            <><S.Detail>{detail}</S.Detail><br /></>
          }
          {title}
        </S.Title>
        <S.Content> {date} </S.Content>
      </S.LWrapper>

      <S.ButtonWrapper>
        {!!onEdit && (
          <S.Edit onClick={onEdit}>
            {" "}
            <Edit size={30} />{" "}
          </S.Edit>
        )}
        {!!onDelete && (
          <S.Delete onClick={() => onDelete()}>
            <Trash size={30} />
          </S.Delete>
        )}
      </S.ButtonWrapper>
    </S.Wrapper>
  );
};

export default Card;
