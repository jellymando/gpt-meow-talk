import React, { useRef, useEffect } from "react";
import styled from "styled-components";

import ChatMessage from "components/ChatMessage";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow-y: auto;
`;

function ChatContainer({ chatList, isError, isLoading }) {
  const ContainerRef = useRef(null);

  useEffect(() => {
    const container = ContainerRef.current;
    if (container) {
      container.scrollTo(0, container.scrollHeight);
    }
  }, [chatList]);

  return (
    <Container ref={ContainerRef}>
      {chatList.map((message, idx) => (
        <ChatMessage key={idx} message={message} />
      ))}
      <ChatMessage isError={isError} isLoading={isLoading} />
    </Container>
  );
}

export default ChatContainer;
