// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Contact form
//
// Real delivery via Web3Forms (https://web3forms.com) — free, no backend
// required. Sign up with the business email, get an access key, and paste
// it below. Until a real key is set, the form falls back to opening a
// pre-filled email (mailto:), which still works but is not tracked or
// guaranteed to reach an inbox reliably from every device/email client.
const WEB3FORMS_ACCESS_KEY = 'REPLACE_WITH_REAL_WEB3FORMS_ACCESS_KEY';

const quoteForm = document.getElementById('quoteForm');
if (quoteForm) {
  const statusEl = document.getElementById('formStatus');
  const submitBtn = quoteForm.querySelector('button[type="submit"]');

  function sendViaMailto(name, email, phone, type, details) {
    const subject = `Havenwest Closets Inquiry: ${type || 'Custom Closet'} — ${name}`;
    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      `Project Type: ${type || 'Not specified'}`,
      '',
      'Project Details:',
      details || '(none provided)'
    ].filter(Boolean);
    window.location.href = `mailto:info@harbourclosets.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
  }

  quoteForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('qName')?.value.trim() || '';
    const email = document.getElementById('qEmail')?.value.trim() || '';
    const phone = document.getElementById('qPhone')?.value.trim() || '';
    const type = document.getElementById('qType')?.value || '';
    const details = document.getElementById('qDetails')?.value.trim() || '';

    if (!name || !email) {
      alert('Please fill in your name and email address.');
      return;
    }

    const hasRealKey = WEB3FORMS_ACCESS_KEY && !WEB3FORMS_ACCESS_KEY.startsWith('REPLACE_WITH');
    if (!hasRealKey) {
      sendViaMailto(name, email, phone, type, details);
      return;
    }

    if (submitBtn) submitBtn.disabled = true;
    if (statusEl) statusEl.textContent = 'Sending…';

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Havenwest Closets Inquiry: ${type || 'Custom Closet'} — ${name}`,
          name,
          email,
          phone,
          project_type: type,
          message: details
        })
      });
      const data = await res.json();
      if (data.success) {
        quoteForm.reset();
        if (statusEl) statusEl.textContent = "Thanks — we'll be in touch within 24–48 business hours.";
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err) {
      // Real delivery failed — fall back to mailto rather than losing the lead.
      sendViaMailto(name, email, phone, type, details);
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
}

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}
