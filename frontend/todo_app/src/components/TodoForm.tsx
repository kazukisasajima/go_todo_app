import React, { useState, useEffect } from "react";

interface TodoFormProps {
  onSubmit: (data: { title: string; description: string }) => void;
  initialData?: { title: string; description: string };
  isEditing?: boolean;
  onCancel?: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, initialData, isEditing, onCancel }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");

  // initialData が変更されたら title と description を更新
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
    } else {
      setTitle(""); // 初期値がない場合はリセット
      setDescription("");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ title, description });
    if (!isEditing) {
      setTitle(""); // 新規作成の場合はフォームをクリア
      setDescription("");
    }
  };

  const handleCancel = () => {
    setTitle(""); // タイトルをリセット
    setDescription(""); // 説明をリセット
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="タイトル"
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="詳細説明"
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      />
      <div className="flex space-x-2">
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
        >
          {isEditing ? "更新" : "作成"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={handleCancel}
            className="w-full py-2 bg-gray-500 text-white rounded cursor-pointer hover:bg-gray-600"
          >
            キャンセル
          </button>
        )}
      </div>
    </form>
  );
};

export default TodoForm;
