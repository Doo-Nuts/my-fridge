export interface Item {
  id: number;
  name: string;
  quantity: number;
  expiryDate: string;
  purchaseDate: string;
}

// ✅ 로컬 스토리지에서 데이터 가져오기
export const getItems = (): Item[] => {
  return JSON.parse(localStorage.getItem("items") || "[]");
};

// ✅ 새로운 아이템 추가
export const addItem = (item: Item) => {
  const items = getItems();
  const updatedItems = [...items, item];
  localStorage.setItem("items", JSON.stringify(updatedItems));
};

// ✅ 아이템 삭제
export const deleteItem = (id: number) => {
  const items = getItems();
  const updatedItems = items.filter(item => item.id !== id);
  localStorage.setItem("items", JSON.stringify(updatedItems));
};