'use client'
import React, { useState, useEffect } from 'react';
import './globals.css';
import SEOStructuredData from '../components/SEOStructuredData';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [contactFormData, setContactFormData] = useState({
    companyName: '',
    email: '',
    websiteType: '',
    description: ''
  });
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [contactMessage, setContactMessage] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openPolicyModal = () => {
    setIsPolicyModalOpen(true);
  };

  const closePolicyModal = () => {
    setIsPolicyModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
      companyName: formData.get('companyName'),
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      projectDescription: formData.get('projectDescription')
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.success) {
        alert(result.message);
        closeModal();
        e.target.reset();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.');
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsContactSubmitting(true);
    setContactMessage('');

    const data = {
      companyName: contactFormData.companyName,
      name: contactFormData.companyName, // Używamy nazwy firmy jako imienia
      email: contactFormData.email,
      phone: '', // Nie mamy pola telefonu w formularzu kontaktowym
      projectDescription: `Typ strony: ${contactFormData.websiteType}\n\nOpis: ${contactFormData.description}`
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.success) {
        setContactMessage('✅ Dziękujemy za wiadomość! Skontaktujemy się z Tobą w ciągu 24 godzin.');
        setContactFormData({
          companyName: '',
          email: '',
          websiteType: '',
          description: ''
        });
      } else {
        setContactMessage(`❌ ${result.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setContactMessage('❌ Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.');
    } finally {
      setIsContactSubmitting(false);
    }
  };

  const handleContactInputChange = (e) => {
    const { name, value } = e.target;
    setContactFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="App">
      <SEOStructuredData />
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <img src="/softnami-logo.png" alt="Softnami" className="nav-logo-image" />
            <span className="logo-text">Softnami</span>
          </div>
          <ul className="nav-menu">
            <li><a href="#home">Strona główna</a></li>
            <li><a href="#services">Usługi</a></li>
            <li><a href="#about">O nas</a></li>
            <li><a href="#contact">Kontakt</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Profesjonalne
              <span className="gradient-text"> Strony Internetowe </span>
              Dla Twojej Firmy
            </h1>
            <p className="hero-subtitle">
              Specjalizujemy się w tworzeniu responsywnych stron WWW dla małych i średnich firm. 
              Oferujemy kompleksowe usługi web development oraz firmowe strony biznesowe.
            </p>
            <div className="price-cta">
              <div className="price-tag">
                <span className="price">Już od 1890 zł</span>
                <span className="price-subtitle">Strona firmowa z hostingiem</span>
              </div>
              <button className="btn-primary" onClick={openModal}>
                Napisz czego potrzebujesz, otrzymasz darmowy projekt!
              </button>
            </div>
          </div>
          <div className="hero-visual">
          <div className="floating-elements">
  <div className="floating-card card-1">
    <div className="card-icon">📩</div>
    <span>Formularze kontaktowe</span>
  </div>
  <div className="floating-card card-2">
    <div className="card-icon">🔔</div>
    <span>Powiadomienia od klientów</span>
  </div>
  <div className="floating-card card-3">
    <div className="card-icon">🧩</div>
    <span>Aplikacje dla Twojej firmy</span>
  </div>
</div>
      </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="modal-header">
              <h2>Opowiedz nam o swojej firmie</h2>
              <p>Wypełnij formularz, a my skontaktujemy się z Tobą w ciągu 24 godzin</p>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label>Nazwa firmy *</label>
                <input type="text" name="companyName" required />
              </div>
              <div className="form-group">
                <label>Twoje imię *</label>
                <input type="text" name="name" required />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input type="email" name="email" required />
              </div>
              <div className="form-group">
                <label>Telefon</label>
                <input type="tel" name="phone" />
              </div>
              <div className="form-group">
                <label>Opisz swój projekt *</label>
                <textarea 
                  name="projectDescription"
                  placeholder="Opowiedz nam o swoim biznesie, celach i tym, czego oczekujesz od strony internetowej..."
                  rows="4"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn-primary">Wyślij zapytanie</button>
            </form>
          </div>
        </div>
      )}

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <div className="section-header">
            <h2>Nasze Usługi - Tworzenie Stron Internetowych dla Firm</h2>
            <p>Profesjonalne strony internetowe dla firm</p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">📧</div>
              <h3>Firmowy e-mail!</h3>
              <p>Stworzymy dla Ciebie własny firmowy e-mail, np. kontakt@twojafirma.pl</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🎨</div>
              <h3>Logo na start</h3>
              <p>Jeśli Twoja firma nie posiada logo, stworzymy je za Ciebie!</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🔧</div>
              <h3>Wsparcie Techniczne</h3>
              <p>Stała opieka nad stroną, aktualizacje, kopie zapasowe i pomoc w razie problemów.</p>
            </div>
          </div>
        </div>
      </section>

      {/* No Worries Section */}
      <section className="no-worries">
        <div className="container">
          <div className="no-worries-content">
            <div className="no-worries-text">
              <h2>Nie Musisz Się O Nic Martwić!</h2>
              <p className="no-worries-subtitle">
                My zajmujemy się wszystkim - Ty skup się na swoim biznesie
              </p>
              <div className="worry-free-features">
                <div className="feature-item">
                  <div className="feature-icon">✅</div>
                  <div>
                    <h4>Projektowanie i Programowanie</h4>
                    <p>Tworzymy stronę od A do Z według Twoich potrzeb</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✅</div>
                  <div>
                    <h4>Hosting i Domeny</h4>
                    <p>Zapewniamy hosting, domenę i certyfikat SSL</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✅</div>
                  <div>
                    <h4>Aktualizacje i Bezpieczeństwo</h4>
                    <p>Regularnie aktualizujemy i zabezpieczamy Twoją stronę</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✅</div>
                  <div>
                    <h4>Wsparcie</h4>
                    <p>Jesteśmy dostępni gdy potrzebujesz pomocy</p>
                  </div>
                </div>
              </div>
              <div className="no-worries-cta">
                <p className="cta-text">Ty prowadzisz biznes, my dbamy o Twoją stronę!</p>
                <button className="btn-primary" onClick={openModal}>
                  Zacznijmy Współpracę
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Dlaczego Warto Wybrać Softnami? - Najlepsze Strony WWW dla Biznesu</h2>
              <p>
                Specjalizujemy się w tworzeniu profesjonalnych stron internetowych dla firm. 
                Rozumiemy, że każda złotówka ma znaczenie, dlatego oferujemy wysokiej jakości 
                strony w przystępnych cenach, bez ukrytych kosztów.
              </p>
              <p>
                Nasze strony są nie tylko ładne, ale przede wszystkim funkcjonalne - pomagają 
                w prezentacji firmy i budowaniu zaufania klientów. Każdy projekt traktujemy indywidualnie, 
                dostosowując rozwiązania do specyfiki branży.
              </p>
              <div className="stats">
                <div className="stat">
                  <h3>100%</h3>
                  <p>Zadowolenia</p>
                </div>
              </div>
            </div>
            <div className="about-visual">
              <div className="team-illustration">
                <div className="team-member member-1"></div>
                <div className="team-member member-2"></div>
                <div className="team-member member-3"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq">
        <div className="container">
          <div className="section-header">
            <h2>Często Zadawane Pytania - Tworzenie Stron Internetowych</h2>
            <p>Odpowiedzi na najczęstsze pytania dotyczące naszych usług</p>
          </div>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>Ile kosztuje stworzenie strony internetowej dla firmy?</h3>
              <p>Ceny zaczynają się od 1890 zł za profesjonalną stronę firmową z hostingiem. Koszt zależy od zakresu projektu i funkcjonalności.</p>
            </div>
            <div className="faq-item">
              <h3>Jak długo trwa tworzenie strony internetowej?</h3>
              <p>Standardowa strona firmowa jest gotowa w ciągu 7-14 dni roboczych. Większe projekty mogą wymagać więcej czasu.</p>
            </div>
            <div className="faq-item">
              <h3>Czy strony są responsywne i dostosowane do telefonów?</h3>
              <p>Tak, wszystkie nasze strony są w pełni responsywne i doskonale wyglądają na komputerach, tabletach i telefonach.</p>
            </div>
            <div className="faq-item">
              <h3>Jakie są dodatkowe koszty?</h3>
              <p>Koszt roczny za utrzymanie strony to 299 zł i zawiera adres email firmowy w cenie, certyfikat SSL, oraz domenę.</p>
            </div>
            <div className="faq-item">
              <h3>Czy otrzymam darmowy projekt?</h3>
              <p>Tak, zanim zapłacisz będziesz mógł zobaczyć jak strona wygląda na żywo, ocenisz czy odpowiada Twoim potrzebom.</p>
            </div>
            <div className="faq-item">
              <h3>Czy mogę mieć firmowy adres e-mail?</h3>
              <p>Oczywiście! Pomagamy w konfiguracji profesjonalnych adresów e-mail z Twoją domeną, np. kontakt@twojafirma.pl</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <h2>Skontaktuj się z nami - Darmowy Projekt Strony Internetowej</h2>
              <p>
                Masz pomysł na stronę internetową? Chcesz profesjonalnie zaprezentować swój biznes online? 
                Skontaktuj się z nami - pomożemy Ci stworzyć profesjonalną stronę, 
                która będzie wizytówką Twojej firmy.
              </p>
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">📧</div>
                  <div>
                    <h4>Email</h4>
                    <p>kontakt@softnami.pl</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">📍</div>
                  <div>
                    <h4>Lokalizacja</h4>
                    <p>Warszawa, Polska</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <form onSubmit={handleContactSubmit}>
                <div className="form-group">
                  <input 
                    type="text" 
                    name="companyName"
                    placeholder="Nazwa Firmy" 
                    value={contactFormData.companyName}
                    onChange={handleContactInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Twój Email" 
                    value={contactFormData.email}
                    onChange={handleContactInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="text" 
                    name="websiteType"
                    placeholder="Typ Strony (firmowa/blog)" 
                    value={contactFormData.websiteType}
                    onChange={handleContactInputChange}
                  />
                </div>
                <div className="form-group">
                  <textarea 
                    name="description"
                    placeholder="Opowiedz nam o swoim biznesie i potrzebach..." 
                    rows="5"
                    value={contactFormData.description}
                    onChange={handleContactInputChange}
                  ></textarea>
                </div>
                {contactMessage && (
                  <div className={`contact-message ${contactMessage.includes('✅') ? 'success' : 'error'}`}>
                    {contactMessage}
                  </div>
                )}
                <button 
                  type="submit" 
                  className="btn-primary" 
                  disabled={isContactSubmitting}
                >
                  {isContactSubmitting ? 'Wysyłanie...' : 'Wyślij Zapytanie'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Softnami</h3>
              <p>Tworzymy profesjonalne strony internetowe dla firm.</p>
            </div>
            <div className="footer-section">
              <h4>Usługi</h4>
              <ul>
                <li>Strony Firmowe</li>
                <li>Wsparcie Techniczne</li>
                <li>Hosting i Domeny</li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Social Media</h4>
              <div className="social-links">
                <a href="https://www.facebook.com/profile.php?id=61578912487648" className="social-link">Facebook</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025  Softnami. Wszystkie prawa zastrzeżone.</p>
            <button onClick={openPolicyModal} className="policy-link">
              Polityka prywatności
            </button>
          </div>
        </div>
      </footer>

      {/* Policy Modal */}
      {isPolicyModalOpen && (
        <div className="modal-overlay" onClick={closePolicyModal}>
          <div className="modal-content policy-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closePolicyModal}>×</button>
            <div className="modal-header">
              <h2>📄 Polityka prywatności</h2>
            </div>
            <div className="policy-content">
              <div className="policy-section">
                <h3>1. Administrator danych</h3>
                <p>Administratorem Twoich danych osobowych jest:<br/>
                <strong>Kacper Majder "Softnami"</strong><br/>
                E-mail kontaktowy: kontakt@softnami.pl</p>
              </div>

              <div className="policy-section">
                <h3>2. Jakie dane zbieramy i w jakim celu?</h3>
                <p>Za pomocą formularza kontaktowego zbieramy następujące dane:</p>
                <ul>
                  <li>Nazwa firmy</li>
                  <li>Twoje imię</li>
                  <li>Adres e-mail</li>
                  <li>Numer telefonu (opcjonalnie)</li>
                  <li>Opis projektu</li>
                </ul>
                <p>Dane te są przetwarzane wyłącznie w celu odpowiedzi na Twoje zapytanie oraz ewentualnej dalszej korespondencji dotyczącej współpracy.</p>
              </div>

              <div className="policy-section">
                <h3>3. Podstawa prawna przetwarzania</h3>
                <p>Dane są przetwarzane zgodnie z art. 6 ust. 1 lit. b RODO – czyli w celu podjęcia działań przed zawarciem umowy, na żądanie osoby, której dane dotyczą.</p>
              </div>

              <div className="policy-section">
                <h3>4. Komu przekazujemy dane?</h3>
                <p>Dane nie są przekazywane żadnym podmiotom trzecim, z wyjątkiem:</p>
                <ul>
                  <li>firm hostingowych utrzymujących stronę i skrzynkę e-mail, na zasadzie powierzenia przetwarzania danych.</li>
                </ul>
                <p>Dane nie są przekazywane poza Europejski Obszar Gospodarczy (EOG).</p>
              </div>

              <div className="policy-section">
                <h3>5. Jak długo przechowujemy dane?</h3>
                <p>Dane będą przechowywane przez czas niezbędny do prowadzenia korespondencji oraz ewentualnej współpracy, jednak nie dłużej niż 12 miesięcy od ostatniego kontaktu.</p>
              </div>

              <div className="policy-section">
                <h3>6. Jakie masz prawa?</h3>
                <p>Masz prawo do:</p>
                <ul>
                  <li>dostępu do swoich danych,</li>
                  <li>sprostowania danych,</li>
                  <li>usunięcia danych,</li>
                  <li>ograniczenia przetwarzania,</li>
                  <li>wniesienia sprzeciwu,</li>
                  <li>złożenia skargi do Prezesa Urzędu Ochrony Danych Osobowych.</li>
                </ul>
              </div>

              <div className="policy-section">
                <h3>7. Dobrowolność podania danych</h3>
                <p>Podanie danych w formularzu jest dobrowolne, ale niezbędne do nawiązania kontaktu.</p>
              </div>

              <div className="policy-section">
                <h3>8. Pliki cookies</h3>
                <p>Strona może używać plików cookies wyłącznie w celach technicznych (np. poprawne działanie formularza). Nie korzystamy z narzędzi analitycznych ani marketingowych.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
