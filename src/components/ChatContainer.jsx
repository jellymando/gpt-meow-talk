import React from "react";
import styled from "styled-components";

import ChatMessage from "components/ChatMessage";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

function ChatContainer({ chatList }) {
  return (
    <Container>
      {chatList.map((message, idx) => (
        <ChatMessage key={idx} message={message} />
      ))}
    </Container>
  );
}

export default ChatContainer;
