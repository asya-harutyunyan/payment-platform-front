import { UsersList } from "@/store/reducers/user/usersSlice/types";
import { Dispatch, SetStateAction } from "react";

export type Titles = {
  id: number;
  name: string;
};
export interface ITaskTable {
  titles?: Titles[];
  data: UsersList[];
  bg: "dark" | "light";
  page?: number;
  pageData?: PageData;
  setPageData?: Dispatch<SetStateAction<PageData>>;
}
interface PageData {
  page: number;
  perPage: number;
}
