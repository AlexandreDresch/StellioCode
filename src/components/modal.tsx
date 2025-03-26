import React from "react";

interface ModalProps {
  isOpen: boolean; // Indica se o modal está visível (aberto)
  onClose: () => void; // Função chamada para fechar o modal
  children: React.ReactNode; // Conteúdo do modal(dinâmico)
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  // Se o modal não está aberto, retorna null, ou seja, não renderiza
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-customGray relative w-full max-w-md rounded-sm p-9 shadow-lg">
        {children}
        <button
          onClick={onClose}
          className="absolute right-2 top-2 rounded-full p-1 text-gray-500 transition hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Modal;
