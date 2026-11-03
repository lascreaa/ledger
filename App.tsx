import { StatusBar } from 'expo-status-bar';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [value, setValue] = useState('');
  const [saved, setSaved] = useState<string | null>(null);
  const [message, setMessage] = useState('Membuka database…');
  useEffect(() => { (async () => {
    try {
      const db = await SQLite.openDatabaseAsync('ledger-gate0.db');
      await db.execAsync('CREATE TABLE IF NOT EXISTS persistence_probe (id INTEGER PRIMARY KEY CHECK (id = 1), value TEXT NOT NULL);');
      const row = await db.getFirstAsync<{ value: string }>('SELECT value FROM persistence_probe WHERE id = 1');
      setSaved(row?.value ?? null);
      setMessage('Database siap. Simpan penanda sebelum uji refresh atau update.');
    } catch (error) { setMessage(`Database gagal dibuka: ${String(error)}`); }
  })(); }, []);
  async function save() {
    if (!value.trim()) { setMessage('Isi penanda terlebih dahulu.'); return; }
    try {
      const db = await SQLite.openDatabaseAsync('ledger-gate0.db');
      await db.runAsync('INSERT OR REPLACE INTO persistence_probe (id, value) VALUES (1, ?)', value.trim());
      setSaved(value.trim());
      setMessage('Penanda disimpan. Tutup dan buka kembali aplikasi untuk memeriksanya.');
    } catch (error) { setMessage(`Gagal menyimpan: ${String(error)}`); }
  }
  return <SafeAreaView style={styles.screen}><View style={styles.content}>
    <Text style={styles.eyebrow}>LEDGER · GATE 0</Text><Text style={styles.title}>Uji persistensi</Text>
    <Text style={styles.text}>Penanda SQLite ini membantu memeriksa data setelah refresh signing dan pembaruan aplikasi.</Text>
    <Text style={styles.label}>Penanda tersimpan</Text><Text style={styles.saved} selectable>{saved ?? 'Belum ada'}</Text>
    <TextInput style={styles.input} value={value} onChangeText={setValue} placeholder="Contoh: uji-2026-001" placeholderTextColor="#87929e" />
    <Button title="Simpan penanda" onPress={save} /><Text style={styles.message}>{message}</Text>
    <Text style={styles.text}>Untuk App Intents, cari “Ledger Gate Check” di Shortcuts setelah memasang build iOS.</Text>
    <StatusBar style="light" />
  </View></SafeAreaView>;
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#10161c' }, content: { padding: 24, gap: 16 },
  eyebrow: { color: '#81c9b3', fontWeight: '700', letterSpacing: 1 }, title: { color: '#f4f7f6', fontSize: 30, fontWeight: '700' },
  text: { color: '#bbc6ca', fontSize: 16, lineHeight: 24 }, label: { color: '#8e9fa5', marginTop: 12 },
  saved: { color: '#fff', fontSize: 20, fontWeight: '600' }, input: { backgroundColor: '#202c34', color: '#fff', borderRadius: 8, padding: 14 },
  message: { color: '#81c9b3', lineHeight: 22 },
});
