# Property Intelligence Web Application

A web application for New York City real estate research, providing parcel records, valuation history, tax assessments, DOB permits, 311 complaints, zoning, ACRIS title documents, and development calculations.

---

## 🏗 Architecture & System Design

```
                    USER
                     |
                     v
                SEARCH BAR
                     |
                     v
          NYC GeoSearch Autocomplete
                     |
                     v
             Address Suggestions
                     |
                     v
             User Selects Address
                     |
                     v
          Official Property Resolution
                     |
                     v
                BBL + BIN
                     |
              +------+------+
              |             |
              v             v
        Property Page    Save Property
              |             |
              v             v
       NYC Public APIs     MySQL
              |          (only reference)
              v
       Dynamic Property UI
```

---

## ⚡ Key Technical Features

### 1. Lightweight NYC GeoSearch Autocomplete
- Frontend calls backend proxy: `GET /api/properties/autocomplete?q={query}`
- Backend queries NYC Planning GeoSearch API (`https://geosearch.planninglabs.nyc/v2/autocomplete?text={query}`).
- Implements:
  - 2-3 minimum character threshold
  - 250-350ms debounce
  - Keyboard navigation (Arrow Up, Arrow Down, Enter, Escape)
  - Stale request cancellation protection
  - Max 8-10 lightweight suggestions
  - **Zero heavy dataset fetching (PLUTO, DOB, 311, ACRIS) during typing.**

### 2. Official BBL + BIN Identity Resolution
- Selection of an autocomplete suggestion or address text triggers identity resolution (`POST /api/properties/resolve`).
- Obtains authoritative **BBL** (tax-lot ID) and **BIN** (building ID) confirmed against official NYC sources.
- Property dashboard opens in a **new browser tab**: `/property/:bbl/overview`.

### 3. Strict Authenticated User Isolation
- Every saved property belongs to **exactly one authenticated user**.
- MySQL stores **ONLY** application-owned `User` and `SavedProperty` references (`id`, `userId`, `bbl`, `bin`, `address`, `createdAt`, `updatedAt`).
- All `SavedProperty` database queries strictly filter by `userId = req.user.id` derived from JWT authentication middleware.
- Server rejects cross-user access, modification, or deletion attempts with `403 Forbidden` / `404 Not Found`.

### 4. Dynamic NYC Open Data Integration (Zero MySQL NYC Data Storage)
- **NYC property data is NEVER stored in MySQL.**
- Property details are dynamically requested from NYC Socrata Open Data endpoints on page request using canonical BBL / BIN identifiers:
  - **PLUTO**: `64uk-42ks`
  - **Assessment**: `8y4t-faws`
  - **Tax Rate**: `7zb8-7bpk`
  - **DOB Permits**: `ic3t-wcy2`
  - **DOB Filing**: `w9ak-ipjd`
  - **311 Complaints**: `erm2-nwe9`
  - **Zoning**: `fdkv-4t4z`
  - **E-Designation**: `hxm3-23vy`
  - **ACRIS Legals**: `8h5j-fqxa`
  - **ACRIS Master**: `bnx9-e6tj`
  - **ACRIS Parties**: `636b-3b5g`

---

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, React Router DOM v6
- **Backend**: Node.js, Express, Prisma ORM, MySQL (XAMPP / Local MySQL), JWT Authentication, Zod Validation

---

## 🔑 Environment Configuration

Create `.env` inside `backend/`:

```env
# Database Connection String (MySQL via XAMPP)
DATABASE_URL="mysql://root:@localhost:3306/property_shark"

# JWT Secret
JWT_SECRET="your_jwt_secret_key_here"

# Server Port
PORT=5000

# Frontend URL
FRONTEND_URL="http://localhost:5173"

# NYC GeoSearch API
NYC_GEOSEARCH_BASE_URL="https://geosearch.planninglabs.nyc/v2"

# NYC Open Data Dataset IDs
NYC_OPEN_DATA_BASE_URL="https://data.cityofnewyork.us"
NYC_PLUTO_DATASET="64uk-42ks"
NYC_ASSESSMENT_DATASET="8y4t-faws"
NYC_TAX_RATE_DATASET="7zb8-7bpk"
NYC_PERMITS_DATASET="ic3t-wcy2"
NYC_DOB_FILING_DATASET="w9ak-ipjd"
NYC_311_DATASET="erm2-nwe9"
NYC_ZONING_DATASET="fdkv-4t4z"
NYC_E_DESIGNATION_DATASET="hxm3-23vy"
NYC_ACRIS_LEGALS_DATASET="8h5j-fqxa"
NYC_ACRIS_MASTER_DATASET="bnx9-e6tj"
NYC_ACRIS_PARTIES_DATASET="636b-3b5g"
```

---

## 🚀 Setup & Execution

### 1. Database & Prisma Setup
Ensure MySQL / XAMPP control panel is running, then run:

```bash
cd backend
npm install
npx prisma db push
```

### 2. Start Backend Server
```bash
cd backend
npm run dev
```

### 3. Start Frontend Development Server
```bash
cd Frontend
npm install
npm run dev
```

---

## 📡 Key API Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/properties/autocomplete?q={query}` | Fetch NYC GeoSearch lightweight autocomplete suggestions | No |
| `POST` | `/api/properties/resolve` | Resolve address/text to confirmed BBL + BIN identity | No |
| `GET` | `/api/properties/search?q={query}` | Search properties via PLUTO/fallback | No |
| `GET` | `/api/properties/:bbl` | Dynamically fetch aggregated NYC property datasets | No |
| `GET` | `/api/saved-properties` | Retrieve authenticated user's saved properties | Yes |
| `POST` | `/api/saved-properties` | Save property pointer (`bbl`, `bin`, `address`) for user | Yes |
| `GET` | `/api/saved-properties/:id` | Get specific saved property (user isolated) | Yes |
| `DELETE` | `/api/saved-properties/:id` | Delete saved property (user isolated) | Yes |
| `POST` | `/api/auth/signup` | Create user account | No |
| `POST` | `/api/auth/login` | Authenticate user & issue JWT | No |
| `GET` | `/api/auth/me` | Return current authenticated user profile | Yes |
| `POST` | `/api/auth/logout` | Clear authentication session | Yes |

---

## 🧪 Verification Test Property

For testing resolution and parcel data:
- **BBL**: `4004580098`
- **BIN**: `4005279`
- **Public Record Address**: `42-12 13 STREET` (Search address: `42-07 12th St, Long Island City, NY 11101`)
