export type editItem = {
  id: string;
  name: string;
  pos?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  content?: string;
};
