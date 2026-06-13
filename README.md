# Remindly

Remindly is a React Native mobile application developed using Expo. It helps university students manage assignments by setting reminders, tracking deadlines, and viewing assignment statistics.

## Features

* Add and manage assignment reminders
* View assignments using a calendar interface
* Upload assignment-related documents
* Track assignment progress with charts
* Smooth animations using React Native Reanimated
* Bottom tab navigation for easy access to app features

## Technologies Used

* React Native
* Expo SDK 54
* JavaScript
* React Navigation
* Context API
* React Native Reanimated
* React Native Vector Icons
* React Native Calendars
* Expo Document Picker
* React Native Chart Kit
* React Native SVG
* Expo Linear Gradient

---

# Prerequisites

Before running the project, make sure the following software is installed:

## 1. Install Node.js

Download and install the **LTS version** of Node.js from the official website.

After installation, verify that Node.js and npm are available:

```bash
node -v
npm -v
```

---

## 2. Install Git (Optional)

Required only if you clone the project from GitHub.

Check installation:

```bash
git --version
```

---

# Project Setup

Open the project folder in VS Code or any terminal.

```bash
cd remindly
```

Install all dependencies:

```bash
npm install --legacy-peer-deps
```

Install Expo SDK 54 compatible packages:

```bash
npx expo install react-native-screens react-native-safe-area-context react-native-reanimated react-native-svg expo-document-picker expo-linear-gradient react-native-worklets
```

Check whether all dependencies are correctly installed:

```bash
npx expo-doctor
```

You should see:

```text
18/18 checks passed
```

---

# Running the Application

## Option 1: Run Using Expo Go (Recommended for Beginners)

### Requirements

* Android phone
* Expo Go application installed from the Google Play Store

### Steps

1. Start the Expo development server:

```bash
npx expo start --clear
```

2. A QR code will appear in the terminal and browser.

3. Connect your computer and phone to the **same Wi-Fi network**.

4. Open **Expo Go** on your phone.

5. Tap **"Scan QR Code"**.

6. Scan the QR code displayed in the terminal or browser.

7. The Remindly application will open on your phone.

---

## Option 2: Run Using Android Studio Emulator

### Requirements

* Android Studio installed
* Android SDK installed
* Android Emulator configured

### Android Studio Setup

1. Open Android Studio.
2. Select **More Actions → Virtual Device Manager**.
3. Create a new Android Virtual Device (AVD).
4. Start the emulator.

### Run the Application

Start Expo:

```bash
npx expo start --clear
```

In the Expo terminal, press:

```text
a
```

Expo will automatically open the application in the running Android emulator.

Alternatively, you can run:

```bash
npx expo start --android
```

---

# Troubleshooting

## Dependency Issues

If dependency conflicts occur, delete existing dependencies:

### Windows PowerShell

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
```

Then reinstall:

```bash
npm install --legacy-peer-deps
npx expo install --fix
```

Verify installation:

```bash
npx expo-doctor
```

---

## Expo Go Compatibility

This project uses:

```text
Expo SDK 54
```

Ensure that your Expo Go application supports SDK 54.

If Expo Go requests an update, install the latest version from the Play Store.

---

# Building an APK/AAB (Optional)

When you are ready to generate an Android build for testing or publishing, use EAS Build.

Install EAS CLI:

```bash
npm install -g eas-cli
```

Login to your Expo account:

```bash
eas login
```

Configure the project:

```bash
eas build:configure
```

Generate an Android preview build:

```bash
eas build -p android --profile preview
```

Generate a production build:

```bash
eas build -p android --profile production
```

---

# Available Scripts

Start Expo:

```bash
npm start
```

Run on Android emulator:

```bash
npm run android
```

Run on iOS simulator (macOS only):

```bash
npm run ios
```

Run in web browser:

```bash
npm run web
```

---

# Author

Developed as a university assignment reminder application using React Native and Expo.
