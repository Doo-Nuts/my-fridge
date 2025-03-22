// import { create } from "zustand";
// import { getItems, addItem, deleteItem } from "../service/itemService";

// interface Item {
//   id: number;
//   name: string;
//   quantity: number;
//   expiryDate: string;
//   purchaseDate: string;
// }

// interface ItemStore {
//   items: Item[];
//   addItem: (item: Item) => void;
//   deleteItem: (id: number) => void;
// }

// // ✅ 데이터 로딩 & Zustand 스토어 생성
// export const useItemStore = create<ItemStore>((set) => ({
//   items: getItems(), // 초기 데이터 로딩

//   addItem: (item) => {
//     addItem(item);
//     set((state) => ({ items: [...state.items, item] }));
//   },

//   deleteItem: (id) => {
//     deleteItem(id);
//     set((state) => ({ items: state.items.filter(item => item.id !== id) }));
//   },
// }));