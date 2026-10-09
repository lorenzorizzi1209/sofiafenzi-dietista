# Sito Dietista — Sofia Fenzi

Sito statico (HTML/CSS/JS) a **pagina unica**, in stile premium bianco + verde
scuro (font Cormorant Garamond + Inter), ottimizzato per mobile.

## File

| File | Contenuto |
|------|-----------|
| `index.html` | Tutto il sito: hero (foto + nome), Chi Sono, Servizi, Come Funziona, Cosa comprende, Costi e Pacchetti, fascia di prenotazione, FAQ, box "altre informazioni", Contatti |
| `offerta.html` | Solo reindirizzamento a `index.html#costi` (e `#faq`) per i vecchi link |
| `cookie-policy.html` | Cookie policy (GDPR) |
| `style.css` | Stile del sito |
| `script.js` | Menu mobile, accordion FAQ, animazioni, banner cookie + Google Analytics (si attiva solo dopo il consenso) |
| `images/` | Foto e logo (vedi `images/LEGGIMI.txt`) |

## Note

- Menu a ancore: Home, Chi Sono, Servizi, Come Funziona, FAQ, Contatti e il pulsante
  "Percorsi e Costi" (`#costi`).
- Analytics: `GA_MEASUREMENT_ID` in `script.js`. L'evento `view_offer_page` parte
  una sola volta quando il visitatore arriva alla sezione Costi.
- Prestazioni: foto e logo in WebP leggero, navbar senza `backdrop-filter`.

## Foto

- `images/logo-sm.webp` → logo "SF" in navbar (originale: `images/logo.jpg`).
- `images/foto-profilo.webp` → ritratto nella hero (originale: `images/foto-profilo.png`,
  PNG con sfondo trasparente). Se cambi la foto, rigenera il WebP con lo stesso nome.

## Pubblicazione

Online su **GitHub Pages**.

- Repo: `github.com/lorenzorizzi1209/sofiafenzi-dietista` (branch `main`, root)
- Dominio: `sofiafenzidietista.it` (file `CNAME`)
- Per pubblicare aggiornamenti: `git add -A && git commit -m "..." && git push`

### DNS da configurare su Aruba (dominio nudo `sofiafenzidietista.it`)

Record A per `@` (sostituire quelli esistenti di Aruba):

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Record AAAA per `@` (IPv6, opzionali):

```
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

Record CNAME per `www` → `lorenzorizzi1209.github.io`

Dopo la propagazione DNS, GitHub emette il certificato HTTPS in automatico; poi
attivare "Enforce HTTPS" in Settings → Pages.

## Anteprima locale

```bash
cd "C:/Users/loren/OneDrive/Desktop/sito-dietista" && python -m http.server 8000
```
