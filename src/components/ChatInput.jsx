import React, { useRef, useState, useCallback } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  margin-top: 20px;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  font-size: 15px;
  background: #fff;
  border: 2px solid #f3e16b;
  border-radius: 5px;
  padding: 0 15px;
`;

const SendButton = styled.button`
  flex: 1 0 65px;
  height: 40px;
  color: #f3e16b;
  font-size: 16px;
  font-weight: bold;
  background: #fff;
  border: 2px solid #f3e16b;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
`;

function ChatInput({ sendMessage }) {
  const inputRef = useRef(null);
  const [text, setText] = useState("");

  const handleChange = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const handleSend = useCallback(() => {
    setText("");
    if (inputRef.current) inputRef.current.focus();
    sendMessage({ content: text });
  }, [text, sendMessage]);

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter" && text) {
        handleSend();
      }
    },
    [text, handleSend]
  );

  return (
    <Container>
      <Input
        type="text"
        ref={inputRef}
        value={text}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <SendButton type="button" onClick={handleSend}>
        전송
      </SendButton>
    </Container>
  );
}

export default ChatInput;
