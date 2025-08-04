# Softnami - Zintegrowany Projekt Next.js

To jest zintegrowany projekt Next.js zawierający zarówno frontend (React) jak i backend (API do wysyłania maili).

## Struktura Projektu

```
backend/
├── src/
│   ├── app/
│   │   ├── page.jsx          # Główna strona (frontend React)
│   │   ├── layout.tsx        # Layout aplikacji
│   │   ├── globals.css       # Style CSS
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts  # API endpoint do wysyłania maili
│   └── config/
│       └── email.ts          # Konfiguracja email
├── public/
│   └── softnami-logo.png     # Logo firmy
└── package.json
```

## Uruchomienie Projektu

1. **Zainstaluj zależności:**
   ```bash
   npm install
   ```

2. **Skonfiguruj dane email (opcjonalnie):**
   Utwórz plik `.env.local` w folderze `backend` z następującą zawartością:
   ```
   EMAIL_USER=kontakt@softnami.pl
   EMAIL_PASS=twoje_haslo_email_ovh
   ```

3. **Uruchom projekt:**
   ```bash
   npm run dev
   ```

4. **Otwórz przeglądarkę:**
   Przejdź do `http://localhost:3000`

## Konfiguracja Email (OVH)

Aby wysyłanie maili działało poprawnie z OVH:

1. **Zaloguj się do panelu OVH** i przejdź do sekcji Email
2. **Skonfiguruj email dla domeny softnami.pl**
3. **Ustaw hasło dla konta email** w panelu OVH
4. **Dodaj dane do `.env.local`:**
   ```
   EMAIL_USER=kontakt@softnami.pl
   EMAIL_PASS=twoje_haslo_email_ovh
   ```

**Uwaga:** Używamy SMTP OVH (`smtp.mail.ovh.net`) na porcie 587 z TLS.

## Funkcjonalności

### Frontend
- Responsywna strona firmowa
- Formularz kontaktowy
- Sekcje: Hero, Usługi, O nas, Kontakt
- Nowoczesny design z animacjami

### Backend
- API endpoint `/api/contact` do wysyłania maili
- Walidacja danych formularza
- Integracja z OVH SMTP
- Obsługa błędów

## Technologie

- **Frontend:** React 19, Next.js 15, CSS3
- **Backend:** Next.js API Routes, Nodemailer
- **Styling:** Custom CSS z responsywnym designem
- **Deployment:** Gotowy do wdrożenia na Vercel/Netlify

## Struktura API

### POST /api/contact
Wysyła email z formularza kontaktowego.

**Request Body:**
```json
{
  "companyName": "Nazwa firmy",
  "name": "Imię i nazwisko",
  "email": "email@example.com",
  "phone": "123456789",
  "projectDescription": "Opis projektu"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Dziękujemy za wiadomość! Skontaktujemy się z Tobą w ciągu 24 godzin."
}
```

## Rozwój

- **Port:** 3000 (domyślny Next.js)
- **Hot Reload:** Automatyczne odświeżanie przy zmianach
- **TypeScript:** Wsparcie dla TypeScript w API routes
- **ESLint:** Konfiguracja lintingu

## Wdrożenie

Projekt jest gotowy do wdrożenia na:
- **Vercel** (zalecane dla Next.js)
- **Netlify**
- **Inne platformy** wspierające Node.js

Wystarczy połączyć repozytorium z platformą wdrożeniową.
