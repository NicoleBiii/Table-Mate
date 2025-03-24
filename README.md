# Table-Mate Frontend

Table-Mate is a bilingual Chinese-English QR code-based restaurant ordering web application. This repository contains the frontend built with **Vite + React**, styled using **SCSS**, and designed for a **separated frontend-backend architecture**. The backend can be found here: [Table-Mate Backend](https://github.com/NicoleBiii/Table-Mate-backend).

## Features
- **User Side:**
  - Scan QR codes to access table-specific ordering pages.
  <img width="399" alt="scanpage" src="https://github.com/user-attachments/assets/301d5dac-cb85-4e8b-aee2-81df2badfeca" />
  - Browse categorized menus and search for menu items.
  <img width="399" alt="usermenu" src="https://github.com/user-attachments/assets/b0745228-d1fd-4f82-98dc-b62d1362cccc" />
  - Add items to the cart and place orders.

  - View order status and modify existing orders.
  <img width="401" alt="orderplaced" src="https://github.com/user-attachments/assets/30967991-cd6d-4a5f-b3f3-07725f580e1f" />

  - Basic user profile (not yet fully implemented).
  - Multilingual support (English & Chinese) with **i18next**.

- **Merchant Side:**
  - Login system with protected routes.
  - Dashboard with daily order statistics and active tables.
  - <img width="1029" alt="marchanthome" src="https://github.com/user-attachments/assets/9009937d-8d59-4b32-8f23-3cf8372bedf7" />

  - Manage orders, update order status, and edit existing orders.
  <img width="1033" alt="marchantorder" src="https://github.com/user-attachments/assets/ff8cdcb7-9beb-438c-9522-9c6180127197" />
<img width="1030" alt="orderedit" src="https://github.com/user-attachments/assets/5e1da1cc-9530-4906-bfa1-ba8a6346e719" />

  - Menu management (add, edit, and delete menu items with images).
  <img width="1224" alt="marchantmenu" src="https://github.com/user-attachments/assets/1d2ffef5-344c-489e-acd2-f2318ae62a16" />
<img width="1226" alt="menuedit" src="https://github.com/user-attachments/assets/ad81e120-a701-4614-b457-a1d4284f411e" />
<img width="1226" alt="menuadd" src="https://github.com/user-attachments/assets/4224d4cf-c318-46a7-ab36-b020338e73f7" />

  - Table management (view occupied and empty tables, checkout orders).
<img width="1226" alt="Screenshot 2025-03-24 at 12 18 11 AM" src="https://github.com/user-attachments/assets/df0857e1-714f-4da1-ae12-222c60b074dc" />

## Tech Stack
- **Frontend Framework:** React (Vite)
- **State Management:** React Context + Reducer
- **Routing:** React Router
- **Styling:** SCSS (modular within components)
- **QR Code Scanning:** `@yudiel/react-qr-scanner` & `html5-qrcode`
- **API Calls:** Axios
- **Icons:** Lucide-react
- **Multilingual Support:** i18next
- **Date Selection for Orders:** date-fns
- **Search Optimization:** use-debounce

## Installation & Setup

1. Clone the repository:
   ```
   git clone <repo_url>
   ```
3. Navigate to the project folder:
   ```
   cd table-mate
   ```
5. Install dependencies:
   ```
   npm install
   ```
7. Start the development server:
   ```
   npm run dev
   ```

Ensure the backend is running for full functionality.

## Routes Overview

### **User Routes:**
- `/` → Landing Page (links to merchant login & user scan to order)
- `/scan` → Opens camera for QR scanning (redirects to scanned URL)
- `/user/:tableNumber` → User homepage
- `/user/:tableNumber/menu` → Menu browsing and ordering
- `/user/:tableNumber/myorder` → View and manage order
- `/user/:tableNumber/profile` → User profile (currently static)

### **Merchant Routes:**
- `/merchant/login` → Merchant login page
- `/merchant` → Merchant dashboard
- `/merchant/order` → Order management (categorized by status: pending, preparing, served, completed)
- `/merchant/order/:id/edit` → Edit order (add items, transfer tables, update status)
- `/merchant/menu` → Menu management (search, filter, add, edit, delete items)
- `/merchant/menu/create` → Add new menu item
- `/merchant/menu/edit/:id` → Edit existing menu item
- `/merchant/table` → Table management (view orders, checkout tables)

## UI Features

1. **Landing Page:** Two main options - Merchant Login & Scan to Order. If a merchant is already logged in, they are redirected to the dashboard.
2. **Scan Page:** Requests camera access for scanning QR codes. Redirects to `http://localhost:5173/user/:tableNumber` based on QR data.
3. **User Homepage:** Displays restaurant branding, order and waitlist options.
4. **Menu Page:**
   - Browse items by category.
   - Search functionality (hides category sidebar while searching).
   - Add items to the cart, adjust quantities.
   - Floating cart icon showing item count.
5. **User Order Page:**
   - If no unpaid order exists, displays cart contents.
   - Allows modifying items before confirming order.
   - If an unpaid order exists, displays order status and details.
6. **Merchant Dashboard:**
   - Displays daily order count and active table count.
   - Links to order and table management pages.
7. **Order Management:**
   - Orders categorized by status.
   - Select date to view past orders.
   - Quickly update order status.
   - Edit orders (add items, change tables, modify status).
8. **Menu Management:**
   - Browse by category, search items.
   - Add new items with image upload.
   - Edit existing items, with delete confirmation modal.
9. **Table Management:**
   - Displays all tables (occupied tables show active orders, empty tables are grayed out).
   - Clicking 'Checkout' updates the order to completed and marks payment as paid.

## Future Enhancements
- Implement full user authentication and profile functionalities.
- Integrate waitlist management.
- Improve merchant-side analytics and reporting.


