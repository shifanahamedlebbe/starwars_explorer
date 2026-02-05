# Starwars Finder App

## 🔹 Description

A React Native mobile app built with **Expo**, **TypeScript**, and **RTK Query**.  
It allows users to **Search Star Wars characters and view asociated user details & associated films**, with scalable architecture.

---

## Table of Contents

- [Installation]
- [Environment Setup]
- [Installation & Running App]
- [Project Architecture]
- [Code Style & Linting]
- [Environment Variables]
- [EAS Build]
- [License]

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/username/project.git
cd project
```

2. Install dependencies:

```bash
npm install
# or yarn install
```

3. Install Expo CLI globally:

```bash
npm install -g expo-cli
```

---

## 🛠 Environment Setup

- Node.js: >=19.x
- Expo SDK: 54
- React Native: 0.81
- iOS: Xcode + Simulator
- Android: Android Studio + Emulator

---

## Installation & Running App

1. Run `npm run start` to run the app on expo go & Scan the QR code using **Expo Go** on iOS or Android.
2. Run `npm run android` to start app on mobile emulators
3. Run `npm run ios` to start mobile on ios simulator
4. Run `npm run lint` to check for lint relaated issue

---

## Project Architecture

```
assets/
src/
  ── components/          # Reusable shared UI components
  ── screens/             # Feature-based screens
    ── Feature1/          # Feature1
      ── Component/        # Components related to Feature 1
  ── navigation/          # React Navigation setup
  ── services/            # API calls (RTK Query)
    ── Feature1-Services/          # Feature1
  ── store/               # Redux Toolkit store
```

---

## Code Style & Linting

- ESLint + Prettier integrated
- TypeScript enforced
- Feature-based folder structure
- Naming conventions:
  - Components: `PascalCase`
  - Functions & variables: `camelCase`

---

## Environment Variables

Create a `.env` file from `.env.dev`:

```env
EXPO_PUBLIC_SWAPI_URL=https://swapi.dev/api
```

## EAS Build

This app uses **Expo EAS Build** for production-ready builds.

### EAS Build setup:

1. Login to EAS:

```bash
eas login
```

2. Configure project:

```bash
eas build:configure
```

3. Run a production build:

```bash
eas build --platform ios --profile production
eas build --platform android --profile production
```

## 📝 License

MIT © Asfath Shifan

---
