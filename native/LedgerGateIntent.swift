import AppIntents

@available(iOS 16.0, *)
struct LedgerGateCheckIntent: AppIntent {
  static var title: LocalizedStringResource = "Ledger Gate Check"
  static var description = IntentDescription("Checks whether Ledger App Intents are available after sideloading.")
  func perform() async throws -> some IntentResult & ProvidesDialog {
    return .result(dialog: "Ledger App Intent berhasil dijalankan.")
  }
}

@available(iOS 16.0, *)
struct LedgerGateShortcuts: AppShortcutsProvider {
  static var appShortcuts: [AppShortcut] {
    AppShortcut(intent: LedgerGateCheckIntent(), phrases: ["Check \(.applicationName)"], shortTitle: "Ledger Gate Check", systemImageName: "checkmark.circle")
  }
}
