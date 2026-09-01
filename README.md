# Development Process

This document describes the implementation approach and development sequence used for the Frontend Take Home Assignment.

## 1. Created the React application with Vite

I started by creating a React + TypeScript application using Vite.

Vite was selected because it provides a lightweight development environment, a fast development server, and a simple project structure suitable for this frontend assignment.

```bash
npm create vite@latest
```

---

## 2. Installed the required frontend libraries

I installed the main libraries required for the application, including React Router for navigation and Material UI (MUI) for the user interface.

The main technologies used are:

- React
- TypeScript
- Vite
- React Router
- Material UI

MUI was selected to provide consistent and accessible UI components such as tables, dialogs, form fields, buttons, autocomplete fields, and responsive layouts.

---

## 3. Defined the application routes

I created an `AppRouter.tsx` file to keep the application's routing configuration in one location.

The initial pages/routes were planned before implementing the individual screens:

```text
/               Delivery Jobs
/jobs           Delivery Jobs
/jobs/:jobId    Job Details
```

This separates navigation concerns from the individual page components and makes it easier to extend the application later.

---

## 4. Created the common application layout

I created a reusable `MainLayout` containing the application's common navigation components:

```text
MainLayout
├── Header
├── Sidebar
└── Page Content
```

React Router's `Outlet` is used inside the layout so that different pages can share the same application shell.

The header also displays an adaptive page title based on the currently selected route.

---

## 5. Implemented light and dark themes with persistent user preference

I created a central MUI theme configuration supporting both light and dark modes.

The theme is managed at the application level so that all components, including the header, sidebar, forms, tables, and dialogs, respond consistently to the selected theme.

The user's selected theme is saved using `localStorage`.

```text
User selects Dark Mode
        ↓
Theme state is updated
        ↓
Preference saved to localStorage
        ↓
Browser is closed
        ↓
Application is opened again
        ↓
Saved theme preference is restored
```

This was implemented specifically to fulfil **Requirement 5**:

> On the same page, have a button that can switch the table in (1) from light mode to dark mode and vice versa. Ensure that the mode is cached, i.e. the dark mode stays the same after closing the browser and re-launching the application again.

---

## 6. Implemented responsive desktop and mobile layouts

I implemented responsive behaviour using MUI breakpoints so that the application remains usable when the browser is resized or accessed from a mobile device.

On desktop, the application uses a persistent sidebar and wider content layout.

On mobile, the sidebar changes into a navigation drawer opened through a hamburger button in the header.

Form layouts also adapt from multiple columns on larger screens to a single-column layout on smaller screens.

The same React application therefore supports:

- Mobile
- Tablet
- Laptop
- Desktop

---

## 7. Prepared the application's mock data and TypeScript models

As the assignment specifies that a database should not be used, I created static JSON files that are loaded into memory when the application starts.

The main mock datasets include:

```text
jobs.json
senderCompanies.json
```

I also created TypeScript interfaces and reusable constants for data such as:

- Job
- Address
- Sender Company
- Job Status
- Parcel Type
- Parcel Size
- Delivery Options

AI was used to assist with generating realistic initial dummy data. The generated data was then reviewed and adjusted to fit the application's data model and Singapore parcel-delivery use case.

---

## 8. Implemented the Delivery Jobs page

I then developed the main Delivery Jobs page.

The initial JSON job records are loaded into React state and displayed in a table.

This fulfils **Requirement 1**:

> On a page, display JSON data in a table.

The page also contains an **Add Delivery Job** button that opens a form for creating a new delivery job.

This fulfils **Requirement 2**:

> On the same page, create an 'Add Item' button that opens a form to allow users to enter data.

The table displays information such as:

```text
Job ID
Buyer
Buyer Address
Sender Company
Parcel Type
Status
Delivery Date
Actions
```

---

## 9. Implemented the Add Delivery Job form and validation

I created the Add Delivery Job form as a reusable component displayed inside a dialog.

The form contains fields such as:

```text
Buyer Name
Buyer Address
Unit Number
Contact Number
Sender Company
Parcel Type
Parcel Size
Delivery Date
Notes
```

Sender companies are populated from the hardcoded sender company data rather than entered manually by the user.

Validation was added to the relevant form fields to prevent incomplete or invalid submissions.

This fulfils **Requirement 3**:

> Ensure the form fields have validation.

After the form passes validation and is submitted, a new delivery job object is created and added to the existing React state.

The table immediately displays the newly created job without requiring a database or page reload.

This fulfils **Requirement 4**:

> Upon submitting, the data in the form should be added to the table in (1).

---

## 10. Implemented the Job Details page

I created a Job Details page which can be accessed by selecting an individual delivery job.

This page was added beyond the minimum assignment requirements to demonstrate routing, reusable components, and presentation of more detailed information.

The page displays information including:

- Buyer Information
- Sender Company
- Parcel Information
- Delivery Information
- Address
- Map Location
- Notes

---

## 11. Integrated Singapore address autocomplete and map functionality

For the bonus requirement, I added an external location service for Singapore addresses.

Instead of requiring users to manually type an arbitrary address, the Buyer Address field provides address suggestions as the user types.

The flow is:

```text
User types an address
        ↓
Address API is queried
        ↓
Matching Singapore addresses are returned
        ↓
User selects an address
        ↓
Address information and coordinates are stored
        ↓
Map updates to show the selected location
```

The selected address is also displayed with a map pin to provide visual confirmation of the delivery location.

The external API logic is separated from the UI component through an address service layer to keep the implementation modular.

This was implemented for the **Bonus Requirement**:

> Make use of any external API to add new functionalities. For example, making use of a locations API to add a valid address.

---

## 12. Performed final testing and UI fine-tuning

After completing the main functionality, I performed a final review of the application.

This included testing:

- JSON data loading
- Job creation
- Form validation
- Table updates
- Address autocomplete
- Map location updates
- Route navigation
- Light/dark theme switching
- Theme persistence after browser restart
- Mobile responsiveness
- Different browser widths
- Empty and invalid form inputs

I also reviewed spacing, typography, responsive behaviour, accessibility labels, and consistency between light and dark themes.

---

## 13. Deployed the frontend application

As part of the bonus task, I deployed the completed frontend application to a free cloud hosting service so that the application can be accessed without requiring a local development environment.

No paid cloud services were used for the assignment.

---

## 14. Uploaded the source code to GitHub

Finally, I uploaded the completed source code to a GitHub repository for submission.

The repository contains the application source code, static JSON data, project configuration, and documentation required to run and review the project.

The project can be run locally using:

```bash
npm install
npm run dev
```
