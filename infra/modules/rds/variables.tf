variable "db_name" { default = "reservas_db" }
variable "db_user" { default = "postgres" }
variable "db_password" { default = "postgres_password" }
variable "db_subnet_group_name" { type = string }
variable "security_group_id" { type = string }
variable "project_name" { type = string }
