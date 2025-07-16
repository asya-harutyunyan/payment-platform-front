import { DEPOSIT_STATUSES } from "@/enum/deposit.status.enum";

export interface ServerInfoState {
  loading: boolean;
  error: string | null;
  serverInfo?: SystemHealthReport;
}
export interface ServerInfo {
  page: number;
  per_page: number;
  status_by_client?: DEPOSIT_STATUSES;
  name?: string;
  surname?: string;
  amount?: number;
  status_by_admin?: DEPOSIT_STATUSES;
  status_client?: DEPOSIT_STATUSES;
  sort?: "ASC" | "DESC";
  card_number?: string;
  from?: string;
  to?: string;
  transaction_id?: string;
}
export type ZabbixMetrics = {
  disk_used_percent: string;
  disk_total: string;
  disk_used: string;
  memory_available: string;
  memory_available_percent: string;
  cpu_usage: string;
  title?: string;
};

export type ZabbixData = {
  [hostId: string]: ZabbixMetrics;
};

type ServiceStatusOK = {
  status: "ok";
  http_code?: number;
  response_time_ms?: number;
  message?: string;
  response?: {
    token: string;
    type: string;
  };
};

type ServiceStatusError = {
  status: "error";
  http_code?: number;
  response_time_ms?: number;
  message?: string;
};

type ServiceStatus = ServiceStatusOK | ServiceStatusError;

export type SystemHealthReport = {
  zabbix: ZabbixData;
  mysql: {
    status: "ok";
    response_time_ms: number;
  };
  db_connections: number;
  ping: "up" | "down";
  frontend: ServiceStatus;
  backend: ServiceStatus;
  ssl_cert: ServiceStatus;
  partner_api: ServiceStatus;
  login_check: ServiceStatusOK;
  health_check: ServiceStatusOK;
};
