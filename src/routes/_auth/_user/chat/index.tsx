import ChatPage from "@/components/organisms/chat-page/chat";
import { createFileRoute } from "@tanstack/react-router";

function ChatsPage() {
  return <ChatPage />;
}

export const Route = createFileRoute("/_auth/_user/chat/")({
  component: ChatsPage,
});
