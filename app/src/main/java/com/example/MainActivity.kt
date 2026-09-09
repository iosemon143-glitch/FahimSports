package com.example

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.ui.Modifier
import com.example.ui.SportsStoreApp
import com.example.ui.theme.MyApplicationTheme

class MainActivity : ComponentActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    window.statusBarColor = android.graphics.Color.rgb(249, 250, 252)
    window.navigationBarColor = android.graphics.Color.rgb(249, 250, 252)
    window.decorView.systemUiVisibility = android.view.View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR
    setContent {
      MyApplicationTheme {
        SportsStoreApp(modifier = Modifier.fillMaxSize())
      }
    }
  }
}
