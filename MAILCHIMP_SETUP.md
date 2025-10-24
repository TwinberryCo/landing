# 📧 Setup Mailchimp per Newsletter Twinberry

## Passaggi per configurare Mailchimp:

### 1. Crea account Mailchimp
- Vai su: https://mailchimp.com
- Clicca su "Sign Up Free"
- Completa la registrazione (è gratuito fino a 500 contatti)

### 2. Crea una nuova Audience (lista contatti)
- Nel dashboard, vai su **Audience** → **All contacts**
- Clicca su **Create Audience** (o usa quella di default)
- Compila i dettagli richiesti:
  - Audience name: "Newsletter Twinberry"
  - Default From email: la tua email (es. info@twinberry.it)
  - Default From name: "Twinberry"

### 3. Ottieni il codice del form
- Vai su **Audience** → **Signup forms** → **Embedded forms**
- Nella sezione "Copy/paste onto your site", troverai del codice HTML
- Cerca la riga che inizia con `<form action="https://...`

### 4. Estrai i parametri necessari
Dal form HTML di Mailchimp, cerca questa riga:
```html
<form action="https://XXXXXXX.usXX.list-manage.com/subscribe/post?u=XXXXXXXXXX&amp;id=YYYYYYYYYY"
```

Devi copiare:
- **L'intero URL** dopo `action="`
- **USER_ID**: la parte dopo `u=` (es: `1abf75f6981256963a47d197a`)
- **LIST_ID**: la parte dopo `id=` (es: `37c6d8f4d6`)

### 5. Aggiorna il file index.html
Apri `index.html` e cerca la riga 936 circa, dove trovi:
```html
action="https://SOSTITUISCI_CON_TUO_URL_MAILCHIMP.list-manage.com/subscribe/post?u=USER_ID&amp;id=LIST_ID"
```

Sostituisci con il tuo URL completo di Mailchimp.

Esempio:
```html
action="https://twinberry.us21.list-manage.com/subscribe/post?u=1abf75f6981256963a47d197a&amp;id=37c6d8f4d6"
```

### 6. Aggiorna anche il campo honeypot
Cerca la riga con:
```html
<input type="text" name="b_USER_ID_LIST_ID" tabindex="-1" value="">
```

Sostituisci `USER_ID_LIST_ID` concatenando i tuoi ID (senza spazi):
```html
<input type="text" name="b_1abf75f6981256963a47d197a_37c6d8f4d6" tabindex="-1" value="">
```

### 7. Testa la newsletter
- Salva il file `index.html`
- Apri il sito nel browser
- Prova a iscriverti con una tua email
- Controlla nel dashboard Mailchimp se l'email è arrivata

### 8. Personalizza le email (opzionale)
- Vai su **Audience** → **Signup forms** → **Form builder**
- Personalizza il messaggio di conferma
- Personalizza l'email di benvenuto

## 🔧 Risoluzione problemi:

**Se il form non funziona:**
1. Controlla che l'URL sia corretto (con `&amp;` non `&`)
2. Verifica di aver sostituito tutti i placeholder
3. Apri la console del browser (F12) per vedere eventuali errori
4. Assicurati che il form sia impostato come "public" in Mailchimp

**Se non ricevi email di conferma:**
- Vai su Mailchimp: **Audience** → **Signup forms** → **Settings**
- Abilita "Enable double opt-in" se vuoi conferma email
- Oppure disabilita per iscrizioni immediate

## 📊 Monitoraggio
- Vai su **Audience** → **All contacts** per vedere i nuovi iscritti
- Vai su **Reports** per vedere le statistiche

---

**Nota:** Il piano gratuito di Mailchimp include:
- ✅ Fino a 500 contatti
- ✅ 1.000 email al mese
- ✅ Template email
- ✅ Form di iscrizione
- ✅ Statistiche base
