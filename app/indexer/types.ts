import prismadb from '@/lib/prismadb';

export interface RpcEvent {
  type: string;
  guid: any;
  sequence_number: string;
  data: any;
  network: string;
  blockHeight?: string | number;
  transactionHash?: string;
  timestamp: string | number;
}

export type TransactionClient = Omit<
  typeof prismadb,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

export interface EventOptionStringVec {
  vec: string[];
}

export interface PoolRegisteredEventData {
  pool_key: {
    creator_addr: string;
    stake_addr: string;
    reward_addr: string;
  };
  is_dynamic: boolean;
  start_timestamp: string;
  initial_end_timestamp: string;
  initial_reward_per_sec: string;
  boost_enabled: boolean;
  boost_config_collection_owner?: EventOptionStringVec | null;
  boost_config_collection_name?: EventOptionStringVec | null;
  boost_config_percent?: EventOptionStringVec | null;
}