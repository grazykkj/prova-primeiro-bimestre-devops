output "vpc_id" { value = aws_vpc.main.id }
output "public_subnet_1_id" { value = aws_subnet.public_1.id }
output "rds_subnet_group_name" { value = aws_db_subnet_group.rds.name }
