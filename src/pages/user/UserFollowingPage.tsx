import { useEffect } from "react";
import UserCard from "../../components/user/UserCard";
import styles from "./UserFollowingPage.module.scss";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";
import { useState } from "react";
import { FollowerListType, FollowerType } from "../../type";
import { defaultResponseHandler } from "../../apis/custom";
import { getFollowingList } from "../../apis/user";
export default function UserFollowingPage() {
  const navigate = useNavigate();

  const { id: pageUserId } = useParams();
  const [followerListData, setFollowerListData] = useState<FollowerListType>(
    [] as FollowerListType,
  );
  const [loading, setLoading] = useState(true);

  console.log(followerListData);

  useEffect(() => {
    getFollowingList(parseInt(pageUserId ? pageUserId : ""))
      .then(defaultResponseHandler)
      .then((data: FollowerListType) => {
        setFollowerListData(data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
      });
    };
    scrollToTop();
  }, []);

  return (
    <>
      <div className={styles.fixedTab}>
        <div className={styles.backButtonContainer}>
          <button
            onClick={() => {
              navigate(-1);
            }}
          />
        </div>
        <div className={styles.titleContainer}>팔로잉</div>
      </div>

      {!loading && (
        <div className={styles.followPage}>
          <div className={styles.followListContainer}>
            <ul className={styles.followList}>
              {followerListData.map((follower: FollowerType) => (
                <UserCard follower={follower} />
              ))}
            </ul>
          </div>
        </div>
      )}

    </>
  );
}
