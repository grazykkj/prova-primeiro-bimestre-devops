output "ec2_public_ip" { value = module.ec2.public_ip }
output "rds_endpoint" { value = module.rds.endpoint }
output "api_url" { value = "http://${module.ec2.public_ip}:3000" }
