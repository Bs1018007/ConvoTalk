import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import chatStore from "../store/ChatStore";
import { Users, Plus, X } from "lucide-react";

const RoomList = observer(() => {
  const [roomName, setRoomName] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    chatStore.fetchRooms();
    chatStore.getUsers();
  }, []);

  const handleCreate = async () => {
    if (roomName.trim()) {
      await chatStore.createRoom(roomName, selectedUsers.map(u => u._id));
      setRoomName("");
      setSelectedUsers([]);
      setShowCreateForm(false);
    }
  };

  const handleJoin = async (roomId) => {
    if (chatStore.currentRoom?._id === roomId) return;
    await chatStore.joinRoom(roomId);
    chatStore.setSelectedUser(null); // clear 1-on-1 context
  };

  const handleLeave = async (roomId) => {
    await chatStore.leaveRoom(roomId);
  };

  const toggleUserSelection = (user) => {
    setSelectedUsers(prev => 
      prev.find(u => u._id === user._id)
        ? prev.filter(u => u._id !== user._id)
        : [...prev, user]
    );
  };

  const removeSelectedUser = (userId) => {
    setSelectedUsers(prev => prev.filter(u => u._id !== userId));
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Users size={20} />
          Chat Rooms
        </h2>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          <Plus size={16} />
          Create Room
        </button>
      </div>

      {/* Create Room Form */}
      {showCreateForm && (
        <div className="bg-base-200 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Create New Room</h3>
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => setShowCreateForm(false)}
            >
              <X size={16} />
            </button>
          </div>
          
          <input
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Room name"
            className="input input-bordered w-full"
          />

          {/* User Selection */}
          <div>
            <label className="label">
              <span className="label-text">Add members (optional)</span>
            </label>
            <div className="max-h-32 overflow-y-auto space-y-1">
              {chatStore.users.map((user) => (
                <div
                  key={user._id}
                  className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-base-300 ${
                    selectedUsers.find(u => u._id === user._id) ? 'bg-primary/20' : ''
                  }`}
                  onClick={() => toggleUserSelection(user)}
                >
                  <input
                    type="checkbox"
                    checked={selectedUsers.find(u => u._id === user._id) !== undefined}
                    onChange={() => {}}
                    className="checkbox checkbox-sm"
                  />
                  <img
                    src={user.profilePic || 'https://via.placeholder.com/32'}
                    alt={user.fullName}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm">{user.fullName}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Users */}
          {selectedUsers.length > 0 && (
            <div>
              <label className="label">
                <span className="label-text">Selected members</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedUsers.map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center gap-1 bg-primary/20 px-2 py-1 rounded-full text-sm"
                  >
                    <img
                      src={user.profilePic || 'https://via.placeholder.com/20'}
                      alt={user.fullName}
                      className="w-4 h-4 rounded-full"
                    />
                    <span>{user.fullName}</span>
                    <button
                      onClick={() => removeSelectedUser(user._id)}
                      className="btn btn-xs btn-ghost p-0 h-4 w-4"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            className="btn btn-success w-full"
            onClick={handleCreate}
            disabled={!roomName.trim()}
          >
            Create Room
          </button>
        </div>
      )}

      {/* Room List */}
      <div className="space-y-2">
        {chatStore.rooms.map((room) => (
          <div
            key={room._id}
            className={`p-3 rounded-lg border transition-colors ${
              chatStore.currentRoom?._id === room._id 
                ? "bg-primary/20 border-primary" 
                : "bg-base-100 border-base-300 hover:bg-base-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-medium">{room.name}</h3>
                <p className="text-sm text-gray-500">
                  {room.users?.length || 0} members
                </p>
                <p className="text-xs text-gray-400">
                  Created {new Date(room.createdAt).toLocaleDateString()}
                </p>
              </div>
              
              <div className="flex gap-2">
                {chatStore.currentRoom?._id === room._id ? (
                  <>
                    <span className="badge badge-success">Joined</span>
                    <button
                      className="btn btn-sm btn-outline btn-error"
                      onClick={() => handleLeave(room._id)}
                    >
                      Leave
                    </button>
                  </>
                ) : (
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleJoin(room._id)}
                  >
                    Join
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {chatStore.rooms.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          <Users size={48} className="mx-auto mb-4 opacity-50" />
          <p>No rooms available</p>
          <p className="text-sm">Create a room to get started</p>
        </div>
      )}
    </div>
  );
});

export default RoomList;
