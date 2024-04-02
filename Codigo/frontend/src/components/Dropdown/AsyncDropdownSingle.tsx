/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import * as S from "./styles";

import { UpArrow } from "styled-icons/boxicons-solid";
import { DownArrow } from "@styled-icons/boxicons-solid/DownArrow";

import { useFetch } from "@/utils/reactQuery";
import useTranslation from "next-translate/useTranslation";

const AsyncDropdownSingle = ({
  label,
  value,
  placeholder = "Selecione uma opção",
  onDropdownChange,
  initialValue,
  endpoint,
  options,
}) => {
  const { t } = useTranslation("common");
  const sentinelRef = useRef(null);

  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState(initialValue);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { data: data2 } = useFetch(endpoint, {}, { initialValue: [] });


  const handleChangeSearch = async (a) => {
    setLoading(true);
    setSearchTerm(a);
    setError("");

    if (a == "") {
      setSearchResults([]);
      setLoading(false);
    }
  };



  // useEffect(() => {
  //   if (isActive) {
  //     fetchData();
  //   }
  // }, [data, isActive]);

  useEffect(() => {
    const { current } = sentinelRef;

    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setCurrentPage((currentValue) => currentValue + 1);
      }
    });

    current && intersectionObserver.observe(current);
    return () => intersectionObserver.disconnect();
  }, [isActive]);

  useEffect(() => {
    if (selected) {
      !!onDropdownChange && onDropdownChange(selected.id);
    }
  }, [selected]);

  const handleOptionChange = (element) => {
    setSelected(element);
    handleClose();
  };

  const handleClose = () => {
    setIsActive(false);
    setError("");
    setLoading(false);
  };

  const handleToggle = () => {
    if (isActive) {
      handleClose();
    } else {
      setIsActive(true);
    }
  };

  const renderResults = (arr) => {
    return arr.map((el) => (
      <S.DropdownItem
        key={el.id}
        onClick={() => {
          handleOptionChange(el);
        }}
      >
        <div>{t(el.name)}</div>
      </S.DropdownItem>
    ));
  };

  return (
    <S.AllWrapper>
      {!!label && <S.Label>{label}</S.Label>}
      <S.Wrapper isActive={isActive}>
        <HandleClickOutside callback={handleClose}>
          <S.DropdownButton onClick={handleToggle}>
            {selected ? t(selected.name) : t(placeholder)}
            {isActive ? <UpArrow /> : <DownArrow />}
          </S.DropdownButton>
          {isActive && (
            <>
              {/* <S.InputWrap>
                <Input
                  elsize="small"
                  // onInputChange={handleChangeSearch}
                  icon={loading ? "carregando" : <Search />}
                />
              </S.InputWrap> */}
              <S.DropdownContent>
                {!error ? (
                  <>{renderResults(data2.data)}</>
                ) : (
                  <S.ErrorBox>{error}</S.ErrorBox>
                )}
              </S.DropdownContent>
            </>
          )}
        </HandleClickOutside>
      </S.Wrapper>
    </S.AllWrapper>
  );
};

export default AsyncDropdownSingle;

export const HandleClickOutside = ({ callback, children }) => {
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return <div ref={wrapperRef}>{children}</div>;
};
