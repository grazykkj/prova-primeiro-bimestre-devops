module "vpc" {
  source       = "./modules/vpc"
  project_name = var.project_name
}

module "security_group" {
  source       = "./modules/security-group"
  vpc_id       = module.vpc.vpc_id
  project_name = var.project_name
}

module "ec2" {
  source            = "./modules/ec2"
  subnet_id         = module.vpc.public_subnet_1_id
  security_group_id = module.security_group.ec2_sg_id
  project_name      = var.project_name
}

module "rds" {
  source                = "./modules/rds"
  db_subnet_group_name  = module.vpc.rds_subnet_group_name
  security_group_id     = module.security_group.rds_sg_id
  project_name          = var.project_name
}
