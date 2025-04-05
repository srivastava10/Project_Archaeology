import React from 'react';
import { Excavation } from '@/data/excavations';
import { X } from 'lucide-react';

interface ExcavationModalProps {
  excavation: Excavation;
  onClose: () => void;
}

const ExcavationModal: React.FC<ExcavationModalProps> = ({ excavation, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] modal-overlay">
      <div className="bg-parchment p-6 rounded-lg max-w-md w-full mx-4 relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-stone hover:text-terracotta"
        >
          <X className="h-5 w-5" />
        </button>
        
        <h3 className="text-xl font-bold text-stone mb-4">{excavation.name}</h3>
        
        <div className="space-y-3">
          <div>
            <span className="font-semibold text-stone">Date Started: </span>
            <span className="text-stone/80">{new Date(excavation.dateStarted).toLocaleDateString()}</span>
          </div>
          
          <div>
            <span className="font-semibold text-stone">Archaeologist: </span>
            <span className="text-stone/80">{excavation.archaeologistName}</span>
          </div>
          
          <div>
            <span className="font-semibold text-stone">Description: </span>
            <p className="text-stone/80 mt-1">{excavation.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExcavationModal; 