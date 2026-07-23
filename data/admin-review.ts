import { appConfig } from "../lib/app-config";
import { reviewMetadataRepository } from "../lib/admin/review-repository";
import {
  calculateAdminDashboardStats,
  createProtocolReviewInventory,
  getAdminProtocol as findAdminProtocol,
} from "../lib/admin/protocol-review-adapter";
import { protocolCategories } from "./protocols";
import { getStructuredProtocol } from "./structured-protocols";

const defaultSourcePdf = "/protocols/covenant-health-air-protocols.pdf";
const importDate = appConfig.protocolLastUpdated;

export const adminProtocols = createProtocolReviewInventory({
  categories: protocolCategories,
  getStructuredContent: getStructuredProtocol,
  reviewRepository: reviewMetadataRepository,
  importDate,
  defaultSourcePdf,
});

export const adminDashboardStats = calculateAdminDashboardStats(adminProtocols, importDate);

export function getAdminProtocol(slug: string) {
  return findAdminProtocol(adminProtocols, slug);
}
