declare module "@coworkers-types" {
  export type Message = {
    message: string;
  };

  export type ImageURL = {
    url: string;
  };

  export type Profile = {
    image?: string;
    name?: string;
  };

  export type Toast = {
    type: "info" | "success" | "warn" | "danger";
    content: string;
  };
}
