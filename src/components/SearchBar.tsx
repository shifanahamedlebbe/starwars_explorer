import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

type Props = {
  value: string;
  placeholder: string;
  onChange: (v: string) => void;
  onClear?: () => void;
};

const SearchBar: React.FC<Props> = ({ value, placeholder, onChange }) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        style={styles.input}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: { flex: 1 },
  input: { backgroundColor: '#f1f1f1', padding: 8, borderRadius: 6 },
});
