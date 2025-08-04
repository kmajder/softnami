'use client'
import React, { useState, useEffect } from 'react';
import './globals.css';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <div className="App">
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
              Tworzymy nowoczesne, responsywne strony internetowe dla firm i startupów. 
              Pomagamy przedsiębiorcom zaistnieć w internecie i przyciągnąć nowych klientów.
            </p>
            <div className="price-cta">
              <div className="price-tag">
                <span className="price">Już od 2499 zł</span>
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
              <h2>Opowiedz nam o swoim projekcie</h2>
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
            <h2>Co Oferujemy</h2>
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
              <h2>Dlaczego Softnami?</h2>
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

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <h2>Wynieś swój biznes na nowy poziom</h2>
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
              <form>
                <div className="form-group">
                  <input type="text" placeholder="Nazwa Firmy" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Twój Email" required />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Typ Strony (firmowa/blog)" />
                </div>
                <div className="form-group">
                  <textarea placeholder="Opowiedz nam o swoim biznesie i potrzebach..." rows="5"></textarea>
                </div>
                <button type="submit" className="btn-primary">Wyślij Zapytanie</button>
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
                <a href="#" className="social-link">Facebook</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025  Softnami. Wszystkie prawa zastrzeżone.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
