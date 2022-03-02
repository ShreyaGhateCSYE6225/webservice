packer {
  required_plugins {
    amazon = {
      version = ">= 0.0.2"
      source  = "github.com/hashicorp/amazon"
    }
  }
}

variable "aws_access_key" {
  type    = string
  default = "AKIATLBSIKOQD4DSYNG7"
}

variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "aws_secret_key" {
  type    = string
  default = "ysxNt222FePVQtOteeput3pLRpoNpr4BykahQJq9"
}

variable "source_ami" {
  type    = string
  default = "ami-033b95fb8079dc481"
}

variable "ssh_username" {
  type    = string
  default = "ec2-user"
}

locals { timestamp = regex_replace(timestamp(), "[- TZ:]", "") }

source "amazon-ebs" "autogenerated_1" {
  access_key      = "${var.aws_access_key}"
  ami_description = "Amazon Linux AMI for CSYE 6225"
  ami_name        = "csye6225_spring2022_${local.timestamp}"
  instance_type   = "t2.micro"
  region       = "${var.aws_region}"
  secret_key   = "${var.aws_secret_key}"
  source_ami   = "${var.source_ami}"
  ssh_username = "${var.ssh_username}"
  ami_users     = ["282741675015"]
}

build {
  sources = ["source.amazon-ebs.autogenerated_1"]

  provisioner "file" {
    source = "webservice.zip"
    destination = "~/"
  }

  provisioner "shell" {
      inline =  [
      "cd ~",
      "sudo mkdir -p webservice",
      "sudo chmod 755 webservice",
      "sudo unzip webservice.zip -d ~/webservice",
      "ls -a"
      ]
  }

  provisioner "shell" {
    scripts = [
      "script.sh"
    ]
  }
}