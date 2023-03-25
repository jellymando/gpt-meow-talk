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
`;

function ChatMessage({ message }) {
  const isChatMessage = useMemo(
    () => message.role !== ROLE.SYSTEM,
    [message.role]
  );
  const isMine = useMemo(() => message.role === ROLE.USER, [message.role]);

  return (
    isChatMessage && (
      <Message isMine={isMine}>
        <Text isMine={isMine}>{message.content}</Text>
      </Message>
    )
  );
}

export default ChatMessage;
