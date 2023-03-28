import { toast } from "react-toastify";

export const hide_text_overflow = (text: string): string => (text.length > 50 ? text.slice(0, 45) + "..." : text)

export const toastify_custom = (message : string, autoTime?: number | false,type ?: "success" | "error" )=>{
    switch (type) {
        case "success":
            toast.success(message, {
                position: "top-right",
                autoClose: autoTime,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            break;
        case "error":
            toast.error(message, {
                position: "top-right",
                autoClose: autoTime,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            break;
        default:
            toast(message, {
                position: "top-right",
                autoClose: autoTime,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            break;
    }
}