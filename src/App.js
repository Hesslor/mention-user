import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [inputValue, setInputValue] = useState();
  const [dropDown, setDropDown] = useState(false);
  const [suggestions, setSuggestions] = useState([
    "Samuel Jackson",
    "Binoy David",
    "Jackson",
    "Selar",
  ]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [posts, setPosts] = useState([]);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
    const caretIndex = event.target.selectionStart;

    const atIndex = inputValue.lastIndexOf("@", caretIndex - 1);

    if (atIndex !== -1) {
      const query = inputValue.slice(atIndex + 1, caretIndex);
      setDropDown(true);
      const filtered = suggestions.filter((option) =>
        option.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setDropDown(false);
      setFilteredSuggestions([]);
    }
  };

  const handleOptionClick = (option) => {
    const atIndex = inputValue.lastIndexOf("@");
    const newText = inputValue.slice(0, atIndex + 1) + option + " ";
    const result = newText.replace("@","");
    setInputValue(result);
    setDropDown(false);
  };

  const createPost = () => {
    let newPost = {
      user: "Florance angle",
      content: inputValue,
      time: 12.3,
    };
    setPosts([...posts, newPost]);
    setInputValue("");
  };

  return (
    <div className="container">
      <textarea
        type="text"
        className="Input"
        value={inputValue}
        onChange={(text) => handleChange(text)}
        rows={3}
        cols={50}
        resize="none"
        placeholder="Create a post ... "
      />
      {dropDown && (
        <div
          style={{
            backgroundColor: "white",
            marginTop: "5px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            position: "absolute",
            zIndex: 999,
            width: "300px",
            maxHeight: "150px",
            overflowY: "auto",
          }}
        >
          {filteredSuggestions.map((option, index) => (
            <div
              key={index}
              style={style.suggestions}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
      <button className="button" onClick={createPost}>
        Post
      </button>
      {Array.isArray(posts) &&
        posts.map((item, index) => {
          return (
            <div className="post" key={index}>
              <text className="postContent">{item.content}</text>
              <div>
                <hr className="line" />
                <div className="userView">
                  <text className="userIcon">{item.user.slice(0, 1)}</text>
                  <div className="userView2">
                    <text className="user">{item.user}</text>
                    <text className="time">{item.time}</text>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default App;
