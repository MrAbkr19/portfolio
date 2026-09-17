// Fonction serverless Vercel — s'exécute côté serveur, jamais dans le navigateur.
// Petit utilitaire : neutralise le HTML saisi par l'utilisateur
// (évite l'injection de code dans l'email).
const esc = (s) => String(s ?? '').replace(/[<>&"]/g, (c) =>
  ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]));

export default async function handler(req, res) {
  // 1. On n'accepte que la méthode POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { name, email, message, website } = req.body || {};

  // 2. Anti-robot (honeypot) : le champ "website" est caché aux humains.
  // S'il est rempli, c'est un robot : on fait comme si tout allait bien.
  if (website) return res.status(200).json({ ok: true });

  // 3. Validation minimale
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Champs manquants' });
  }

  const API_KEY = process.env.BREVO_API_KEY;
  const SENDER = process.env.SENDER_EMAIL; // expéditeur vérifié dans Brevo
  const OWNER = process.env.OWNER_EMAIL;   // votre adresse de réception
  console.log('Clé présente ?', !!process.env.BREVO_API_KEY);
  console.log('Longueur de la clé :', (process.env.BREVO_API_KEY || '').length);
console.log('Sender présent ?', !!process.env.SENDER_EMAIL);
console.log('Owner présent ?', !!process.env.OWNER_EMAIL);

  // 4. Fonction d'envoi via l'API Brevo
  async function sendEmail(payload) {
    const r = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': API_KEY,
        'content-type': 'application/json',
        'accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!r.ok) throw new Error(await r.text());
    return r.json();
  }

  try {
    // EMAIL 1 — Notification pour VOUS
    await sendEmail({
      sender: { name: 'Portfolio', email: SENDER },
      to: [{ email: OWNER }],
      replyTo: { email, name }, // répondre = écrire directement au client
      subject: `Nouveau contact : ${name}`,
      htmlContent:
        `<h2>Nouveau message depuis votre portfolio</h2>` +
        `<p><b>Nom :</b> ${esc(name)}</p>` +
        `<p><b>Email :</b> ${esc(email)}</p>` +
        `<p><b>Message :</b><br>${esc(message).replace(/\n/g, '<br>')}</p>`,
    });

    // EMAIL 2 — Confirmation automatique pour le CLIENT intéressé
    await sendEmail({
      sender: { name: 'Goni Abakar', email: SENDER },
      to: [{ email, name }],
      subject: 'Merci pour votre message !',
      htmlContent:
        `<p>Bonjour ${esc(name)},</p>` +
        `<p>Merci de l'intérêt que vous portez à mon travail. ` +
        `J'ai bien reçu votre message et je reviens vers vous sous 48 h.</p>` +
        `<p>À très vite,<br>Goni Abakar</p>`,
    });

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Envoi impossible' });
  }
}