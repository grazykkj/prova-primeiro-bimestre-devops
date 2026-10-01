variable "instance_type" {
  type        = string
  default     = "t2.micro"
  description = "Tipo da instância EC2"
}

variable "subnet_id" {
  type        = string
  description = "ID da Subnet pública onde a EC2 vai rodar"
}

variable "security_group_id" {
  type        = string
  description = "ID do Security Group da EC2"
}

variable "project_name" {
  type        = string
  default     = "reservas-api"
  description = "Nome do projeto"
}

variable "tags" {
  type        = map(string)
  default     = {}
  description = "Tags para a EC2"
}
