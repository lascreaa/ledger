// Temporary workaround for https://github.com/expo/expo/issues/52754.
// Remove once the installed Expo release fixes the Swift 6.2 build.
const fs = require('node:fs');
const path = require('node:path');

const root = path.dirname(require.resolve('expo-modules-jsi/package.json'));
const version = require(path.join(root, 'package.json')).version;
if (version !== '58.0.22') throw new Error(`Review the Expo JSI workaround for version ${version}`);
const file = path.join(root, 'apple/Sources/ExpoModulesJSI/Runtime/Values/JavaScriptObject.swift');
const original = `    // The isolated closure below runs synchronously on this thread.
    nonisolated(unsafe) let slot = buffer.baseAddress!`;
const replacement = `    // The isolated closure below runs synchronously on this thread.
    let slot = buffer.baseAddress!
    let slotAddress = UInt(bitPattern: slot)`;
const capture = `      try JavaScriptActor.assumeIsolated {
        try encode(JavaScriptValue.Slot(slot), runtime)`;
const patchedCapture = `      try JavaScriptActor.assumeIsolated {
        let slot = UnsafeMutablePointer<facebook.jsi.Value>(bitPattern: slotAddress)!
        try encode(JavaScriptValue.Slot(slot), runtime)`;
let source = fs.readFileSync(file, 'utf8');
if (source.includes(replacement) && source.includes(patchedCapture)) {
  console.log('Expo JSI workaround already applied');
} else {
  if (source.split(original).length !== 2 || source.split(capture).length !== 2) {
    throw new Error('Expo JSI source differs from the expected version; refusing to patch');
  }
  source = source.replace(original, replacement).replace(capture, patchedCapture);
  fs.writeFileSync(file, source);
  console.log('Applied temporary Expo JSI Swift 6.2 workaround');
}
