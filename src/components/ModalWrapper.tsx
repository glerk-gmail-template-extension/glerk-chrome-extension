import { ReactNode } from "react";

type ModalWrapperProps = {
  onModalClose: () => void;
  children: ReactNode;
};

export default function ModalWrapper({ onModalClose, children }: ModalWrapperProps) {
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full z-999">
      <div className="box-border relative bg-white shadow-lg rounded-3xl w-140">
        <div className="flex justify-between px-8 pt-6 pb-3 border-b">
          <h1 className="pt-1 text-xl font-semibold">변수 등록</h1>
          <button
            className="box-border flex self-center justify-center p-1 text-gray-500 bg-transparent border-none cursor-pointer"
            onClick={onModalClose}
            aria-label="닫기"
          >
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              aria-hidden="true"
              height="25"
              width="25"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
