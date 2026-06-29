output "acr_login_server" {
  value = azurerm_container_registry.acr.login_server
}

output "aks_cluster_name" {
  value = azurerm_kubernetes_cluster.aks.name
}

output "cosmos_db_endpoint" {
  value = azurerm_cosmosdb_account.db.endpoint
}

output "custom_vision_endpoint" {
  value = azurerm_cognitive_account.cv.endpoint
}
