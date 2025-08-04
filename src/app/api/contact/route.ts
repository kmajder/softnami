import { NextRequest, NextResponse } from 'next/server';
import * as nodemailer from 'nodemailer';
import { emailConfig } from '../../../config/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { companyName, name, email, phone, projectDescription } = body;

    // Walidacja danych
    if (!companyName || !name || !email || !projectDescription) {
      return NextResponse.json(
        { success: false, message: 'Wszystkie wymagane pola muszą być wypełnione' },
        { status: 400 }
      );
    }

    // Konfiguracja transportera email
    const transporter = nodemailer.createTransport({
      host: emailConfig.host,
      port: emailConfig.port,
      secure: emailConfig.secure,
      auth: {
        user: emailConfig.user,
        pass: emailConfig.pass,
      },
    });

    // Treść wiadomości
    const mailOptions = {
      from: emailConfig.user,
      to: emailConfig.to,
      subject: `Nowe zapytanie ze strony - ${companyName}`,
      html: `
        <h2>Nowe zapytanie ze strony internetowej</h2>
        <p><strong>Firma:</strong> ${companyName}</p>
        <p><strong>Imię:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone || 'Nie podano'}</p>
        <p><strong>Opis projektu:</strong></p>
        <p>${projectDescription}</p>
        <hr>
        <p><small>Wiadomość wysłana automatycznie ze strony softnami.pl</small></p>
      `,
    };

    // Wysyłanie emaila
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Dziękujemy za wiadomość! Skontaktujemy się z Tobą w ciągu 24 godzin.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Błąd wysyłania emaila:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.' 
      },
      { status: 500 }
    );
  }
} 