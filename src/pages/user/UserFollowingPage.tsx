import { useEffect } from "react";
import UserCard from "../../components/user/UserCard";
import styles from "./UserFollowingPage.module.scss";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { FollowListType, FollowType } from "../../type";
import { defaultResponseHandler } from "../../apis/custom";
import { getFollowingList } from "../../apis/user";
import { useAuthContext } from "../../contexts/authContext";
import useMoveScrollToTop from "../../hooks/useMoveScrollToTop";
export default function UserFollowingPage() {
  const navigate = useNavigate();

  const { id: pageUserId } = useParams();
  const [pageFollowingListData, setPageFollowingListData] =
    useState<FollowListType>([] as FollowListType);
  const [pageFollowingLoading, setPageFollowingLoading] = useState(true);
  const [myFollowingListData, setMyFollowingListData] =
    useState<FollowListType>([] as FollowListType);
  const [myFollowingLoading, setMyFollowingLoading] = useState(true);

  const { myUserData } = useAuthContext();

  const { autoLoginConfirmed } = useAuthContext();

  useMoveScrollToTop();
  // api 구성이 하나의 요청으로 해결할 수 없게 만들어져 있어서 여러 useeffect를 사용해야 함......
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
  }, [autoLoginConfirmed]);

  useEffect(() => {
    getFollowingList(parseInt(pageUserId ? pageUserId : ""))
      .then(defaultResponseHandler)
      .then((data: FollowListType) => {
        setPageFollowingListData(data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setPageFollowingLoading(false);
      });
  }, []);

  useEffect(() => {
    if (myFollowingLoading || pageFollowingLoading) return;
  }, [myFollowingLoading, pageFollowingLoading]);

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

      <div className={styles.followPage}>
        {!pageFollowingLoading && !myFollowingLoading && (
          <div className={styles.followListContainer}>
            <ul className={styles.followList}>
              {pageFollowingListData.map((follower: FollowType) => {
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
