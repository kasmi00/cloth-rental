import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function FilterByGender() {
  const navigate = useNavigate();
  const [selectedGender, setSelectedGender] = useState("all");

  const handleRadioChange = (gender) => {
    setSelectedGender(gender);
    if (gender === "all") {
      navigate("/rent");
    } else {
      navigate(`/rent?gender=${gender}`);
    }
  };

  return (
    <div className="d-flex flex-row bd-highlight mb-3">
      <input
        className="form-check-input mx-2"
        type="radio"
        name="flexRadioDefault"
        id="flexRadioDefaultAll"
        checked={selectedGender === "all"}
        onChange={() => handleRadioChange("all")}
      />
      <label className="form-check-label" htmlFor="flexRadioDefaultAll">
        All
      </label>
      <input
        className="form-check-input mx-2"
        type="radio"
        name="flexRadioDefault"
        id="flexRadioDefaultMale"
        checked={selectedGender === "male"}
        onChange={() => handleRadioChange("male")}
      />
      <label className="form-check-label" htmlFor="flexRadioDefaultMale">
        Male
      </label>
      <input
        className="form-check-input mx-2"
        type="radio"
        name="flexRadioDefault"
        id="flexRadioDefaultFemale"
        checked={selectedGender === "female"}
        onChange={() => handleRadioChange("female")}
      />
      <label className="form-check-label" htmlFor="flexRadioDefaultFemale">
        Female
      </label>
    </div>
  );
}

export default FilterByGender;
