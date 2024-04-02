import React, { useEffect, useState } from "react";
import * as S from "./styles";

import Card from "../Card/PatientCard";
import TextField from "../TextField";
import { formatDate } from "../../utils/Utils";

export interface ListProperties {
  title: string;
  data: { id: number; name: string; date: string;[key: string]: any }[];
  onClick: (value: number) => void;
  onEdit: (value: number) => void;
  onDelete: (value: number) => void;
}

export interface ListFilters {
  grade?: "A" | "B" | "C",
  stage?: "I" | "II" | "III" | "IV",
  gender?: "male" | "female",
}

const CardList = ({
  title,
  data,
  onClick,
  onEdit,
  onDelete,
}: ListProperties) => {
  const [renderData, setRenderData] = useState(data);
  const [search, setSearch] = useState("");

  const applySearch = () => {
    if (search === "") {
      setRenderData(data);
      return;
    }
    setRenderData(
      renderData.filter((obj) => {
        if (
          obj.name.includes(search) ||
          formatDate(obj.createdAt).includes(search) ||
          String(obj.id).includes(search)
        ) {
          return true;
        } else {
          return false;
        }
      })
    );
  };

  useEffect(() => {
    applySearch();
  }, [search]);

  return (
    <S.Wrapper>
      <TextField
        value={search}
        onChange={(ev: any) => setSearch(ev.target.value)}
      />
      {renderData?.map((info: any) => (
        <Card
          title={info.name}
          date={formatDate(info.createdAt)}
          detail={info.id}
          onEdit={!!onEdit ? () => onEdit(info.id) : null}
          onDelete={!!onDelete ? () => onDelete(info.id) : null}
          onClick={() => onClick(info.id)}
        />
      ))}
    </S.Wrapper>
  );
};

export default CardList;
