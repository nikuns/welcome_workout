import { TextInput, View } from "react-native";

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "search",
}: SearchBarProps) {
  return (
    <TextInput
      className="bg-background text-2xl text-secondary"
      placeholder="search"
      placeholderTextColor={"text-secondary"}
      value={value}
      onChangeText={onChangeText}
    />
  );
}
