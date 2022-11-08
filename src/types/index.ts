// Todo: Remove it
export type GetDOMResponse = {
  title: string;
  headlines: string[];
};

// Todo: Remove it
export type DOMMessage = {
  type: "GET_DOM";
};

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
