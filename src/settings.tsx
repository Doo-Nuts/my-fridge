import { useNotificationStore } from "./store/useNotificationStore";

export default function Settings() {
  const { isNotificationEnabled, toggleNotification } = useNotificationStore();

  return (
    <div className="container mx-auto p-6 bg-gray-900 text-gray-200 min-h-screen">
      <h1 className="text-2xl font-bold text-green-400">⚙️ 설정</h1>
      

      <div className="mt-4">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={isNotificationEnabled}
            onChange={toggleNotification}
            className="w-5 h-5"
          />
          <span className="text-gray-300">유통기한 임박 알람 활성화</span>
        </label>
      </div>
    </div>
  );
}