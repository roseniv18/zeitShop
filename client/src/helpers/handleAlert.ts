import { Alert } from "../types/Alert"
import { toast } from "react-toastify"

export const handleAlert = (alert: Alert) => {
    if (alert.show && alert.msg) {
        if (alert.type === "error") {
            toast.error(alert.msg)
        }
        if (alert.type === "info") {
            toast.info(alert.msg)
        }
        if (alert.type === "success") {
            toast.success(alert.msg)
        }
        if (alert.type === "warning") {
            toast.warning(alert.msg)
        }
    }
}
