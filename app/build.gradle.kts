plugins { id("com.android.application") }

android { namespace = "com.nextlevel.app"; compileSdk = 35
    defaultConfig { applicationId = "com.nextlevel.app"; minSdk = 24; targetSdk = 35; versionCode = 1; versionName = "1.0" }
}

dependencies { implementation("androidx.webkit:webkit:1.13.0") }
