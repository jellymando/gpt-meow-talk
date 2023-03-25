import { useMemo, useState, useCallback, useEffect } from "react";
import { useIndexedDB } from "react-indexed-db";
import { Configuration, OpenAIApi } from "openai";

import { ROLE, INIT_MESSAGE } from "constants/chat";

function useChat() {
  const { getAll, add, clear } = useIndexedDB("messages");

  const configuration = useMemo(
    () =>
      new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY
      }),
    []
  );
  const openai = useMemo(() => new OpenAIApi(configuration), [configuration]);

  const [chatList, setChatList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const createChat = useCallback(
    async (chatList) => {
      const { data } = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: chatList
      });
      const answer = data.choices[0].message;
      if (answer) {
        const newChatList = [...chatList, answer];
        setChatList(newChatList);
        await add(answer);
      }
      setIsLoading(false);
    },
    [openai, add]
  );

  const sendMessage = useCallback(
    async ({ role = ROLE.USER, content }) => {
      const message = { role, content };
      const newChatList = [...chatList, message];
      setChatList(newChatList);
      setIsLoading(true);
      await add(message);
      await createChat(newChatList);
    },
    [chatList, createChat, add]
  );

  const clearChat = useCallback(() => {
    clear().then(() => {
      console.log("Clear Success!");
    });
  }, []);

  useEffect(() => {
    // clearChat();
    getAll().then((chatDB) => {
      if (chatDB.length < 1) {
        add(INIT_MESSAGE);
        setChatList([INIT_MESSAGE]);
      } else {
        const chatList = chatDB.map((message) => {
          const { role, content } = message;
          return { role, content };
        });
        setChatList(chatList);
      }
    });
  }, []);

  useEffect(() => {
    console.log("chatList", chatList);
  }, [chatList]);

  return { chatList, isLoading, sendMessage };
}

export default useChat;
