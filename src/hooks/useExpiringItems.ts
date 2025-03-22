import { useEffect, useRef } from "react";
import { useNotificationStore } from "../store/useNotificationStore";

export default function useExpiringItems() {
  const { addNotification, notifications, isNotificationEnabled } = useNotificationStore();
  const prevNotificationsRef = useRef(new Set<string>()); // 이전 알림 저장

  useEffect(() => {

    if(!isNotificationEnabled) return;

    async function fetchExpiringItems() {
      try {
        console.log("🚀 [DEBUG] 유통기한 체크 실행"); // 디버깅 로그 추가
        const response = await fetch("http://localhost:5000/api/items/expiring-soon");

        if (!response.ok) {
          throw new Error(`서버 응답 실패: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (data.length > 0) {
          data.forEach((item: { name: string; expiryDate: string }) => {
            const message = `🚨 ${item.name}의 유통기한이 ${item.expiryDate}까지입니다!`;

            // ✅ 이미 존재하는 알람인지 확인하고 중복 방지
            if (!prevNotificationsRef.current.has(message)) {
              prevNotificationsRef.current.add(message);
              addNotification(message);
            }
          });
        }
      } catch (error) {
        console.error("유통기한 알림 로드 실패", error);
      }
    }

    fetchExpiringItems();
    const interval = setInterval(fetchExpiringItems, 1000 * 60 * 60); // 1시간마다 체크

    return () => clearInterval(interval);
  }, [addNotification, notifications]); // ✅ 중복 방지
}
