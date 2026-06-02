// app/default/functions/Put.ts

async function PUTDATA(endpoint: string, data: any) {
    try {
        const headers: Record<string, string> = {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }

        let body: string | FormData

        // If data is FormData, don't set Content-Type (browser will set it)
        if (data instanceof FormData) {
            body = data
        } else {
            headers["Content-Type"] = "application/json"
            body = JSON.stringify(data)
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
            method: "PUT",
            headers,
            body,
        })

        const result = await response.json()

        if (!response.ok) {
            return {
                success: false,
                message: result.message || "Something went wrong",
                status: response.status,
            }
        }

        return {
            success: true,
            message: result.message || "Success",
            data: result.data || result,
            status: response.status,
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Network error",
            error: error,
        }
    }
}

export default PUTDATA