
interface CheckboxProps {
  isCompleted: boolean,
  onChange: () => void;
}

export default function Checkbox({ isCompleted, onChange }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      checked={isCompleted}
      onChange={onChange}
      className="w-5 h-5 text-center cursor-pointer rounded border-gray-600
      bg-gray-700 accent-green-500 transition-all duration-200 hover:scale-110"
    />
  );
}