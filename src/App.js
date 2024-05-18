import React, { useRef, useState } from "react";
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
  const textareaRef = useRef(null);
  const hiddenDivRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

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
  
      setTimeout(() => {
        const coords = getCaretCoordinates(textareaRef.current, atIndex);
        const textareaRect = textareaRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: coords.top + window.scrollY + textareaRect.top + 20,
          left: coords.left + window.scrollX + textareaRect.left,
        });
      }, 0);
    } else {
      setDropDown(false);
      setFilteredSuggestions([]);
    }
  };

  const getCaretCoordinates = (element, position) => {
    const div = document.createElement("div");
    const span = document.createElement("span");
    const style = getComputedStyle(element);
  
    for (const prop of style) {
      div.style[prop] = style[prop];
    }
  
    div.style.position = "absolute";
    div.style.visibility = "hidden";
    div.style.whiteSpace = "pre-wrap";
    div.style.wordWrap = "break-word";
    document.body.appendChild(div);
  
    const text = element.value.substring(0, position);
    const remainder = element.value.substring(position);
    div.textContent = text;
  
    span.textContent = remainder ? remainder[0] : ".";
    div.appendChild(span);
  
    const { offsetTop: top, offsetLeft: left } = span;
    document.body.removeChild(div);
  
    return { top, left };
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
        ref={textareaRef}
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
            top: dropdownPosition.top,
            left: dropdownPosition.left,
          }}
        >
          {filteredSuggestions.map((option, index) => (
            <div
              key={index}
              className="suggestions"
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
