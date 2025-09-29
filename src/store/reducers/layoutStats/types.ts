export interface WalletDeposits {
  crypto_amount: string;
  fiat_amount: string;
  crypto_percentage: string;
  fiat_percentage: string;
}

export interface Orders {
  card_orders_amount: string;
  orders_for_crypto: string;
  orders_for_fiat: string;
}

export interface LayoutStats {
  wallet_deposits: WalletDeposits;
  orders: Orders;
}

export interface LayoutStatsState {
  loading: boolean;
  error: string | null;
  data?: LayoutStats;
}
