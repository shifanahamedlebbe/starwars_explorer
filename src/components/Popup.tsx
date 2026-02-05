import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  dismissOnBackdropPress?: boolean;
};

const Popup: React.FC<Props> = ({
  visible,
  onClose,
  title,
  children,
  dismissOnBackdropPress = true,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <TouchableOpacity
          style={styles.backdropTouchable}
          activeOpacity={1}
          onPress={dismissOnBackdropPress ? onClose : undefined}
        />

        <View style={styles.container}>
          <View style={styles.headerContainer}>
            {title ? <Text style={styles.title}>{title}</Text> : <View />}
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeIcon}
              accessibilityLabel="Close popup">
              <Text style={styles.closeIconText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.content}
            contentContainerStyle={styles.contentInner}
            showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdropTouchable: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    width: '90%',
    maxWidth: 560,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 0,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    overflow: 'hidden',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
    backgroundColor: '#fafafa',
  },
  title: { fontSize: 18, fontWeight: '700', color: '#111' },
  closeIcon: { padding: 6 },
  closeIconText: { fontSize: 18, color: '#666' },
  content: { maxHeight: '80%' },
  contentInner: { padding: 16 },
  actionButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  actionButtonText: { color: '#fff', fontWeight: '700' },
});

export default Popup;
