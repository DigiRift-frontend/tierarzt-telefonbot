# Security Audit — Vollstaendige Sicherheitspruefung

> **Aufruf:** Lies diese Datei und fuehre jeden Abschnitt der Reihe nach aus. Pruefe ALLE genannten Projekte. Dokumentiere jeden Fund mit Schweregrad (KRITISCH / HOCH / MITTEL / NIEDRIG).

---

## Zu pruefende Projekte

| Projekt | Pfad | Typ |
|---------|------|-----|
| tierarzt-telefonbot | `/Users/hydra-01/Documents/DigiWorkspace/tierarzt-telefonbot/` | Next.js Frontend |
| digimedia-main | `/Users/hydra-01/Documents/DigiWorkspace/digimedia-main/` | Express.js API Backend |
| digiletter | `/Users/hydra-01/Documents/DigiWorkspace/digiletter/` | Next.js Newsletter Service |

---

## 1. Secrets im Frontend & Git-History

**Ziel:** Keine API-Keys, Tokens, Passwoerter im Client-Code oder in der Git-History.

### Pruefschritte:
1. Durchsuche ALLE Dateien (nicht nur src/) nach hartkodierten Secrets:
   ```
   grep -r "sk_\|api[_-]key\|apikey\|secret\|password\|bearer\|token" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.json" --include="*.env*" --include="*.md"
   ```
2. Pruefe ob `.env`-Dateien in `.gitignore` stehen
3. Pruefe ob `.env`-Dateien NICHT im Git-Repo committed sind:
   ```
   git log --all --diff-filter=A -- "*.env" "*.env.*"
   ```
4. Pruefe CLAUDE.md und alle Markdown-Dateien auf API-Keys oder Tokens
5. Pruefe `package.json` Scripts auf eingebettete Secrets
6. Pruefe ob `NEXT_PUBLIC_*` Environment-Variablen sensitive Daten enthalten (diese landen im Client-Bundle!)

### Kritische Patterns:
- Hardcoded API-Keys in Source-Code → **KRITISCH**
- `.env` Dateien im Git-Repo → **KRITISCH**
- API-Keys in CLAUDE.md/Dokumentation → **HOCH** (wenn Repo public)
- `NEXT_PUBLIC_` mit sensitiven Daten → **KRITISCH**

---

## 2. SQL Injection

**Ziel:** Kein User-Input wird unescaped in SQL-Queries verwendet.

### Pruefschritte:
1. Finde alle Datenbankzugriffe:
   - digimedia: SQLite via `better-sqlite3` — suche nach `db.prepare()`, `db.exec()`, String-Concatenation in Queries
   - digiletter: PostgreSQL via Prisma — Prisma ist standardmaessig sicher, aber pruefe `$queryRaw`, `$executeRaw`
2. Pruefe JEDEN API-Endpoint der User-Input annimmt:
   - Werden Query-Parameter direkt in SQL eingebettet?
   - Werden Prepared Statements / Parameterized Queries verwendet?
3. Suche nach gefaehrlichen Patterns:
   ```
   grep -rn "db.exec\|db.run\|\$queryRaw\|\$executeRaw\|\.query(" --include="*.ts" --include="*.js"
   ```
4. Pruefe ob `req.params`, `req.query`, `req.body` Werte direkt in String-Templates landen

### Kritische Patterns:
- `db.exec("SELECT * FROM x WHERE id = " + userInput)` → **KRITISCH**
- `$queryRaw` mit Template-Literals ohne Prisma.sql → **KRITISCH**
- Fehlende Input-Validierung auf API-Endpoints → **HOCH**

---

## 3. XSS (Cross-Site Scripting)

**Ziel:** Kein User-generierter Content wird unescaped gerendert.

### Pruefschritte:
1. Suche nach `dangerouslySetInnerHTML` in allen React-Komponenten:
   ```
   grep -rn "dangerouslySetInnerHTML" --include="*.tsx" --include="*.jsx"
   ```
2. Fuer JEDE Fundstelle pruefen:
   - Kommt der HTML-Content vom User oder von einer vertrauenswuerdigen API?
   - Wird der Content sanitized (DOMPurify, sanitize-html)?
   - Kann ein Angreifer ueber die API schadhaften HTML einschleusen?
3. Pruefe Formulare: Werden User-Eingaben vor dem Rendern escaped?
4. Pruefe URL-Parameter: Werden sie direkt in die Seite eingebettet?
5. Pruefe Blog-Content: Kommt HTML aus einer externen API? Wird es sanitized?

### Kritische Patterns:
- `dangerouslySetInnerHTML={{ __html: userInput }}` → **KRITISCH**
- URL-Parameter direkt in JSX → **HOCH**
- API-Content ohne Sanitization → **MITTEL** (wenn API vertrauenswuerdig)

---

## 4. CSRF (Cross-Site Request Forgery)

**Ziel:** Alle state-aendernden Requests sind gegen CSRF geschuetzt.

### Pruefschritte:
1. Liste alle POST/PUT/PATCH/DELETE API-Routes auf
2. Pruefe ob CSRF-Tokens verwendet werden
3. Pruefe ob `SameSite`-Cookie-Attribute gesetzt sind
4. Pruefe ob API-Routes nur `application/json` akzeptieren (schuetzt teilweise gegen CSRF)
5. Pruefe ob sensible Aktionen (Login, Passwort-Aenderung, Daten-Loeschung) zusaetzlich geschuetzt sind

### Kritische Patterns:
- POST-Endpoints ohne jeglichen CSRF-Schutz → **HOCH**
- Cookie-basierte Auth ohne SameSite → **HOCH**
- Formulare die Aktionen ausloesen ohne Token → **MITTEL**

---

## 5. Authentifizierung & API-Keys

**Ziel:** Alle API-Endpoints sind korrekt abgesichert.

### Pruefschritte:
1. Liste ALLE API-Routes auf und klassifiziere:
   - Oeffentlich (kein Auth noetig)
   - Authentifiziert (Bearer Token / API-Key / Session)
   - Admin-only
2. Pruefe ob Auth-Middleware auf ALLEN geschuetzten Routes aktiv ist
3. Pruefe API-Key-Validierung:
   - Werden Keys gehasht gespeichert oder im Klartext?
   - Gibt es Key-Rotation?
   - Haben Keys Ablaufdaten?
4. Pruefe Rate-Limiting:
   - Gibt es Rate-Limits auf allen oeffentlichen Endpoints?
   - Sind die Limits angemessen (nicht zu hoch)?
   - Login-Endpoint: Max 5-10 Versuche pro Minute?
5. Pruefe ob API-Keys in Response-Bodies oder Logs geleakt werden

### Kritische Patterns:
- API-Route ohne Auth die Daten aendert → **KRITISCH**
- API-Keys im Klartext in der DB → **HOCH**
- Kein Rate-Limiting auf Login → **HOCH**
- API-Keys in Logs/Responses → **HOCH**

---

## 6. HTTP Security Headers

**Ziel:** Alle Security-Header sind korrekt gesetzt.

### Pruefschritte:
1. Teste die Live-Website mit curl:
   ```bash
   curl -sI https://tierarzt-telefonbot.de | grep -iE "strict-transport|x-frame|x-content-type|content-security|permissions-policy|referrer-policy|x-xss"
   ```
2. Pruefe `next.config.ts` / Express-Middleware fuer Security-Header
3. Erwartete Header:
   - `Strict-Transport-Security: max-age=31536000; includeSubDomains` → HTTPS erzwingen
   - `X-Frame-Options: DENY` oder `SAMEORIGIN` → Clickjacking-Schutz
   - `X-Content-Type-Options: nosniff` → MIME-Sniffing verhindern
   - `Content-Security-Policy` → Script/Style-Quellen einschraenken
   - `Referrer-Policy: strict-origin-when-cross-origin` → Referrer einschraenken
   - `Permissions-Policy` → Kamera, Mikrofon, Geolocation blockieren
4. Teste auch die API-Endpoints (digimedia, digiletter)

### Kritische Patterns:
- Kein HSTS → **HOCH**
- Kein X-Frame-Options → **MITTEL**
- Keine CSP → **MITTEL**
- Fehlende Header auf API-Servern → **MITTEL**

---

## 7. Dependency Audit

**Ziel:** Keine bekannten Sicherheitsluecken in Abhaengigkeiten.

### Pruefschritte:
1. Fuehre in JEDEM Projekt aus:
   ```bash
   npm audit
   ```
2. Pruefe auf kritische/hohe Vulnerabilities
3. Pruefe ob `package-lock.json` aktuell ist
4. Pruefe ob veraltete Packages mit bekannten CVEs verwendet werden:
   ```bash
   npx npm-check-updates
   ```
5. Besondere Aufmerksamkeit auf:
   - `jsonwebtoken` — bekannte Vulnerabilities?
   - `nodemailer` — aktuelle Version?
   - `next` — Security-Patches?
   - `prisma` — aktuelle Version?
   - `better-sqlite3` — aktuelle Version?

### Kritische Patterns:
- Kritische CVEs in direkten Dependencies → **KRITISCH**
- Hohe CVEs ohne Patch verfuegbar → **HOCH**
- Veraltete Packages (>1 Jahr alt) → **MITTEL**

---

## 8. Environment & Configuration

**Ziel:** Keine Secrets im Repo, sichere Konfiguration.

### Pruefschritte:
1. Pruefe `.gitignore` in jedem Projekt:
   - `.env`, `.env.local`, `.env.production` muessen ignoriert werden
   - `database.db`, `*.sqlite` muessen ignoriert werden
   - `node_modules/` muss ignoriert werden
2. Pruefe ob Debug-Mode in Produktion deaktiviert ist
3. Pruefe ob Source-Maps in Produktion deaktiviert sind
4. Pruefe ob Error-Details an den Client geleakt werden:
   ```
   grep -rn "stack\|stackTrace\|err.message" --include="*.ts" --include="*.js"
   ```
5. Pruefe ob Datenbank-URLs, SMTP-Credentials etc. nur in `.env` stehen
6. Pruefe ob `NODE_ENV=production` in Produktion gesetzt ist

### Kritische Patterns:
- `.env` committed im Repo → **KRITISCH**
- Debug-Mode in Produktion → **HOCH**
- Stack-Traces an Client → **MITTEL**
- Source-Maps in Produktion → **NIEDRIG**

---

## 9. CORS (Cross-Origin Resource Sharing)

**Ziel:** CORS nur fuer vertrauenswuerdige Origins erlauben.

### Pruefschritte:
1. Suche nach CORS-Konfiguration:
   ```
   grep -rn "cors\|Access-Control\|origin" --include="*.ts" --include="*.js"
   ```
2. Pruefe ob `Access-Control-Allow-Origin: *` gesetzt ist (zu offen!)
3. Pruefe ob Credentials mit offenen Origins erlaubt sind
4. Pruefe ob CORS nur fuer noetige Endpoints aktiviert ist
5. Pruefe Next.js API-Routes: Haben sie CORS-Header?

### Kritische Patterns:
- `Access-Control-Allow-Origin: *` mit Credentials → **KRITISCH**
- `Access-Control-Allow-Origin: *` ohne Credentials → **MITTEL**
- Fehlende CORS-Konfiguration (Browser blockiert) → **NIEDRIG** (eher funktional)

---

## 10. File Upload & Path Traversal

**Ziel:** Uploads sind validiert, kein Path Traversal moeglich.

### Pruefschritte:
1. Finde alle File-Upload-Endpoints:
   ```
   grep -rn "multer\|formData\|upload\|file\|multipart" --include="*.ts" --include="*.js"
   ```
2. Pruefe fuer jeden Upload-Endpoint:
   - Wird der Dateityp validiert (MIME-Type UND Extension)?
   - Gibt es eine Groessenbeschraenkung?
   - Wird der Dateiname sanitized?
   - Werden Dateien ausserhalb des Web-Roots gespeichert?
3. Pruefe ob Path-Traversal moeglich ist:
   - Werden Dateinamen aus User-Input in Dateipfade eingebaut?
   - `../../../etc/passwd` Pattern testen
4. Pruefe ob hochgeladene Dateien mit einem neuen Namen gespeichert werden (nicht User-Filename)

### Kritische Patterns:
- Kein MIME-Type-Check → **HOCH**
- User-Filename direkt im Pfad → **HOCH**
- Keine Groessenbeschraenkung → **MITTEL**
- Dateien im Web-Root → **MITTEL**

---

## 11. JWT Security

**Ziel:** JWT-Implementierung ist sicher.

### Pruefschritte:
1. Finde alle JWT-Verwendungen:
   ```
   grep -rn "jwt.sign\|jwt.verify\|jsonwebtoken\|jose" --include="*.ts" --include="*.js"
   ```
2. Pruefe fuer jeden JWT:
   - **Secret-Staerke:** Min. 32 Zeichen, zufaellig generiert? Oder Fallback auf schwachen Default?
   - **Algorithmus:** HS256 ist OK, aber nicht `none`!
   - **Expiry:** Ist `expiresIn` gesetzt? Nicht zu lang (max 7 Tage fuer Tokens)?
   - **Payload:** Werden sensitive Daten (Passwoerter, API-Keys) im JWT gespeichert?
3. Pruefe ob JWT-Secrets in Environment-Variablen stehen (nicht hardcoded)
4. Pruefe ob `jwt.verify()` IMMER aufgerufen wird bevor JWT-Daten verwendet werden
5. Pruefe ob abgelaufene/manipulierte Tokens korrekt abgelehnt werden

### Kritische Patterns:
- Hardcoded JWT-Secret → **KRITISCH**
- `algorithm: "none"` erlaubt → **KRITISCH**
- Kein `expiresIn` → **HOCH**
- Sensitive Daten im JWT-Payload → **HOCH**
- Schwacher Default-Secret als Fallback → **MITTEL**

---

## 12. Deployment & Infrastruktur

**Ziel:** Produktionsumgebung ist sicher konfiguriert.

### Pruefschritte:
1. Pruefe HTTPS:
   ```bash
   curl -sI http://tierarzt-telefonbot.de  # Sollte 301 zu HTTPS redirecten
   curl -sI https://tierarzt-telefonbot.de  # Sollte gueltiges SSL-Cert haben
   ```
2. Pruefe SSL-Zertifikat:
   ```bash
   echo | openssl s_client -connect tierarzt-telefonbot.de:443 2>/dev/null | openssl x509 -noout -dates -issuer
   ```
3. Pruefe ob Debug-Endpoints erreichbar sind:
   ```bash
   curl -s https://tierarzt-telefonbot.de/_next/data/ -o /dev/null -w "%{http_code}"
   curl -s https://tierarzt-telefonbot.de/api/ -o /dev/null -w "%{http_code}"
   ```
4. Pruefe ob Coolify-Admin-Panel abgesichert ist (nicht oeffentlich ohne Auth)
5. Pruefe ob Datenbank-Ports von aussen erreichbar sind
6. Pruefe ob `robots.txt` sensible Pfade blockiert
7. Pruefe ob Error-Pages keine sensitiven Infos leaken (404, 500)

### Kritische Patterns:
- Kein HTTPS-Redirect → **KRITISCH**
- Abgelaufenes/selbstsigniertes SSL-Cert → **KRITISCH**
- Datenbank von aussen erreichbar → **KRITISCH**
- Admin-Panel ohne Auth → **KRITISCH**
- Debug-Endpoints in Produktion → **HOCH**

---

## 13. Input Validation

**Ziel:** Alle User-Inputs werden validiert bevor sie verarbeitet werden.

### Pruefschritte:
1. Finde alle API-Endpoints die User-Input akzeptieren
2. Pruefe ob Zod/Joi/andere Validierung verwendet wird
3. Pruefe ob Email-Validierung korrekt ist (nicht nur `includes("@")`)
4. Pruefe ob numerische Inputs auf Range geprueft werden
5. Pruefe ob String-Laengen limitiert sind (DoS durch riesige Payloads)
6. Pruefe ob Array-Laengen limitiert sind
7. Pruefe ob unerwartete Felder ignoriert/abgelehnt werden

### Kritische Patterns:
- Keine Validierung auf POST-Endpoints → **HOCH**
- Nur Client-seitige Validierung → **HOCH**
- Keine Payload-Groessenbeschraenkung → **MITTEL**

---

## Output-Format

Erstelle einen Bericht mit folgendem Format:

```
# Security Audit Report — [Datum]

## Zusammenfassung
- Kritische Funde: X
- Hohe Funde: X
- Mittlere Funde: X
- Niedrige Funde: X

## Kritische Funde (sofort beheben!)
### [KRITISCH-001] Titel
- **Projekt:** tierarzt-telefonbot / digimedia / digiletter
- **Datei:** path/to/file.ts:line
- **Beschreibung:** Was ist das Problem?
- **Risiko:** Was kann ein Angreifer damit tun?
- **Fix:** Wie behebt man es?

## Hohe Funde
### [HOCH-001] Titel
...

## Mittlere Funde
...

## Niedrige Funde
...

## Empfehlungen
1. Priorisierte Liste der naechsten Schritte
```
