/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import * as S from "./styles";

import { UpArrow } from "styled-icons/boxicons-solid";
import { DownArrow } from "@styled-icons/boxicons-solid/DownArrow";
import useTranslation from "next-translate/useTranslation";

const BasicDropdownSingle = ({
  onDropdownChange,
  initialValue,
  label,
  placeholder = "Selecione uma opção",
  data,
  mainkey,
}) => {
  const [results, setResults] = useState(data);
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState(initialValue);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  const { t } = useTranslation("common");

  useEffect(() => {
    if (searchTerm) {
      const res = data.filter((entry) =>
        Object.values(entry).some(
          (val) =>
            typeof val === "string" &&
            val.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );

      !res.length && setError(t("Sem resultados"));
      setResults(res);
    } else {
      setResults(data);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (selected) {
      !!onDropdownChange && onDropdownChange(selected.value);
    }
  }, [selected]);

  const handleOptionChange = (element) => {
    setSelected(element);
    handleClose();
  };

  const handleChangeSearch = async (a) => {
    setSearchTerm(a);
    setError("");
  };

  const handleClose = () => {
    setIsActive(false);
    setSearchTerm("");
    setError("");
  };

  const handleToggle = () => {
    if (isActive) {
      handleClose();
    } else {
      setIsActive(true);
    }
  };

  return (
    <S.AllWrapper>
      {!!label && <S.Label>{label}</S.Label>}
      <S.Wrapper isActive={isActive}>
        <S.DropdownButton onClick={handleToggle}>
          {selected ? (mainkey ? t(selected[mainkey]) : selected) : t(placeholder)}
          {isActive ? <UpArrow /> : <DownArrow />}
        </S.DropdownButton>
        {isActive && (
          <>
            <S.DropdownContent>
              {!error ? (
                <>
                  {results.map((el, idx) => (
                    <S.DropdownItem
                      key={el.id ? el.id : idx}
                      onClick={() => {
                        handleOptionChange(el);
                      }}
                    >
                      <div>{mainkey ? t(el[mainkey]) : el}</div>
                    </S.DropdownItem>
                  ))}
                </>
              ) : (
                <S.ErrorBox>{error}</S.ErrorBox>
              )}
            </S.DropdownContent>
          </>
        )}
      </S.Wrapper>
    </S.AllWrapper>
  );
};

export default BasicDropdownSingle;
