import styled from "styled-components";

import useChat from "hooks/useChat";
import ChatContainer from "components/ChatContainer";
import ChatInput from "components/ChatInput";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #faf4d3;
  padding: 20px;
`;

function App() {
  const { chatList, sendMessage } = useChat();

  return (
    <Container>
      <ChatContainer chatList={chatList} />
      <ChatInput sendMessage={sendMessage} />
    </Container>
  );
}

export default App;
