// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Contact form
//
// Real delivery via FormSubmit (https://formsubmit.co) — the same setup
// Newood Millwork uses. Submissions are emailed to the business inbox via
// the AJAX endpoint, so the visitor stays on the page and gets an in-page
// success or error message. A hidden honeypot field (_honey) traps bots.
const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/marksong0000@gmail.com';

const quoteForm = document.getElementById('quoteForm');
if (quoteForm) {
  const statusEl = document.getElementById('formStatus');
  const submitBtn = quoteForm.querySelector('button[type="submit"]');

  function setStatus(msg, kind) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.classList.toggle('form-error', kind === 'error');
    statusEl.classList.toggle('form-success', kind === 'success');
  }

  quoteForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('qName')?.value.trim() || '';
    const email = document.getElementById('qEmail')?.value.trim() || '';
    const phone = document.getElementById('qPhone')?.value.trim() || '';
    const type = document.getElementById('qType')?.value || '';
    const details = document.getElementById('qDetails')?.value.trim() || '';
    const honey = quoteForm.querySelector('input[name="_honey"]')?.value || '';

    if (honey) return; // bot trap — silently drop

    if (!name || !email) {
      setStatus('Please fill in your name and email address.', 'error');
      return;
    }

    if (submitBtn) submitBtn.disabled = true;
    setStatus('Sending…', '');

    try {
      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          project_type: type,
          message: details,
          _subject: `Havenwest Closets Inquiry: ${type || 'Custom Closet'} — ${name}`,
          _template: 'table',
          _captcha: 'false',
          _honey: honey
        })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && (data.success === true || data.success === 'true')) {
        quoteForm.reset();
        setStatus("Thanks — your message is in. We'll reply within 1–2 business days.", 'success');
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err) {
      setStatus("Something went wrong sending your message. Please call (289) 500-5666 or email marksong0000@gmail.com and we'll help right away.", 'error');
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

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('open')) {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.focus();
    }
  });
}
