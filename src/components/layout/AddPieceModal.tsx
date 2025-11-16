import { useState } from "react";

export type Category = {
  id: number;
  name: string;
};

export type FormData = {
  name: string;
  imageUrl: string;
  categoryId: number;
};

type AddPieceModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void | Promise<void>;
  categories: Category[];
};

const AddPieceModal: React.FC<AddPieceModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  categories,
}) => {
  const [name, setName] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number>(categories[0]?.id || 1);
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !imageUrl) return;

    onSubmit({
      name,
      imageUrl,
      categoryId,
    });

    setName("");
    setImageUrl("");
    setCategoryId(categories[0]?.id || 1);
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className="modal-content bg-white w-full max-w-md p-8 rounded-lg shadow-xl transition-transform"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif-display font-bold">
            Yeni Parça Ekle
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="pieceName"
              className="block text-sm font-medium text-gray-700"
            >
              Parça Adı
            </label>
            <input
              id="pieceName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Örn: Beyaz Gömlek"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-zinc-500 focus:ring-zinc-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="pieceCategory"
              className="block text-sm font-medium text-gray-700"
            >
              Kategori
            </label>
            <select
              id="pieceCategory"
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-zinc-500 focus:ring-zinc-500 sm:text-sm"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="pieceImageUrl"
              className="block text-sm font-medium text-gray-700"
            >
              Resim URL
            </label>
            <input
              id="pieceImageUrl"
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-zinc-500 focus:ring-zinc-500 sm:text-sm"
              required
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="bg-zinc-900 text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-zinc-700 transition-colors"
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPieceModal;
