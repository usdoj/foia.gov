#!/bin/bash
# This script provisions a VM for use with the FOIA proxy. It is run
# automatically by vagrant. Generally, the vagrant VM is not needed for
# development, only testing the foia-proxy.php and htaccess configuration.

set -o errexit
set -o pipefail
set -o nounset

# Update the OS
apt-get update
apt-get dist-upgrade -y

# Install the dependencies
apt-get install -y \
  apache2 \
  libapache2-mod-php \
  php-curl

# Enable apache modules
a2enmod php7.0 \
  rewrite \
  headers

# Symlink document root to build dir
ln -sf /vagrant/_site /var/www/vagrant

# Site configuration for apache
cat <<EOF > /etc/apache2/sites-available/vagrant.conf
<VirtualHost *:80>
  DocumentRoot /var/www/vagrant

  <Directory /var/www/vagrant>
    AllowOverride All
  </Directory>
</VirtualHost>
EOF

# Enable our site, disable the rest
a2ensite vagrant
a2dissite 000-default

systemctl restart apache2
