import React, { useMemo, useEffect } from "react";
import styled from "styled-components";

import { ROLE } from "constants/chat";

const Message = styled.div`
  ${({ isMine }) => isMine && "text-align: right;"}
  margin-bottom: 15px;
`;

const Text = styled.span`
  max-width: 500px;
  padding: 10px 15px;
  border-radius: 5px;
  background: ${({ isMine }) => (isMine ? "#f3e16b" : "#fff")};
  ${({ isLoading }) => isLoading && "color: #a6915c"}
`;

function ChatMessage({ message, isLoading }) {
  const isChatMessage = useMemo(
    () => message && message.role !== ROLE.SYSTEM,
    [message]
  );
  const isMine = useMemo(
    () => message && message.role === ROLE.USER,
    [message]
  );

  return isLoading ? (
    <Message>
      <Text isLoading={isLoading}>입력중..</Text>
    </Message>
  ) : (
    isChatMessage && (
      <Message isMine={isMine}>
        <Text isMine={isMine}>{message.content}</Text>
      </Message>
    )
  );
}

export default ChatMessage;
