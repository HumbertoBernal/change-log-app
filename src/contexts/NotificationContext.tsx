import { NotificationContextType } from "@/layouts/types";
import { createContext, useContext } from "react";

export const NotificationContext = createContext<NotificationContextType>(undefined as any);
export const useNotificationContext = () => useContext(NotificationContext);