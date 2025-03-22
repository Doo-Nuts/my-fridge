import { create } from "zustand";

// 로컬에서 설정 가져오기
const getInitialNotificationSetting = () => {
  const savedSetting = localStorage.getItem("isNotificationEnabled");
  return savedSetting ? JSON.parse(savedSetting) : true;
};

interface NotificationStore {
  notifications: string[];
  addNotification: (message: string) => void;
  removeNotification: (message: string) => void;
  isNotificationEnabled: boolean;
  toggleNotification: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  isNotificationEnabled: getInitialNotificationSetting(),

  addNotification: (message) => {
    set((state) => {
      // ✅ 중복 알림 방지
      if (state.notifications.includes(message)) {
        return state;
      }
      return { notifications: [...state.notifications, message] };
    });

    // ✅ 5초 후 자동 제거
    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter((n) => n !== message),
      }));
    }, 5000);
  },
  removeNotification: (message) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n !== message),
    }));
  },
  toggleNotification: () => {
    set((state) => {
      const newSetting = !state.isNotificationEnabled;
      localStorage.setItem("isNotificationEnabled", JSON.stringify(newSetting));
      return { isNotificationEnabled: newSetting };
    });
  },
}));
