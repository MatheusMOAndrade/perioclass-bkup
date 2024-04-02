import Reactfrom "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import * as S from "./styles";
import Button from "../Button";
import Card from "../Card/PatientCard";
import TextField from "../TextField";
import useTranslation from 'next-translate/useTranslation'

const Modal = ({ modal, setModal }) => {
  const { t } = useTranslation("common");

  const handleAction = () => {
    modal.action();
    setModal((prev) => ({ ...prev, open: false }));
  };

  return (
    <Dialog
      PaperProps={{
        style: {
          backgroundColor: "transparent",
          boxShadow: "none",
          minWidth: "40vw",
          maxWidth: "80vw",
        },
      }}
      open={modal.open}
      onClose={() => setModal((prev) => ({ ...prev, open: false }))}
    >
      <Card title={modal.title}>
        <DialogContentText>{t('Tem certeza que deseja excluir?')}</DialogContentText>

        <DialogContentText>
          <TextField elsize="small" label="nome" value={modal.info} />
        </DialogContentText>

        <DialogActions>
          <Button
            secondary
            onButtonClick={() => setModal((prev) => ({ ...prev, open: false }))}
          >
            {t("Cancelar")}
          </Button>
          <Button onButtonClick={handleAction} autoFocus>
            {t('Excluir')}
          </Button>
        </DialogActions>
      </Card>
    </Dialog>
  );
};

export default Modal;
