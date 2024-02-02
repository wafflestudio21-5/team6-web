import { useEffect, useState } from "react";
import UserCard from "../../components/user/UserCard";
import styles from "./UserFollowerPage.module.scss";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getFollowerList } from "../../apis/user";
import { defaultResponseHandler } from "../../apis/custom";
import { FollowListType, FollowType } from "../../type";
import { getFollowingList } from "../../apis/user";
import { useAuthContext } from "../../contexts/authContext";
import useMoveScrollToTop from "../../hooks/useMoveScrollToTop";

export default function UserFollowerPage() {
  const navigate = useNavigate();
  const { id: pageUserId } = useParams();
  const [pageFollowerListData, setPageFollowerListData] =
    useState<FollowListType>([] as FollowListType);
  const [pageFollowerloading, setPageFollowerLoading] = useState(true);
  const [myFollowingListData, setMyFollowingListData] =
    useState<FollowListType>([] as FollowListType);
  const [myFollowingLoading, setMyFollowingLoading] = useState(true);
  const { myUserData } = useAuthContext();

  useMoveScrollToTop();
  useEffect(() => {
    if (!myUserData) {
      setMyFollowingLoading(false);
      return;
    }

    getFollowingList(myUserData.id)
      .then(defaultResponseHandler)
      .then((data: FollowListType) => {
        setMyFollowingListData(data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setMyFollowingLoading(false);
      });
  }, []);

  useEffect(() => {
    getFollowerList(parseInt(pageUserId ? pageUserId : ""))
      .then(defaultResponseHandler)
      .then((data: FollowListType) => {
        setPageFollowerListData(data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setPageFollowerLoading(false);
      });
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
        <div className={styles.titleContainer}>팔로워</div>
      </div>

      <div className={styles.followPage}>
        {!pageFollowerloading && !myFollowingLoading && (
          <div className={styles.followListContainer}>
            <ul className={styles.followList}>
              {pageFollowerListData.map((follower: FollowType) => {
                const myFollowingIdList = myFollowingListData.map(
                  (follower) => follower.id,
                );
                const isMyFollowing = myFollowingIdList.includes(follower.id)
                  ? true
                  : false;
                return (
                  <UserCard
                    key={follower.id}
                    follower={follower}
                    isMyFollowing={isMyFollowing}
                  />
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
