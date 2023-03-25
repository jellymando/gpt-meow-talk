import React from "react";
import styled from "styled-components";

import ChatMessage from "components/ChatMessage";

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
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
