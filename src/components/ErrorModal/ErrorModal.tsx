import { useEffect } from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

type ErrorModalProps = {
  isOpen: boolean;
  onClose: () => void;
  message: string;
};

const ErrorModal = ({ isOpen, onClose, message }: ErrorModalProps) => {
  const { t } = useTranslation();
  
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:text-gray-300"
        aria-label="Close overlay"
      >
        <X className="h-8 w-8" />
      </button>

      <div className="max-w-lg w-full bg-white p-6 rounded-xl shadow-lg text-secondary">
        <h2 className="text-2xl font-bold text-secondary mb-4 text-center">{t('error.error')}</h2>
        <p className="text-center text-black mb-6">{message}</p>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-secondary text-white rounded hover:bg-gray-800"
          >
            {t('error.close')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
