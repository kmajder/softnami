# 🐳 Docker Setup dla Softnami

Kompletna konfiguracja Docker dla aplikacji Next.js z nginx reverse proxy.

## 📁 Struktura plików

```
backend/
├── Dockerfile                 # Dockerfile dla aplikacji Next.js
├── docker-compose.yml         # Orchestracja kontenerów
├── .dockerignore             # Pliki ignorowane przez Docker
├── nginx/
│   ├── nginx.conf            # Główna konfiguracja nginx
│   ├── conf.d/
│   │   └── softnami.pl.conf  # Konfiguracja dla domeny
│   └── ssl/                  # Certyfikaty SSL
└── src/app/api/health/
    └── route.ts              # Endpoint health check
```

## 🚀 Szybki start

### 1. Przygotowanie środowiska

### 2. Budowanie obrazu (opcjonalne)

```bash
# Budowanie obrazu aplikacji
docker-compose build

# Lub budowanie konkretnego serwisu
docker-compose build app

# Budowanie z cache
docker-compose build --no-cache
```

```bash
# Skopiuj zmienne środowiskowe
cp .env.example .env

# Edytuj .env i dodaj swoje dane email
nano .env
```

### 3. Przygotowanie certyfikatów SSL

```bash
# Utwórz certyfikaty SSL (dla development)
cd nginx/ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout softnami.pl.key \
  -out softnami.pl.crt \
  -subj "/C=PL/ST=Warszawa/L=Warszawa/O=Softnami/CN=softnami.pl"
```

### 4. Uruchomienie aplikacji

```bash
# Budowanie i uruchomienie (buduje obraz automatycznie)
docker-compose up -d

# Lub z wymuszeniem przebudowania
docker-compose up -d --build

# Sprawdzenie statusu
docker-compose ps

# Logi
docker-compose logs -f
```

## 🔧 Konfiguracja

### Zmienne środowiskowe (.env)

```env
# Email Configuration
EMAIL_USER=twoj.email@gmail.com
EMAIL_PASS=twoje_haslo_aplikacji_gmail

# Node Environment
NODE_ENV=production

# Next.js Configuration
NEXT_TELEMETRY_DISABLED=1
```

### Build Arguments

Docker Compose automatycznie buduje obraz z następującymi argumentami:
- `NODE_ENV=production` - środowisko produkcyjne

### Porty

- **80** - HTTP (redirect do HTTPS)
- **443** - HTTPS
- **3000** - Aplikacja Next.js (wewnętrzny)

### Domena

- **softnami.pl**
- **www.softnami.pl**

## 🛡️ Bezpieczeństwo

### Nginx Security Headers

- `X-Frame-Options: SAMEORIGIN`
- `X-XSS-Protection: 1; mode=block`
- `X-Content-Type-Options: nosniff`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`

### Rate Limiting

- **API**: 10 requestów/sekundę
- **Ogólne**: 30 requestów/sekundę

### SSL/TLS

- TLS 1.2 i 1.3
- Silne szyfry
- HSTS enabled

## 📊 Monitoring

### Health Checks

```bash
# Sprawdź status aplikacji
curl https://softnami.pl/health

# Sprawdź API
curl https://softnami.pl/api/health
```

### Logi

```bash
# Logi aplikacji
docker-compose logs app

# Logi nginx
docker-compose logs nginx

# Wszystkie logi
docker-compose logs -f
```

## 🔄 Deployment

### Production

```bash
# Zatrzymaj kontenery
docker-compose down

# Pobierz najnowsze zmiany
git pull

# Uruchom ponownie
docker-compose up -d --build
```

### Backup

```bash
# Backup bazy danych (jeśli będzie)
docker-compose exec app npm run backup

# Backup konfiguracji
tar -czf backup-$(date +%Y%m%d).tar.gz nginx/ .env
```

## 🐛 Troubleshooting

### Problemy z SSL

```bash
# Sprawdź certyfikaty
openssl x509 -in nginx/ssl/softnami.pl.crt -text -noout

# Test nginx config
docker-compose exec nginx nginx -t
```

### Problemy z aplikacją

```bash
# Sprawdź logi aplikacji
docker-compose logs app

# Restart aplikacji
docker-compose restart app

# Sprawdź health check
curl http://localhost:3000/api/health
```

### Problemy z nginx

```bash
# Sprawdź logi nginx
docker-compose logs nginx

# Test konfiguracji
docker-compose exec nginx nginx -t

# Reload nginx
docker-compose exec nginx nginx -s reload
```

## 📈 Performance

### Optymalizacje

- **Gzip compression** dla wszystkich plików tekstowych
- **HTTP/2 Server Push** dla krytycznych zasobów
- **Static file caching** (1 rok)
- **Proxy caching** dla API
- **Worker processes** automatycznie dostosowane

### Monitoring

```bash
# Sprawdź użycie zasobów
docker stats

# Sprawdź wolumeny
docker volume ls

# Sprawdź sieci
docker network ls
```

## 🔄 Aktualizacje

### Aktualizacja aplikacji

```bash
# Zatrzymaj kontenery
docker-compose down

# Pobierz zmiany
git pull

# Przebuduj i uruchom
docker-compose up -d --build
```

### Aktualizacja nginx

```bash
# Aktualizuj konfigurację nginx
nano nginx/conf.d/softnami.pl.conf

# Reload nginx
docker-compose exec nginx nginx -s reload
```

## 📞 Support

W przypadku problemów:

1. Sprawdź logi: `docker-compose logs -f`
2. Sprawdź health check: `curl https://softnami.pl/health`
3. Sprawdź status kontenerów: `docker-compose ps`
4. Restart kontenerów: `docker-compose restart` 