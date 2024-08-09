"use client";
import { useToast } from "@/hook/useToast";
import SuccessToast from "./SuccessToast";
import WarningToast from "./WarningToast";
import ErrorToast from "./ErrorToast";

export default function Toast() {
  const { toast, hideToast } = useToast();

  if (!toast.show) return null;

  const handleClose = () => {
    hideToast();
  };

  return (
    // <div
    //   className={`absolute top-0 right-0 m-4 p-4 roudned shadow-lg text-white bg-green-500 transition duration-500`}
    // >
    //   <h2>{toast.title}</h2>
    //   <p>{toast.message}</p>
    // </div>
    <div className="flex w-full justify-center absolute top-10 transition-transform ease-in-out">
      <div
        id="toast-success"
        className="flex items-center justify-center w-full max-w-sm p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
        role="alert"
      >
        {toast.type === "success" && <SuccessToast />}
        {toast.type === "warning" && <WarningToast />}
        {toast.type === "error" && <ErrorToast />}
        <div className="flex-1 ms-3 text-sm w-40 font-normal text-white">
          {toast.message}
        </div>
        <button
          type="button"
          className="-mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          data-dismiss-target="#toast-success"
          aria-label="Close"
          onClick={handleClose}
        >
          <span className="sr-only">Close</span>
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
