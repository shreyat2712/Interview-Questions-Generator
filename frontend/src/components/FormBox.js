import React, { useMemo, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import axios from "axios";
import './FormBox.css'
const FormBox = (props) => {
    const [selectedValues, setSelectedValues] = useState({
        topics: "",
        levelOfQue: "",
        levelOfExp: "0 YOE",
        numberOfQue: "",
      });
    
      const options = {
        topics: ["Core Java", "OOPS", "DBMS", "JavaScript"],
        // levelOfExp: ["0 YOE", "1-2 YOE", "3-4 YOE", "5+ YOE"],
        levelOfQue: ["Beginner", "Medium", "Hard"],
        numberOfQue: ["1", "2", "3", "4", "5", "6"]
      };
    
      const handleDropdownChange = (name, value) => {
        setSelectedValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form data:", selectedValues);

        for(let key in selectedValues) {
          if(!selectedValues[key]) {
            console.log(key, "is not selected");
            return;
          }
        }

        try {
          console.log("trying");
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };

          const { data } = await axios.post("/findQuestion", selectedValues, config);

          if(data.que.length == 0) {
            props.setQaTitle("No QA available, showing default QA");
          }
          else {
            props.setQAData(data.que);
            props.setQaTitle("Generated Questions and Answers");
          }
        } catch (error) {
          console.log(error);
        }
      };

    return (
        <div className="s_outerDiv">
        <div className="s_containerForm">
            <div className="s_topic">Post Your Request</div>
            <form className="s_form" onSubmit={handleSubmit}>
            <label className="s_dropdownTopic">Topics</label>
            <DropDownList
                className="s_dropdown_options"
                id="topics"
                data={options.topics}
                onChange={(e) => handleDropdownChange("topics", e.target.value)}
                value={selectedValues.topics}
            />
            {/* <label className="s_dropdownTopic">Level Of Experience</label>
            <DropDownList
                className="s_dropdown_options"
                id="levelOfExp"
                data={options.levelOfExp}
                onChange={(e) => handleDropdownChange("levelOfExp", e.target.value)}
                value={selectedValues.levelOfExp}      
            /> */}
            <label className="s_dropdownTopic">Level Of Question</label>
            <DropDownList
                className="s_dropdown_options"
                id="levelOfQue"
                data={options.levelOfQue}
                onChange={(e) => handleDropdownChange("levelOfQue", e.target.value)}
                value={selectedValues.levelOfQue} 
            />
                        
            <label className="s_dropdownTopic">Number Of Questions</label>
            <DropDownList
                className="s_dropdown_options"
                id="numberOfQue"
                data={options.numberOfQue}
                onChange={(e) => handleDropdownChange("numberOfQue", e.target.value)}
                value={selectedValues.numberOfQue} 
            />
            <div className="s_button_div">
                <input className="s_button" type="submit" value="Generate Questions" />
            </div>
            </form>
        </div>
        </div>
    );
};

export default FormBox;
