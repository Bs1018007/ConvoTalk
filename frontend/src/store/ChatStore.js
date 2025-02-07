import { create } from "zustand";
import toast from "react-hot-toast";
import  {axiosInstance} from "../../lib/axios"


export const ChatStore = create((set) =>({
    messages: [],
    users: [],
    selectedUsers: null,
    isUserLoading: false,
    isMessagesLoading:false,

    getUsers: async () => {
        set ({ isUserLoading:true});
        try {
          const res = await axiosInstance.get("/message/users");
          set({ authUser: res.data });
        } catch (error) {
          toast.error(error.response.data.message || "Something went wrong");
        } finally {
          set({ isUserLoading: false });
        }
      },

    getMessages: async (userId) => {
        set ({isMessagesLoading:true});
        try{
            const res = await axiosInstance.get(`/message/${userId}`);
            set({ messages: res.data });
        }catch(error){
            toast.error(error.response.data.message || "Something went wrong");
        }finally{
            set({isMessagesLoading:false});
        }
    }
 
}));