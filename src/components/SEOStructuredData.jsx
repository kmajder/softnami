'use client'

export default function SEOStructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Softnami",
    "description": "Profesjonalne tworzenie stron internetowych dla firm",
    "url": "https://softnami.pl",
    "logo": "https://softnami.pl/softnami-logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "kontakt@softnami.pl",
      "contactType": "Customer Service",
      "areaServed": "PL",
      "availableLanguage": "Polish"
    },
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61578912487648"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "PL"
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Tworzenie Stron Internetowych",
    "description": "Profesjonalne projektowanie i tworzenie responsywnych stron internetowych dla małych i średnich firm",
    "provider": {
      "@type": "Organization",
      "name": "Softnami"
    },
    "areaServed": "PL",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Usługi Web Development",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Strony Internetowe dla Firm",
            "description": "Nowoczesne, responsywne strony internetowe"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Firmowy E-mail",
            "description": "Konfiguracja firmowych adresów e-mail"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Projektowanie Logo",
            "description": "Tworzenie unikalnych logo dla firm"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Wsparcie Techniczne",
            "description": "Stała opieka nad stroną internetową"
          }
        }
      ]
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Softnami",
    "alternateName": "Softnami - Tworzenie Stron Internetowych",
    "url": "https://softnami.pl",
    "description": "Profesjonalne tworzenie stron internetowych dla firm w Polsce",
    "inLanguage": "pl",
    "isAccessibleForFree": true,
    "isFamilyFriendly": true,
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://softnami.pl/?s={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Softnami",
    "description": "Specjalizujemy się w tworzeniu profesjonalnych stron internetowych dla małych i średnich firm",
    "url": "https://softnami.pl",
    "telephone": "+48-XXX-XXX-XXX",
    "email": "kontakt@softnami.pl",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "PL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 52.2297,
      "longitude": 21.0122
    },
    "openingHours": "Mo-Fr 09:00-17:00",
    "priceRange": "1890-5000 PLN",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer",
    "currenciesAccepted": "PLN"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Ile kosztuje stworzenie strony internetowej dla firmy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ceny zaczynają się od 1890 zł za profesjonalną stronę firmową z hostingiem. Koszt zależy od zakresu projektu i funkcjonalności."
        }
      },
      {
        "@type": "Question",
        "name": "Jak długo trwa tworzenie strony internetowej?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Standardowa strona firmowa jest gotowa w ciągu 7-14 dni roboczych. Większe projekty mogą wymagać więcej czasu."
        }
      },
      {
        "@type": "Question",
        "name": "Czy strony są responsywne i dostosowane do telefonów?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tak, wszystkie nasze strony są w pełni responsywne i doskonale wyglądają na komputerach, tabletach i telefonach."
        }
      },
      {
        "@type": "Question",
        "name": "Jakie są dodatkowe koszty?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Koszt roczny za utrzymanie strony to 299 zł i zawiera adres email firmowy w cenie, certyfikat SSL, utrzymanie strony oraz domenę."
        }
      },
      {
        "@type": "Question",
        "name": "Czy otrzymam darmowy projekt?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tak, zanim zapłacisz będziesz mógł zobaczyć jak strona wygląda na żywo, czy odpowiada Twoim potrzebom."
        }
      },
      {
        "@type": "Question",
        "name": "Czy mogę mieć firmowy adres e-mail?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oczywiście! Pomagamy w konfiguracji profesjonalnych adresów e-mail z Twoją domeną, np. kontakt@twojafirma.pl"
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}