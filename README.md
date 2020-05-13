# DLSetup
## Install Guest add
## Docker
https://docs.docker.com/engine/install/ubuntu/
* sudo apt-get update
* sudo apt-get install     apt-transport-https     ca-certificates     curl     gnupg-agent     software-properties-common
* curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
* sudo apt-key fingerprint 0EBFCD88
* sudo add-apt-repository    "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic   10     stable"
* sudo apt-get update
* sudo apt-get install docker-ce docker-ce-cli containerd.io
### Fix
* sudo usermod -a -G docker $USER
* Reboot
## Portainer
https://www.portainer.io/installation/
* docker volume create portainer_data
* docker run -d -p 8000:8000 -p 9000:9000 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer
## Apps
https://fleet.linuxserver.io/
### Watchtower
## Fix permissions
sudo chmod knf:knf -R *
restart containers


