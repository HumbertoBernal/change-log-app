import { Dispatch, SetStateAction } from "react";

export type NotificationType = {
    title: string;
    message: string;
    isError?: boolean;
}

export type NotificationContextType = {
    notification : NotificationType | null;
    setNotification: Dispatch<SetStateAction<NotificationType | null>>;
}