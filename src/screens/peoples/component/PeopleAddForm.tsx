import React, { useState, useMemo } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

type Props = {
  onSubmit: (name: string, birth: string) => void;
  onCancel?: () => void;
};

const PeopleAddForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');

  const nameError = useMemo(() => {
    const v = name.trim();
    if (v.length === 0) return 'Name is required';
    if (v.length < 2) return 'Name must be at least 2 characters';
    return '';
  }, [name]);

  const birthError = useMemo(() => {
    const v = birth.trim();
    if (v.length === 0) return 'Birth year is required';
    return '';
  }, [birth]);

  const disabled = !!nameError || !!birthError;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.avoidContainer}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View>
          <Text style={styles.label}>Name</Text>
          <TextInput
            autoFocus
            value={name}
            onChangeText={setName}
            placeholder="Name"
            style={styles.input}
          />
          {nameError ? <Text style={styles.error}>{nameError}</Text> : null}

          <Text style={[styles.label, { marginTop: 12 }]}>Birth Year</Text>
          <TextInput
            value={birth}
            onChangeText={setBirth}
            placeholder="1970"
            style={styles.input}
          />
          {birthError ? <Text style={styles.error}>{birthError}</Text> : null}

          <View style={styles.row}>
            <TouchableOpacity style={styles.cancel} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.create, disabled && styles.createDisabled]}
              onPress={() => onSubmit(name.trim(), birth.trim())}
              disabled={disabled}>
              <Text style={styles.createText}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  avoidContainer: { flex: 1 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  error: { color: '#b91c1c', marginTop: 6 },
  row: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 16, gap: 8 },
  cancel: { paddingVertical: 8, paddingHorizontal: 12 },
  cancelText: { color: '#333' },
  create: {
    backgroundColor: 'blue',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  createDisabled: { backgroundColor: '#a5b4fc' },
  createText: { color: '#fff', fontWeight: '700' },
});

export default PeopleAddForm;
