import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist({
  key: "qogitaCart", // this key is using to store data in local storage
});

export const CartState = atom({
  key: "cart",
  default: {},
  effects_UNSTABLE: [persistAtom],
});
