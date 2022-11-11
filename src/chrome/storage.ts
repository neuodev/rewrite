import { StorageKeys } from "../constants";
import { Message, MessageType, Prefix, Shortcut } from "../types";

class Storage {
  async getShortcuts(): Promise<Array<Shortcut>> {
    const result = (await chrome.storage.sync.get(StorageKeys.shortcuts)) as {
      [StorageKeys.shortcuts]: Array<Shortcut>;
    };
    return result[StorageKeys.shortcuts] || [];
  }

  async saveShortcuts(shortcuts: Shortcut[]) {
    const list = JSON.parse(JSON.stringify(shortcuts));
    await chrome.storage.sync.set({
      [StorageKeys.shortcuts]: list,
    });

    chrome.tabs &&
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        (tabs) => {
          console.log(tabs);
          chrome.tabs.sendMessage(
            tabs[0].id || 0,
            {
              type: MessageType.ShortcutsRes,
              shortcuts: list,
            } as Message,
            () => {}
          );
        }
      );
  }

  async newShortcut(shortcut: Shortcut) {
    const shortcuts = await this.getShortcuts();
    shortcuts.push(shortcut);
    await this.saveShortcuts(shortcuts);
  }

  async isExist(prefix: Prefix, command: string): Promise<boolean> {
    const shortcuts = await this.getShortcuts();
    return shortcuts.some((s) => s.command === command && s.prefix === prefix);
  }

  async deleteShortcut(prefix: Prefix, command: string) {
    const shortcuts = await this.getShortcuts();
    await this.saveShortcuts(
      shortcuts.filter((s) => s.command !== command && s.prefix !== prefix)
    );
  }

  async toggleShortcut(prefix: Prefix, command: string) {
    const shortcuts = await this.getShortcuts();
    const shortcut = shortcuts.find(
      (s) => s.prefix === prefix && s.command === command
    );

    if (!shortcut) return;
    shortcut.enabled = !shortcut.enabled;

    this.saveShortcuts(shortcuts);
  }

  async update(query: { prefix: Prefix; command: string }, shortcut: Shortcut) {
    const shortcuts = await this.getShortcuts();
    const filteredShortcuts = shortcuts.filter(
      (s) => s.command !== query.command && s.prefix !== query.prefix
    );
    filteredShortcuts.push(shortcut);
    await this.saveShortcuts(filteredShortcuts);
  }
}

const storage = new Storage();
export default storage;
