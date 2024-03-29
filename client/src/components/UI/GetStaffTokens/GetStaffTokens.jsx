import React, { Fragment, useState, useEffect, useRef } from "react";
import Modal from "../Modal/Modal";
import { FadeLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { showNotificationModal } from "../../../store/actions/notification";
import axios from "axios";
import { baseUrl } from "../../../store/appStore";
import { log } from "../../../utils/consoleLog";
import GenerateStaffToken from "../GenerateStaffToken/GenerateStaffToken";
import styles from "./GetStaffTokens.module.scss";

const GetStaffTokens = () => {
  const [staffTokens, setStaffTokens] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const showAlertModal = useSelector((state) => state.notification.value);
  const authToken = useSelector((state) => state.auth.token);
  const effectRan = useRef(false);

  const getStaffTokens = () => {
    return async () => {
      const response = await axios.get(`${baseUrl}/get-staff-tokens`, {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      });
      log(response);
      if (response.data.errorMessage) {
        throw new Error(response.data.errorMessage);
      }
      setStaffTokens(response.data);
    };
  };

  const handleGenerateToken = async () => {
    try {
      setIsLoading(true);
      await dispatch(getStaffTokens());
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      await dispatch(showNotificationModal(error.message));
    }
  };

  useEffect(() => {
    if (effectRan.current === false) {
      handleGenerateToken();
      return () => {
        effectRan.current = true;
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staffTokens]);

  // provides format  -> 7/3/2022;
  const getDateString = (stringfiedDateObject) => {
    const date = new Date(JSON.parse(stringfiedDateObject).date);
    return date.toLocaleDateString();
  };

  //provides format  -> 3:47 AM
  const getTime = (strDateObject) => {
    const date = new Date(JSON.parse(strDateObject).date);
    return date.toLocaleTimeString("en-Us", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <Fragment>
      <div className={styles["staff__token__container"]}>
        {showAlertModal && <Modal isErrorMessage={isError} />}
        <div className={styles["fade__loader_container"]}>
          {isLoading && <FadeLoader />}
        </div>
        <div className={styles["heading"]}>
          <h4>Staff SignUp tokens</h4>
        </div>
        <div className={styles["staff__tokens"]}>
          <table className={styles["token__table"]}>
            <tbody>
              <tr className={styles["token__table__heading__container"]}>
                <th className={styles["token__heading"]}>Id</th>
                <th className={styles["token__heading"]}>Token</th>
                <th className={styles["token__heading"]}>GeneratedOn</th>
                <th className={styles["token__heading"]}>GeneratedBy</th>
                {/* <th className={styles["token__heading"]}>UsedBy</th> */}
                {/* <th className={styles["token__heading"]}>UsedOn</th> */}
                <th className={styles["token__heading"]}>Validity</th>
              </tr>
              {staffTokens.map((token) => {
                return (
                  <tr key={token.token_id}>
                    <td className={styles["token__id"]}>{token.token_id}</td>
                    <td className={styles["token"]}>{token.token}</td>
                    <td className={styles["token__generation__date"]}>
                      <span>{getDateString(token.date_of_generation)}</span>{" "}
                      <span>{getTime(token.date_of_generation)}</span>
                    </td>
                    <td className={styles["token__generation__by"]}>
                      {token.generated_by}
                    </td>
                    {/* <td className={styles["token__used__by"]}>
                      {token.used_by}
                    </td> */}
                    {/* <td className={styles["token__used__on"]}>
                      {token.used_on}
                    </td> */}
                    <td className={styles["token__validity"]}>
                      {token.is_valid ? (
                        <span style={{ color: "green" }}>Valid</span>
                      ) : (
                        <span style={{ color: "red" }}>Used and Invalid</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className={styles["generate__staff__token"]}>
          <GenerateStaffToken />
        </div>
      </div>
    </Fragment>
  );
};

export default GetStaffTokens;
