import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./app/appSlice";
import userSlice from "./user/userSlice";
import catebookSlice from "./category_book/catebookSlice";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import companySlice from "./company/companySlice";
import departmentSlice from "./department/departmentSlice";
import roleSlice from "./role/roleSlice";
import authSlice from "./auth/authSlice";
import bookSlice from "./book/bookSlice";
import notifySlice from "./notify/notifySlice";

const commonConfig = {
  storage,
};
const authConfig = {
  ...commonConfig,
  key: "book/auth",
};

export const store = configureStore({
  reducer: {
    app: appSlice,
    auth: persistReducer(authConfig, authSlice),
    user: userSlice,
    cateBook: catebookSlice,
    company: companySlice,
    department: departmentSlice,
    role: roleSlice,
    book: bookSlice,
    notify: notifySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
