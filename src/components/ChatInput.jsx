import React, { useState, useCallback } from "react";
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
  padding: 0 5px;
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
`;

function ChatInput({ sendMessage }) {
  const [text, setText] = useState("");

  const handleChange = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const handleSend = useCallback(() => {
    sendMessage({ content: text });
  }, [text, sendMessage]);

  return (
    <Container>
      <Input type="text" value={text} onChange={handleChange} />
      <SendButton type="button" onClick={handleSend}>
        전송
      </SendButton>
    </Container>
  );
}

export default ChatInput;
