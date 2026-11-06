import {
  Factory,
  Scale,
  Store,
  Tractor,
  User,
  Warehouse,
  type LucideIcon,
} from "lucide-react";

export const ROLE_IDS = [
  "Farmer",
  "Collector",
  "Factory",
  "Wholesaler",
  "Retailer",
  "Consumer",
] as const;

export type RoleId = (typeof ROLE_IDS)[number];

export interface RoleConfig {
  id: RoleId;
  icon: LucideIcon;
}

export const ROLES: readonly RoleConfig[] = [
  { id: "Farmer", icon: Tractor },
  { id: "Collector", icon: Scale },
  { id: "Factory", icon: Factory },
  { id: "Wholesaler", icon: Warehouse },
  { id: "Retailer", icon: Store },
  { id: "Consumer", icon: User },
];

export const DEFAULT_ROLE: RoleId = "Farmer";
