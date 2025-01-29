import { User } from "@/common/types";
import { Dispatch, SetStateAction } from "react";

export type Titles = {
  id: number;
  name: string;
};
export interface ITaskTable {
  titles?: Titles[];
  data: User[];
  bg: "dark" | "light";
  page?: number;
  setPage?: Dispatch<SetStateAction<number>>;
}
