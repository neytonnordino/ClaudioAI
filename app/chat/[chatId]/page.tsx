import React from "react";
import ChatInput from "@/app/components/ChatInput";
import ChatMessage from "@/app/components/ChatMessage";

interface Props {
  params: {
    chatId: string;
  };
}

const ChatPage = async (props: Props) => {
  const { chatId } = await props.params;

  return (
    <>
      <main>
        <div className="flex flex-col justify-center h-screen overflow-hidden p-5 absolute top-0 left-0 right-0">
          <div className="flex-1 pt-10">
            <ChatMessage id={chatId}/>
          </div>
          <ChatInput chatId={chatId} />
          <p className="text-center py-2">
            Claudio pode cometer erros. Considere verificar informações
            importantes.
          </p>
        </div>
      </main>
    </>
  );
};

export default ChatPage;
