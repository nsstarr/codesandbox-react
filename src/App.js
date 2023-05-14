import "./styles.css";
import { useState, useEffect } from "react";

//https://randomuser.me/api

export default function App() {
  const [user, setUser] = useState("");
  const [userInfos, setUserInfos] = useState([]);
  const [nextPageNumber, setNextPageNumber] = useState(1);

  const fetchNextUser = async () => {
    fetchRandomData(nextPageNumber).then((randomData) => {
      if (randomData === "undefined") return;
      console.log("random data = " + randomData);
      const newUserInfos = [...userInfos, ...randomData.results];
      setUserInfos(newUserInfos);
      // setNextPageNumber(randomData.info.page + 1);
    });
  };

  const getUserName = (userInfo) => {
    const {
      name: { first, last }
    } = userInfo;
    return `${first} ${last}`;
  };

  const fetchRandomData = async (pageNumber) => {
    const response = await fetch(
      `https://randomuser.me/api?page=${pageNumber}`
    );
    const data = await response.json();
    console.log(data.results);
    setUserInfos(data.results);
    setNextPageNumber(data.info.page + 1);
    return data;
  };

  useEffect(() => {
    fetchNextUser();
    // fetchRandomData();
  }, []);

  return (
    <div className="App">
      {userInfos.map((userInfo, index) => (
        <div key={index}>
          <p>{getUserName(userInfo)}</p>
          <img src={userInfo.picture.thumbnail} />
        </div>
      ))}
      <button
        onClick={() => {
          fetchNextUser();
        }}
      >
        Fetch Next User
      </button>
    </div>
  );
}
