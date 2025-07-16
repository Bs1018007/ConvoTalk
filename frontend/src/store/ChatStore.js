import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axios";
import { AuthStore } from "./AuthStore";

export const ChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("api/message/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`api/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`api/message/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  },

  deleteMessageForMe: async (messageId) => {
    try {
      await axiosInstance.put(`/api/message/delete-for-me/${messageId}`);
      set((state) => ({
        messages: state.messages.filter((msg) => msg._id !== messageId),
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  },

  deleteMessageForEveryone: async (messageId) => {
    try {
      await axiosInstance.delete(`/api/message/${messageId}`);
      set((state) => ({
        messages: state.messages.map((msg) =>
          msg._id === messageId ? { ...msg, text: "", image: "", isDeletedForEveryone: true } : msg
        ),
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = AuthStore.getState().socket;
    socket.on("newMessage", (newMessage) => {
      const isMessageFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageFromSelectedUser) return;
      set({ messages: [...get().messages, newMessage] });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = AuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
