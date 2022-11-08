export enum MessageType {
  GetShortcuts = "get-shortcuts-list",
  ShortcutsRes = "get-shortcuts-response",
}

export type Message =
  | {
      type: MessageType.GetShortcuts;
    }
  | {
      type: MessageType.ShortcutsRes;
      shortcuts: Array<Shortcut>;
    };

export type ExtensionRes = Shortcut[] | {};

export type Shortcut = {
  key: string;
  value: string;
  prefix: Prefix;
};

export enum Prefix {
  Hash = "#",
  Slash = "/",
  AtSign = "@",
}
