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
  id: string;
  command: string;
  text: string;
  prefix: Prefix;
  enabled: boolean;
};

export enum Prefix {
  Hash = "#",
  Slash = "/",
  AtSign = "@",
}
