# Parcel Flow

Parcel Flow is a responsive parcel delivery job management frontend built for the Frontend Take-Home Assignment.

The application allows users to view, search, filter, create, edit, and update delivery jobs. It also includes persistent light/dark mode support and Singapore address search with map preview using an external location API.

## Features

- View existing delivery jobs in a data table
- Search for a specific delivery job
- Filter jobs by status and other available criteria
- Add a new delivery job with form validation
- Edit an existing delivery job
- Update the status of one or multiple selected jobs
- Search for valid Singapore addresses
- Auto-populate address details, postal code, and coordinates from the selected address
- Display the selected delivery location on a map
- Switch between light and dark mode
- Persist the selected theme using `localStorage`
- Responsive desktop and mobile layouts
- How-to-use page with a visual overview of the key user flows

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- Material UI (MUI)
- MUI X Data Grid
- Geoapify
- Browser `localStorage`

No database is used. The initial application data is stored in static JSON files and loaded into memory.

## Project Structure

The application follows a feature-oriented React structure. Business-specific code is grouped by feature, while shared application concerns such as layouts, routing, themes, hooks, and domain types are kept separately.

```text
src/
├── assets/
│   └── keyUserFlow.png
│
├── data/
│   ├── jobs.json
│   └── senderCompanies.json
│
├── features/
│   ├── address/
│   │   ├── components/
│   │   │   └── AddressMap.tsx
│   │   └── services/
│   │       └── addressService.ts
│   │
│   └── jobs/
│       ├── components/
│       │   ├── AddJobDialog.tsx
│       │   ├── EditJobDialog.tsx
│       │   ├── JobForm.tsx
│       │   ├── JobList.tsx
│       │   ├── JobsFilterBar.tsx
│       │   ├── JobStatusChip.tsx
│       │   ├── JobsToolbar.tsx
│       │   └── UpdateStatusDialog.tsx
│       ├── constants/
│       │   └── jobOptions.ts
│       └── types.ts
│
├── hooks/
│   └── usePageTitle.ts
│
├── layouts/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── MobileSidebar.tsx
│   │   ├── Sidebar.tsx
│   │   └── SidebarContent.tsx
│   └── MainLayout.tsx
│
├── pages/
│   ├── MainPage.tsx
│   ├── HowToUsePage.tsx
│   └── NotFound.tsx
│
├── routes/
│   └── AppRouter.tsx
│
├── theme/
│   ├── AppThemeProvider.tsx
│   ├── ColorModeContext.ts
│   └── theme.ts
│
├── types/
│   ├── Address.ts
│   ├── Job.ts
│   └── SenderCompany.ts
│
└── main.tsx
```

## Architecture Notes

### Feature-oriented organisation

Business functionality is grouped under `features/`.

For example, the `jobs` feature contains the job table, filters, toolbar, form, dialogs, feature-specific constants, and feature-specific types.

The `address` feature is separated because it integrates with an external location service.

### Layouts

`MainLayout.tsx` provides the common application shell.

The supporting navigation components are grouped under `layouts/components/`:

- `Header.tsx`
- `Sidebar.tsx`
- `MobileSidebar.tsx`
- `SidebarContent.tsx`

`SidebarContent` is shared between the desktop sidebar and mobile drawer so navigation items and styling have a single source of truth.

### Pages and routing

Route-level screens are stored under `pages/`, while the route configuration is centralised in `routes/AppRouter.tsx`.

React Router's `Outlet` is used by `MainLayout` so routed pages share the same header and navigation shell.

### Jobs feature

The main jobs feature is split into focused reusable components:

- `JobList` — displays delivery jobs using MUI Data Grid
- `JobsToolbar` — search and primary actions
- `JobsFilterBar` — filtering controls
- `JobForm` — shared form used for both Add and Edit flows
- `AddJobDialog` — creates a new delivery job
- `EditJobDialog` — edits an existing delivery job
- `UpdateStatusDialog` — updates the status of one or multiple selected jobs
- `JobStatusChip` — provides a consistent visual representation of job status

The same `JobForm` is reused for both creating and editing jobs to avoid duplicated form logic.

### Address feature

Address functionality is separated into UI and external service responsibilities:

```text
Job Form
   ↓
addressService
   ↓
Geoapify API
   ↓
Address suggestion selected
   ↓
Address / postal code / coordinates populated
   ↓
AddressMap
```

`addressService.ts` handles communication with Geoapify, while `AddressMap.tsx` is responsible only for displaying the selected location.

### Static data

The assignment specifies that a database should not be used.

Initial job and sender-company records are therefore stored in:

```text
src/data/jobs.json
src/data/senderCompanies.json
```

The data is loaded into application memory and subsequently managed using React state.

### TypeScript models

Shared domain models are stored under `src/types/`, including:

- `Job`
- `Address`
- `SenderCompany`

Feature-specific types, such as job form input or filter state, remain inside `features/jobs/types.ts`.

### Theme

The theme layer is separated into:

- `theme.ts` — MUI palette and component theme configuration
- `AppThemeProvider.tsx` — application-level theme provider and mode state
- `ColorModeContext.ts` — exposes the colour mode toggle

The selected light/dark mode is stored in `localStorage`, allowing the preference to persist after closing and reopening the browser.

## Address Search

The Buyer Address field uses Geoapify to search for valid Singapore addresses.

The search flow is:

```text
User enters an address
        ↓
Clicks Search or presses Enter
        ↓
Geoapify API is queried
        ↓
Matching Singapore addresses are displayed
        ↓
User selects an address
        ↓
Address, postal code and coordinates are populated
        ↓
Map preview displays the selected delivery location
```

## Responsive Design

The application uses MUI breakpoints to support different screen sizes.

### Desktop

- Persistent sidebar
- Wider table and form layout

### Mobile

- Hamburger menu
- Sidebar becomes a temporary navigation drawer
- Forms adapt to a single-column layout
- Content spacing adjusts for smaller viewports

The responsive layout can be tested by resizing the browser window.

## Assignment Requirements

| Requirement | Implementation |
| --- | --- |
| Display JSON data in a table | Delivery jobs are loaded from `jobs.json` and displayed using MUI Data Grid |
| Add Item button opens a form | `Add Delivery Job` opens the reusable job form |
| Form validation | Required fields, address, postal code, contact number, sender company, and delivery date are validated |
| Submitted data appears in table | New jobs are added to React state and immediately displayed |
| Persistent light/dark mode | Theme preference is stored in `localStorage` |
| Bonus: external API | Geoapify is used for Singapore address search and map location |
| Bonus: deployment | Application can be deployed to a free frontend hosting service |

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/agqy98/mha-app.git
cd mha-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the Geoapify API key

Create a `.env` file in the project root:

```env
VITE_GEOAPIFY_API_KEY=your_geoapify_api_key
```

The `.env` file should not be committed to Git.

### 4. Start the development server

```bash
npm run dev
```

### 5. Build the application

```bash
npm run build
```

## Repository

GitHub:

https://github.com/agqy98/mha-app

## Development Process

A more detailed implementation sequence and development rationale can be documented separately in `DEVELOPMENT_PROCESS.md`.
