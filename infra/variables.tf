variable "resource_group_name" {
  type        = string
  description = "Name of the resource group"
  default     = "rg-retail-lens"
}

variable "location" {
  type        = string
  description = "Azure region to deploy resources"
  default     = "East US"
}

variable "acr_name" {
  type        = string
  description = "Name of the Azure Container Registry"
  default     = "acrretaillens"
}

variable "aks_cluster_name" {
  type        = string
  description = "Name of the AKS cluster"
  default     = "aks-retail-lens"
}

variable "cosmos_db_account_name" {
  type        = string
  description = "Name of the Cosmos DB account"
  default     = "cosmos-retail-lens"
}

variable "cognitive_service_name" {
  type        = string
  description = "Name of the Azure Cognitive Service for Custom Vision"
  default     = "cv-retail-lens"
}
