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
  ${({ isError }) => isError && "color: #f9690e"}
  ${({ isLoading }) => isLoading && "color: #a6915c"}
`;

function ChatMessage({ message, isError, isLoading }) {
  const isChatMessage = useMemo(
    () => message && message.role !== ROLE.SYSTEM,
    [message]
  );
  const isMine = useMemo(
    () => message && message.role === ROLE.USER,
    [message]
  );

  return isError ? (
    <Message>
      <Text isError={isError}>채팅 실패! ㅠ.ㅠ</Text>
    </Message>
  ) : isLoading ? (
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
