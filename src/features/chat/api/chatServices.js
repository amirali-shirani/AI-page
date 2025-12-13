import {axiosClient} from "../../../lib/axiosClient.js";


export const chatServices = {
    checkHealth: async () => {
        try {
            const { status, data } = await axiosClient.get("/health");
            console.log("data" , data)
            // هم کد ۲۰۰۰ چک میشه، هم اینکه بادی جیسون healthy باشه
            return status === 200 && data.status === "healthy";
        } catch (error) {
            console.error("Server is down:", error);
            return false; // اگر هر اروری خورد، یعنی سرور سالم نیست
        }
    },
    getOrCreateSession: async () => {
        const currentSession = localStorage.getItem("session");
        if (currentSession) return currentSession;

        const {data} = await axiosClient.post('/sessions');
        localStorage.setItem("session", data.session_id);
        return data.session_id;
    },

    sendMessage: async (question, session_id , signal) => {
        if (!session_id) {
            throw new Error("Session ID not found");
        }

        const {data} = await axiosClient.post("/query", {
            category: "distribution",
            question,
            session_id,
        } , { signal: signal });
        return {data};
    },

    getHistory: async (sessionId) => {
        if (!sessionId) return;
        const {data} = await axiosClient.get(`/sessions/${sessionId}/history`);
        return data;
    },

    deleteSession: async (sessionId) => {
        await axiosClient.delete(`/sessions/${sessionId}`);
    },
};