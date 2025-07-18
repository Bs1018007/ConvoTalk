import { ChatStore } from "../store/ChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = ChatStore();

  return (
    <div className="h-screen w-screen bg-base-200">
      <div className="flex items-center justify-center pt-20">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-full h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
