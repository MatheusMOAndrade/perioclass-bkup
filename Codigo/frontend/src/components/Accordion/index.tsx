import React, { useState } from "react";
import * as S from "./styles";
import { ExpandMore } from "@styled-icons/material-rounded/ExpandMore";
import { ExpandLess } from "@styled-icons/material/ExpandLess";
import useTranslation from "next-translate/useTranslation";
export interface AccordionProps {
  mainInfo: any;
  details: any;
  id: number;
}

const Accordion = ({ mainInfo, details, id }: AccordionProps) => {
  const [currentAccordion, setCurrentAccordion] = useState(0);
  const { t } = useTranslation("common");

  const translate = (string: string) => {
    switch (string) {
      case "toothLoss":
        return t("Quantidade de dentes perdidos");
      case "interdentalCalLoss":
        return t("Perda inserção interproximal");
      case "boneLossPercentage":
        return t("Porcentagem de perda óssea");
      case "maximumProbingDepth":
        return t("Profundidade da sondagem");
      case "boneLossType":
        return t("Tipo de perda óssea");
      case "boneLenght":
        return t("Tamanho ósseo total");
      case "boneLoss":
        return t("Perda óssea");
      case "furcation":
        return t("Lesão de furca");
      case "smoking":
        return t("Tabagismo");
      case "hemoglobineGlycated":
        return t("Hbglicada (diabetes)");
      case "lossHistoricalInFiveYears":
        return t("Historico de perda dos últimos 5 anos");
      case "boneLossPercentagePerAge":
        return t("Porcentagem de perda óssea por idade");
      default:
        return string;
    }
  };

  const renderDetails = () => {
    return details ? (
      <>
        {Object.keys(details).map((detail) => (
          <>
            <S.PuntualDetail>
              <div>
                <strong>{translate(detail)}</strong>:
              </div>
              <i>{details[detail]}</i>
            </S.PuntualDetail>
            <S.ItemDivisor />
          </>
        ))}
      </>
    ) : null;
  };

  return (
    <S.Container>
      <S.Section>
        <S.InnerSection>
          <S.AccordionContainer>
            <S.AccordionInner>
              <S.AccordionItem key={`accordion-item-${id}`}>
                <S.AccordionTitle
                  onClick={() => {
                    currentAccordion === 0
                      ? setCurrentAccordion(id)
                      : setCurrentAccordion(0);
                  }}
                >
                  {mainInfo?.label}: {mainInfo?.value}
                  {currentAccordion === id ? <ExpandLess /> : <ExpandMore />}
                </S.AccordionTitle>
                <S.AccordionBody active={currentAccordion === id}>
                  <S.AccordionContent>{renderDetails()}</S.AccordionContent>
                </S.AccordionBody>
              </S.AccordionItem>
            </S.AccordionInner>
          </S.AccordionContainer>
        </S.InnerSection>
      </S.Section>
    </S.Container>
  );
};

export default Accordion;
