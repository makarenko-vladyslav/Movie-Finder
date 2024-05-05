import Modal from "react-modal";
import ReactPlayer from "react-player/youtube";

import css from "./ModalTrailer.module.css";

Modal.setAppElement("#root");

export default function ModalTrailer({ isOpen, onClose, trailerUrl }) {
  return (
    <Modal
      isOpen={isOpen}
      overlayClassName={{
        base: css.modal,
        afterOpen: css.openedModal,
        beforeClose: css.closedModal,
      }}
      className={{
        base: css.modalContent,
        afterOpen: css.openedModalContent,
        beforeClose: css.closedModalContent,
      }}
      closeTimeoutMS={500}
      onRequestClose={onClose}
    >
      <ReactPlayer
        url={trailerUrl && `https://www.youtube.com/watch?v=${trailerUrl}`}
        width="100%"
        height="100%"
        controls={true}
        playing={isOpen}
        className={css.player}
      />
    </Modal>
  );
}
