import React, { useMemo, useEffect } from "react";
import styled from "styled-components";

import { ROLE } from "constants/chat";

const Message = styled.div`
  ${({ isMine }) => isMine && "text-align: right;"}
`;

function ChatMessage({ message }) {
  const isChatMessage = useMemo(
    () => message.role !== ROLE.SYSTEM,
    [message.role]
  );
  const isMine = useMemo(() => message.role === ROLE.USER, [message.role]);

  return isChatMessage && <Message isMine={isMine}>{message.content}</Message>;
}

export default ChatMessage;
