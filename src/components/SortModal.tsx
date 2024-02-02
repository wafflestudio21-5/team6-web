import Modal from "./Modal";
import { SortQueryType } from "../type";
import styles from "./SortModal.module.scss";
import usePreventScroll from "../hooks/usePreventScroll";
import useHandlePopState from "../hooks/useHandlePopState";

export default function SortMoadal({
  onCloseModal,
  setSortQuery,
  sortQuery,
}: {
  onCloseModal: () => void;
  setSortQuery: (sortQuery: SortQueryType) => void;
  sortQuery: SortQueryType;
}) {
  const onClickHandler = (queryString: SortQueryType) => {
    setSortQuery(queryString);
    onCloseModal();
  };
  const addCheckStyle = (queryString: SortQueryType) => {
    return queryString === sortQuery ? styles.checkedBox : "";
  };

  usePreventScroll();
  useHandlePopState(() => {
    onCloseModal();
  });
  return (
    <Modal
      onClose={() => {
        onCloseModal();
      }}
    >
      <div className={styles.modalBox}>
        <div className={styles.modalHeader}>
          <button
            onClick={() => {
              onCloseModal();
            }}
          ></button>
          <h3>정렬 기준</h3>
        </div>

        <ul>
          <li
            onClick={() => {
              onClickHandler("like");
            }}
          >
            <span>좋아요 순</span>
            <div className={addCheckStyle("like")} />
          </li>
          <li
            onClick={() => {
              onClickHandler("created");
            }}
          >
            <span> 최신 순</span>
            <div className={addCheckStyle("created")} />
          </li>
          <li
            onClick={() => {
              onClickHandler("high-rating");
            }}
          >
            <span> 높은 별점 순</span>
            <div className={addCheckStyle("high-rating")} />
          </li>
          <li
            onClick={() => {
              onClickHandler("low-rating");
            }}
          >
            <span> 낮은 별점 순</span>
            <div className={addCheckStyle("low-rating")} />
          </li>
        </ul>
      </div>
    </Modal>
  );
}
