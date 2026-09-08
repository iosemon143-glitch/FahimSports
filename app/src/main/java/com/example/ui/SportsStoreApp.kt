package com.example.ui

import androidx.compose.animation.AnimatedContent
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.slideInHorizontally
import androidx.compose.animation.slideOutHorizontally
import androidx.compose.animation.togetherWith
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.widthIn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.Check
import androidx.compose.material.icons.rounded.PhoneIphone
import androidx.compose.material.icons.rounded.Smartphone
import androidx.compose.material.icons.rounded.SwapHoriz
import androidx.compose.material3.Icon
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.ripple
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.model.Product
import com.example.model.sampleProducts
import com.example.ui.components.NavItem
import com.example.ui.screens.HomeScreen
import com.example.ui.screens.ProductDetailsScreen
import com.example.ui.theme.OrangePrimary
import com.example.ui.theme.TextPrimary
import com.example.ui.theme.TextSecondary
import kotlinx.coroutines.launch

enum class AppScreen {
  HOME,
  DETAILS
}

@Composable
fun SportsStoreApp(modifier: Modifier = Modifier) {
  var currentScreen by remember { mutableStateOf(AppScreen.HOME) }
  var selectedProduct by remember { mutableStateOf(sampleProducts.first()) }
  var selectedCategory by remember { mutableStateOf("all") }
  var searchQuery by remember { mutableStateOf("") }
  var wishlistIds by remember { mutableStateOf(setOf("prod_jersey")) }
  var currentNavItem by remember { mutableStateOf(NavItem.HOME) }
  var enablePhoneFrame by remember { mutableStateOf(true) }

  val snackbarHostState = remember { SnackbarHostState() }
  val scope = rememberCoroutineScope()

  BoxWithConstraints(
    modifier = modifier
      .fillMaxSize()
      .background(Color(0xFFEBEFF5))
      .testTag("sports_store_app"),
    contentAlignment = Alignment.Center
  ) {
    val isWideScreen = maxWidth > 520.dp
    val showFrame = enablePhoneFrame && isWideScreen

    Column(
      modifier = Modifier.fillMaxSize(),
      horizontalAlignment = Alignment.CenterHorizontally
    ) {
      // Top Screen Switcher & Frame Controls
      TopDemoControlsBar(
        currentScreen = currentScreen,
        onScreenChange = { currentScreen = it },
        isWideScreen = isWideScreen,
        enablePhoneFrame = enablePhoneFrame,
        onToggleFrame = { enablePhoneFrame = !enablePhoneFrame }
      )

      // Main Phone Canvas
      Box(
        modifier = if (showFrame) {
          Modifier
            .weight(1f)
            .padding(vertical = 12.dp)
            .widthIn(max = 412.dp)
            .shadow(
              elevation = 28.dp,
              shape = RoundedCornerShape(44.dp),
              ambientColor = Color(0x33000000),
              spotColor = Color(0x40000000)
            )
            .border(
              width = 4.dp,
              brush = Brush.linearGradient(
                colors = listOf(
                  Color(0xFF2C2C2E),
                  Color(0xFF1C1C1E),
                  Color(0xFF3A3A3C)
                )
              ),
              shape = RoundedCornerShape(44.dp)
            )
            .clip(RoundedCornerShape(44.dp))
        } else {
          Modifier.weight(1f).fillMaxWidth()
        }
      ) {
        Scaffold(
          modifier = Modifier.fillMaxSize(),
          snackbarHost = { SnackbarHost(hostState = snackbarHostState) },
          bottomBar = {
            // iOS Home Indicator Bar at the very bottom
            Box(
              modifier = Modifier
                .fillMaxWidth()
                .background(Color(0xFFF9FAFC))
                .height(18.dp)
                .testTag("ios_home_indicator_container"),
              contentAlignment = Alignment.Center
            ) {
              Box(
                modifier = Modifier
                  .width(134.dp)
                  .height(4.5.dp)
                  .clip(RoundedCornerShape(3.dp))
                  .background(Color(0xFF1C1C1E).copy(alpha = 0.5f))
                  .testTag("ios_home_indicator_bar")
              )
            }
          }
        ) { innerPadding ->
          Box(
            modifier = Modifier
              .fillMaxSize()
              .padding(innerPadding)
          ) {
            AnimatedContent(
              targetState = currentScreen,
              transitionSpec = {
                if (targetState == AppScreen.DETAILS) {
                  (slideInHorizontally(initialOffsetX = { it }, animationSpec = tween(300)) + fadeIn())
                    .togetherWith(slideOutHorizontally(targetOffsetX = { -it / 3 }, animationSpec = tween(300)) + fadeOut())
                } else {
                  (slideInHorizontally(initialOffsetX = { -it / 3 }, animationSpec = tween(300)) + fadeIn())
                    .togetherWith(slideOutHorizontally(targetOffsetX = { it }, animationSpec = tween(300)) + fadeOut())
                }
              },
              label = "screen_transition"
            ) { screen ->
              when (screen) {
                AppScreen.HOME -> {
                  HomeScreen(
                    onProductClick = { product ->
                      selectedProduct = product
                      currentScreen = AppScreen.DETAILS
                    },
                    onShopNowClick = {
                      selectedProduct = sampleProducts.first()
                      currentScreen = AppScreen.DETAILS
                    },
                    selectedCategory = selectedCategory,
                    onCategorySelected = { catId ->
                      selectedCategory = catId
                    },
                    searchQuery = searchQuery,
                    onSearchQueryChange = { searchQuery = it },
                    wishlistIds = wishlistIds,
                    onToggleWishlist = { prodId ->
                      wishlistIds = if (wishlistIds.contains(prodId)) {
                        wishlistIds - prodId
                      } else {
                        wishlistIds + prodId
                      }
                      val isAdded = wishlistIds.contains(prodId)
                      scope.launch {
                        snackbarHostState.showSnackbar(
                          if (isAdded) "Saved to your wishlist!" else "Removed from wishlist"
                        )
                      }
                    },
                    currentNavItem = currentNavItem,
                    onNavItemSelected = { navItem ->
                      currentNavItem = navItem
                      if (navItem == NavItem.WISHLIST) {
                        scope.launch {
                          snackbarHostState.showSnackbar("Wishlist: ${wishlistIds.size} saved items")
                        }
                      } else if (navItem != NavItem.HOME) {
                        scope.launch {
                          snackbarHostState.showSnackbar("${navItem.title} tab selected")
                        }
                      }
                    },
                    onNotificationClick = {
                      scope.launch {
                        snackbarHostState.showSnackbar("You have 2 new season promotions waiting!")
                      }
                    },
                    onFilterClick = {
                      scope.launch {
                        snackbarHostState.showSnackbar("Filter active: Showing curated sports gear")
                      }
                    }
                  )
                }

                AppScreen.DETAILS -> {
                  ProductDetailsScreen(
                    product = selectedProduct,
                    onBackClick = {
                      currentScreen = AppScreen.HOME
                    },
                    onAddToCart = { product, size, qty ->
                      scope.launch {
                        snackbarHostState.showSnackbar(
                          "Added $qty × ${product.name} (Size $size) to Cart!"
                        )
                      }
                    },
                    isWishlisted = wishlistIds.contains(selectedProduct.id),
                    onToggleWishlist = {
                      val prodId = selectedProduct.id
                      wishlistIds = if (wishlistIds.contains(prodId)) {
                        wishlistIds - prodId
                      } else {
                        wishlistIds + prodId
                      }
                      val isAdded = wishlistIds.contains(prodId)
                      scope.launch {
                        snackbarHostState.showSnackbar(
                          if (isAdded) "Saved to wishlist!" else "Removed from wishlist"
                        )
                      }
                    }
                  )
                }
              }
            }
          }
        }
      }
    }
  }
}

@Composable
private fun TopDemoControlsBar(
  currentScreen: AppScreen,
  onScreenChange: (AppScreen) -> Unit,
  isWideScreen: Boolean,
  enablePhoneFrame: Boolean,
  onToggleFrame: () -> Unit
) {
  Surface(
    modifier = Modifier
      .fillMaxWidth()
      .padding(horizontal = 16.dp, vertical = 6.dp)
      .testTag("top_demo_controls"),
    shape = RoundedCornerShape(20.dp),
    color = Color.White.copy(alpha = 0.95f),
    shadowElevation = 2.dp
  ) {
    Row(
      modifier = Modifier
        .fillMaxWidth()
        .padding(horizontal = 12.dp, vertical = 6.dp),
      horizontalArrangement = Arrangement.SpaceBetween,
      verticalAlignment = Alignment.CenterVertically
    ) {
      // Screen Segmented Control: Home | Product Details
      Row(
        modifier = Modifier
          .clip(RoundedCornerShape(16.dp))
          .background(Color(0xFFF1F3F7))
          .padding(3.dp),
        horizontalArrangement = Arrangement.spacedBy(4.dp),
        verticalAlignment = Alignment.CenterVertically
      ) {
        ScreenTabButton(
          title = "Home Screen",
          isSelected = currentScreen == AppScreen.HOME,
          onClick = { onScreenChange(AppScreen.HOME) },
          tag = "tab_home_screen"
        )

        ScreenTabButton(
          title = "Product Details",
          isSelected = currentScreen == AppScreen.DETAILS,
          onClick = { onScreenChange(AppScreen.DETAILS) },
          tag = "tab_details_screen"
        )
      }

      // If wide screen, offer iPhone Frame toggle
      if (isWideScreen) {
        Row(
          modifier = Modifier
            .clip(RoundedCornerShape(14.dp))
            .background(if (enablePhoneFrame) OrangePrimary.copy(alpha = 0.12f) else Color(0xFFF1F3F7))
            .clickable(
              interactionSource = remember { MutableInteractionSource() },
              indication = ripple(bounded = true),
              onClick = onToggleFrame
            )
            .padding(horizontal = 10.dp, vertical = 6.dp)
            .testTag("toggle_iphone_frame"),
          verticalAlignment = Alignment.CenterVertically,
          horizontalArrangement = Arrangement.spacedBy(6.dp)
        ) {
          Icon(
            imageVector = Icons.Rounded.PhoneIphone,
            contentDescription = "Toggle iPhone Frame",
            tint = if (enablePhoneFrame) OrangePrimary else TextSecondary,
            modifier = Modifier.size(16.dp)
          )
          Text(
            text = if (enablePhoneFrame) "iPhone Frame" else "Full Width",
            fontSize = 12.sp,
            fontWeight = FontWeight.Medium,
            color = if (enablePhoneFrame) OrangePrimary else TextSecondary
          )
        }
      }
    }
  }
}

@Composable
private fun ScreenTabButton(
  title: String,
  isSelected: Boolean,
  onClick: () -> Unit,
  tag: String
) {
  Box(
    modifier = Modifier
      .clip(RoundedCornerShape(12.dp))
      .background(if (isSelected) OrangePrimary else Color.Transparent)
      .clickable(
        interactionSource = remember { MutableInteractionSource() },
        indication = ripple(bounded = true),
        onClick = onClick
      )
      .padding(horizontal = 14.dp, vertical = 6.dp)
      .testTag(tag),
    contentAlignment = Alignment.Center
  ) {
    Text(
      text = title,
      fontSize = 12.sp,
      fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium,
      color = if (isSelected) Color.White else TextPrimary
    )
  }
}
