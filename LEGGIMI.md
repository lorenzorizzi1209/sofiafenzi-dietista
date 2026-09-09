# Sito Dietista — clone stilistico

Sito statico (HTML/CSS/JS) con **gli stessi testi, sezioni e box del sito di
Lorenzo**, ma con una **veste grafica premium bianco + verde scuro** e
un'ottimizzazione mobile più spinta. I contenuti verranno modificati in seguito.

## File

| File | Contenuto |
|------|-----------|
| `index.html` | Home: hero, chi sono, servizi, FAQ, contatti |
| `offerta.html` | Percorsi e costi: metodo, 5 fasi, visite singole, pacchetti, CTA |
| `cookie-policy.html` | Cookie policy (GDPR) |
| `style.css` | Stile: palette bianco/crema + verde scuro, font Cormorant Garamond + Inter |
| `script.js` | Menu mobile, accordion FAQ, animazioni, banner cookie + analytics |
| `images/` | Foto (vedi `images/LEGGIMI.txt`) |

## Cosa è stato cambiato rispetto all'originale

- **Solo grafica**: colori (bianco/verde scuro), tipografia (titoli serif),
  spaziature, bordi sottili al posto delle ombre marcate, logo testuale.
- I **testi sono identici** all'originale (compresi nome, recapiti, prezzi e link
  WhatsApp di Lorenzo): sono segnaposto da sostituire quando deciderai i contenuti
  della nuova dietista.
- **Analytics disattivati**: in `script.js` `GA_MEASUREMENT_ID` e
  `META_PIXEL_ID` sono vuoti (non sono stati copiati quelli di Lorenzo). Il sito
  e il banner cookie funzionano comunque; inserisci gli ID reali quando li hai.
- **Mobile**: breakpoint aggiuntivi a 980 / 880 / 600 / 380 px, hamburger 44px,
  hero e sezioni con padding ridotto, statistiche in riga, pulsanti full-width,
  timeline delle 5 fasi ricompattata, banner cookie a tutta larghezza.

## Foto

- `images/logo.jpg` → logo "SF" in navbar (link alla home).
- `images/foto-profilo.png` → ritratto Sofia Fenzi (sezione "Chi Sono"), PNG con
  sfondo trasparente su fondo verde scuro.

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
