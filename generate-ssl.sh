#!/bin/bash

# Skrypt do generowania certyfikatów SSL dla softnami.pl

echo "🔐 Generowanie certyfikatów SSL dla softnami.pl..."

# Utwórz folder ssl jeśli nie istnieje
mkdir -p nginx/ssl

# Generuj certyfikat SSL
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout nginx/ssl/softnami.pl.key \
  -out nginx/ssl/softnami.pl.crt \
  -subj "/C=PL/ST=Warszawa/L=Warszawa/O=Softnami/CN=softnami.pl"

# Ustaw uprawnienia
chmod 600 nginx/ssl/softnami.pl.key
chmod 644 nginx/ssl/softnami.pl.crt

echo "✅ Certyfikaty SSL zostały wygenerowane!"
echo "📁 Lokalizacja: nginx/ssl/"
echo "🔑 Klucz: softnami.pl.key"
echo "📜 Certyfikat: softnami.pl.crt"

# Sprawdź certyfikat
echo ""
echo "🔍 Informacje o certyfikacie:"
openssl x509 -in nginx/ssl/softnami.pl.crt -text -noout | grep -E "(Subject:|Not Before|Not After)"

echo ""
echo "🚀 Możesz teraz uruchomić aplikację:"
echo "docker-compose up -d --build" 