import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserProfile from "../UserComoponents/MenuProfile";

const FnInfoView = () => {
  // State to store the fake news information
  const [fakeNewsInfo, setFakeNewsInfo] = useState(null);

  // Get the fn_info_id from the URL using useParams
  const { fn_info_id } = useParams();

  // Fetch fake news information based on fn_info_id
  const fetchFakeNewsInfo = async () => {
    console.log("fn_info_id :",fn_info_id);
    try {
      const response = await fetch(
        `http://localhost:8000/api/FakeNewsInfo_show/${fn_info_id}`
      );
      if (response.ok) {
        const data = await response.json();
        setFakeNewsInfo(data);
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch fake news information when the component mounts
  useEffect(() => {
    fetchFakeNewsInfo();
  }, [fn_info_id]);

  return (
    <UserProfile>
    <div>
      <h2>Fake News Information</h2>
      {fakeNewsInfo ? (
        <div>
          <h3>หัวข้อ: {fakeNewsInfo.fn_info_head}</h3>
          <p>รายละเอียด: {fakeNewsInfo.fn_info_description}</p>
          <p>สถานะ: {fakeNewsInfo.fn_info_status === 1 ? "รอดำเนินการ" : "เสร็จสิ้น"}</p>
          <img src={fakeNewsInfo.fn_info_image} alt="รูปภาพข่าวปลอม" />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </UserProfile>
  );
};

export default FnInfoView;
