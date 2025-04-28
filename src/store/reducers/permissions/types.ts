import { create_permissions } from "@/schema/create_user.schema";
import { z } from "zod";

export interface PermissionsState {
  loading: boolean;
  error: string | null;
  permissions: Permissions[];
}
export interface Permissions {
  name: string;
}

export type CreatePermissions = z.infer<typeof create_permissions>;
