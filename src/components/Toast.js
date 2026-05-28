import {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl font-semibold text-sm max-w-sm animate-fade-up border ${
              toast.type === "success"
                ? "bg-white border-green-100 text-gray-800"
                : toast.type === "error"
                  ? "bg-white border-red-100 text-gray-800"
                  : "bg-white border-violet-100 text-gray-800"
            }`}
          >
            <span className="text-xl flex-shrink-0">
              {toast.type === "success"
                ? "✅"
                : toast.type === "error"
                  ? "❌"
                  : "ℹ️"}
            </span>
            <p className="flex-1">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-300 hover:text-gray-500 flex-shrink-0"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
