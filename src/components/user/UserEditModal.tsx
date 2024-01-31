import { CurrentModalType } from "../../pages/Layout";
import styles from "./UserEditModal.module.scss";
import Modal from "../Modal";
import profileDefault from "../../assets/user_default.jpg";
import useUserEdit from "../../hooks/useUserEdit";

type UserEditModalProps = {
  setCurrentModal: (currentModal: CurrentModalType) => void;
};

export default function UserEditModal({ setCurrentModal }: UserEditModalProps) {
  const {
    nickname,
    bio,
    profilePhotoUrl,
    backgroundPhotoUrl,
    handleBackgroundPhoto,
    handleProfilePhoto,
    handleNickname,
    handleBio,
    handleSubmit,
  } = useUserEdit();

  const backgoundStyle = {
    backgroundImage: `url(${backgroundPhotoUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  const profileStyle = {
    backgroundImage: `url(${
      profilePhotoUrl !== "" ? profilePhotoUrl : profileDefault
    })`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <Modal onClose={() => setCurrentModal(null)}>
      <form
        className={styles.modalCon}
        onSubmit={(e) => {
          handleSubmit(e);
          setCurrentModal(null);
        }}
      >
        <header>
          <button
            type="reset"
            className={styles.cancelBtn}
            onClick={() => setCurrentModal(null)}
          >
            취소
          </button>
          <h2>프로필 변경</h2>
          <button type="submit" className={styles.saveBtn}>
            확인
          </button>
        </header>
        <div className={styles.imageCon}>
          <label
            htmlFor="backgroundPhotoUpload"
            style={backgoundStyle}
            className={styles.backgroundPhotoEdit}
          >
            <input
              type="file"
              accept="image/*"
              id="backgroundPhotoUpload"
              onChange={handleBackgroundPhoto}
            />
          </label>
          <label
            htmlFor="profilePhotoUpload"
            style={profileStyle}
            className={styles.profilePhotoEdit}
          >
            <input
              type="file"
              accept="image/*"
              id="profilePhotoUpload"
              onChange={handleProfilePhoto}
            />
          </label>
        </div>
        <div className={styles.textInputCon}>
          <label htmlFor="nicknameEdit">이름</label>
          <input
            type="text"
            id="nicknameEdit"
            value={nickname}
            onChange={handleNickname}
          />
        </div>
        <div className={styles.textInputCon}>
          <label htmlFor="bioEdit">소개</label>
          <input type="text" id="bioEdit" value={bio} onChange={handleBio} />
        </div>
      </form>
    </Modal>
  );
}
