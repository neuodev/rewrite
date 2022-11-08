export type GetDOMResponse = {
  title: string;
  headlines: string[];
};

export type DOMMessage = {
  type: "GET_DOM";
};
