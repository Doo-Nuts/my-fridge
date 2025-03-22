import { useNotificationStore } from "../store/useNotificationStore";

export default function Notification() {
  const { notifications, removeNotification } = useNotificationStore();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((message, index) => (
        <div
          key={index}
          className="bg-red-600 text-white p-3 rounded-lg shadow-lg flex items-center justify-between"
        >
          <span>{message}</span>
          <button
            onClick={() => removeNotification(message)}
            className="ml-4 bg-red-800 px-2 py-1 rounded"
          >
            ✖
          </button>
        </div>
      ))}
    </div>
  );
}