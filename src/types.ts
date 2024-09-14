export type Settings = {
  amount: number;
  title: string;
  color: string;
  iconColor: string;
};

export type DataItem = {
  _id?: string;
  data: Record<string, any>;
};