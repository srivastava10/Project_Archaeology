import React, { useState } from 'react';
import { Excavation } from '@/data/excavations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';

interface AddExcavationFormProps {
  onClose: () => void;
  onSave: (excavation: Omit<Excavation, 'id'>) => void;
  location: [number, number] | null;
}

const AddExcavationForm: React.FC<AddExcavationFormProps> = ({ onClose, onSave, location }) => {
  const [formData, setFormData] = useState({
    name: '',
    dateStarted: '',
    description: '',
    archaeologistName: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) return;

    const newExcavation = {
      ...formData,
      location: location
    };

    onSave(newExcavation);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] modal-overlay">
      <div className="bg-parchment p-6 rounded-lg max-w-md w-full mx-4 relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-stone hover:text-terracotta"
        >
          <X className="h-5 w-5" />
        </button>
        
        <h3 className="text-xl font-bold text-stone mb-4">Add New Excavation</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone mb-1">
              Excavation Name
            </label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="bg-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-stone mb-1">
              Date Started
            </label>
            <Input
              type="date"
              value={formData.dateStarted}
              onChange={(e) => setFormData({ ...formData, dateStarted: e.target.value })}
              required
              className="bg-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-stone mb-1">
              Archaeologist Name
            </label>
            <Input
              type="text"
              value={formData.archaeologistName}
              onChange={(e) => setFormData({ ...formData, archaeologistName: e.target.value })}
              required
              className="bg-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-stone mb-1">
              Description
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              className="bg-white"
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="bg-parchment hover:bg-parchment/90 text-stone"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-terracotta hover:bg-terracotta/90 text-white"
            >
              Save Excavation
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExcavationForm; 