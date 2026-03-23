import { Modal, ModalProps } from "react-native";

type OptionsMenuModalProps = ModalProps & {
  isOpen: boolean;
};

export default function OptionsMenuModal({
  isOpen,
  children,
  ...rest
}: OptionsMenuModalProps) {
  return (
    <Modal visible={isOpen} transparent animationType="fade" {...rest}>
      {children}
    </Modal>
  );
}
