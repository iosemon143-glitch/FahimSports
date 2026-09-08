# Fahim Sports — Phone Build

This project is prepared as a native Jetpack Compose Android app.

## Easiest phone-only build

1. Use a maintained Android-on-phone IDE or a cloud GitHub Actions build.
2. The repository includes `.github/workflows/build-apk.yml`.
3. On GitHub mobile/web, upload this project to a repository, then open **Actions → Build Fahim Sports APK → Run workflow**.
4. When complete, download the `FahimSports-debug-apk` artifact and install `app-debug.apk`.

## Android Studio

Open the folder containing `settings.gradle.kts`, allow Gradle sync, then Build → Build APK(s).

## Important

The old `AndroidIDEOfficial/AndroidIDE` project is archived and no longer maintained. Prefer a current maintained mobile IDE or GitHub Actions for phone-only building.
