import { initDB } from "react-indexed-db";
import styled from "styled-components";

import { DBConfig } from "config/DBConfig";
import useChat from "hooks/useChat";
import ChatContainer from "components/ChatContainer";
import ChatInput from "components/ChatInput";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #faf4d3;
`;

initDB(DBConfig);

function App() {
  const { chatList, isError, isLoading, sendMessage } = useChat();

  return (
    <Container>
      <ChatContainer
        chatList={chatList}
        isError={isError}
        isLoading={isLoading}
      />
      <ChatInput sendMessage={sendMessage} />
    </Container>
  );
}

export default App;
