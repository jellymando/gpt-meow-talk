import { useMemo, useState, useCallback, useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";

import { ROLE } from "constants/chat";

function useChat() {
  const configuration = useMemo(
    () =>
      new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY
      }),
    []
  );
  const openai = useMemo(() => new OpenAIApi(configuration), [configuration]);

  const [chatList, setChatList] = useState([
    { role: ROLE.SYSTEM, content: "You must answer like a cat." }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const createChat = useCallback(
    async (chatList) => {
      const { data } = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: chatList
      });
      const answer = data.choices[0].message;
      if (answer) {
        let newChatList = [...chatList];
        newChatList.push(answer);
        setChatList(newChatList);
      }
      setIsLoading(false);
    },
    [openai]
  );

  const sendMessage = useCallback(
    async ({ role = ROLE.USER, content }) => {
      let newChatList = [...chatList];
      newChatList.push({ role, content });
      setChatList(newChatList);
      setIsLoading(true);
      await createChat(newChatList);
    },
    [chatList, createChat]
  );

  useEffect(() => {
    console.log("chatList", chatList);
  }, [chatList]);

  return { chatList, isLoading, sendMessage };
}

export default useChat;
