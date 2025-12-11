import {create} from 'zustand';

const getInitialSidebarState = () => {
    const savedState = localStorage.getItem('isCollapsed');
    return savedState ? JSON.parse(savedState) : false;
};
export const useAppStore = create((set) => ({
    isCollapsed: getInitialSidebarState(),
    setIsCollapsed: () => set((state) => {
        const newState = !state.isCollapsed;
        localStorage.setItem('isCollapsed', JSON.stringify(newState));
        return {isCollapsed: newState};
    }),

    sessionId: localStorage.getItem('session'),
    setSessionId: (id) => {
        localStorage.setItem('session', id);
        set({ sessionId: id });
    },
}));