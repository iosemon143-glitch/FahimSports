package com.example.ui.screens

import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.AccessibilityNew
import androidx.compose.material.icons.rounded.Checkroom
import androidx.compose.material.icons.rounded.DirectionsRun
import androidx.compose.material.icons.rounded.Favorite
import androidx.compose.material.icons.rounded.FavoriteBorder
import androidx.compose.material.icons.rounded.FitnessCenter
import androidx.compose.material.icons.rounded.GridView
import androidx.compose.material.icons.rounded.Notifications
import androidx.compose.material.icons.rounded.Search
import androidx.compose.material.icons.rounded.SportsCricket
import androidx.compose.material.icons.rounded.SportsSoccer
import androidx.compose.material.icons.rounded.Tune
import androidx.compose.material3.Badge
import androidx.compose.material3.BadgedBox
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.ripple
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalFocusManager
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.text.withStyle
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.R
import com.example.model.Product
import com.example.model.ProductCategory
import com.example.model.sampleCategories
import com.example.model.sampleProducts
import com.example.ui.components.FloatingBottomNavBar
import com.example.ui.components.NavItem
import com.example.ui.theme.GradientEnd
import com.example.ui.theme.GradientStart
import com.example.ui.theme.OrangeAccent
import com.example.ui.theme.OrangePrimary
import com.example.ui.theme.SurfaceLightGray
import com.example.ui.theme.TextPrimary
import com.example.ui.theme.TextSecondary

@Composable
fun HomeScreen(
  onProductClick: (Product) -> Unit,
  onShopNowClick: () -> Unit,
  selectedCategory: String,
  onCategorySelected: (String) -> Unit,
  searchQuery: String,
  onSearchQueryChange: (String) -> Unit,
  wishlistIds: Set<String>,
  onToggleWishlist: (String) -> Unit,
  currentNavItem: NavItem,
  onNavItemSelected: (NavItem) -> Unit,
  onNotificationClick: () -> Unit = {},
  onFilterClick: () -> Unit = {},
  modifier: Modifier = Modifier
) {
  val focusManager = LocalFocusManager.current

  Box(
    modifier = modifier
      .fillMaxSize()
      .background(Color(0xFFF9FAFC))
      .testTag("home_screen")
  ) {
    Column(
      modifier = Modifier
        .fillMaxSize()
        .verticalScroll(rememberScrollState())
        .padding(bottom = 126.dp) // keep content clear of floating bottom bar
    ) {
      // Use the real Android status bar; no duplicate fake iOS status bar.
      Spacer(modifier = Modifier.height(22.dp))

      // Header: Profile photo, greeting + store name, circular notification bell
      HomeHeader(
        userName = "Fahim Sports",
        greeting = "Good Morning",
        notificationCount = 2,
        onNotificationClick = onNotificationClick,
        modifier = Modifier.padding(horizontal = 20.dp)
      )

      Spacer(modifier = Modifier.height(18.dp))

      // 3. Search Bar + Filter Button
      SearchAndFilterRow(
        query = searchQuery,
        onQueryChange = onSearchQueryChange,
        onFilterClick = onFilterClick,
        onSearchDone = { focusManager.clearFocus() },
        modifier = Modifier.padding(horizontal = 20.dp)
      )

      Spacer(modifier = Modifier.height(20.dp))

      // 4. Large Promotional Banner Card (Smooth blue to purple gradient)
      PromoBannerCard(
        onShopNowClick = onShopNowClick,
        modifier = Modifier.padding(horizontal = 20.dp)
      )

      Spacer(modifier = Modifier.height(24.dp))

      // 5. Categories Section
      CategoriesSection(
        categories = sampleCategories,
        selectedCategoryId = selectedCategory,
        onCategorySelected = onCategorySelected
      )

      Spacer(modifier = Modifier.height(24.dp))

      // 6. Popular Products Section
      PopularProductsSection(
        products = sampleProducts,
        wishlistIds = wishlistIds,
        onToggleWishlist = onToggleWishlist,
        onProductClick = onProductClick,
        onViewAllClick = onShopNowClick
      )

      Spacer(modifier = Modifier.height(16.dp))
    }

    // 7. Fixed Bottom Navigation Bar (Floating pill style)
    FloatingBottomNavBar(
      selectedItem = currentNavItem,
      onItemSelected = onNavItemSelected,
      wishlistCount = wishlistIds.size,
      unreadMessagesCount = 2,
      modifier = Modifier
        .align(Alignment.BottomCenter)
        .testTag("home_bottom_nav")
    )
  }
}

@Composable
private fun HomeHeader(
  userName: String,
  greeting: String,
  notificationCount: Int,
  onNotificationClick: () -> Unit,
  modifier: Modifier = Modifier
) {
  Row(
    modifier = modifier
      .fillMaxWidth()
      .testTag("home_header"),
    verticalAlignment = Alignment.CenterVertically,
    horizontalArrangement = Arrangement.SpaceBetween
  ) {
    // User Profile Photo + Greeting
    Row(
      verticalAlignment = Alignment.CenterVertically,
      horizontalArrangement = Arrangement.spacedBy(14.dp)
    ) {
      Box(
        modifier = Modifier
          .size(48.dp)
          .clip(CircleShape)
          .border(2.dp, Color.White, CircleShape)
          .shadow(4.dp, CircleShape)
          .testTag("profile_avatar")
      ) {
        Image(
          painter = painterResource(id = R.drawable.img_user_avatar),
          contentDescription = "User profile photo",
          contentScale = ContentScale.Crop,
          modifier = Modifier.fillMaxSize()
        )
      }

      Column {
        Text(
          text = greeting,
          fontSize = 13.sp,
          fontWeight = FontWeight.Medium,
          color = TextSecondary,
          modifier = Modifier.testTag("header_greeting")
        )
        Text(
          text = userName,
          fontSize = 18.sp,
          fontWeight = FontWeight.Bold,
          color = TextPrimary,
          modifier = Modifier.testTag("header_user_name")
        )
      }
    }

    // Circular Notification Bell with soft shadow
    Surface(
      modifier = Modifier
        .size(46.dp)
        .shadow(
          elevation = 6.dp,
          shape = CircleShape,
          ambientColor = Color(0x14000000),
          spotColor = Color(0x1F000000)
        )
        .clip(CircleShape)
        .clickable(
          interactionSource = remember { MutableInteractionSource() },
          indication = ripple(bounded = true),
          onClick = onNotificationClick
        )
        .testTag("notification_bell_button"),
      shape = CircleShape,
      color = Color.White
    ) {
      Box(
        modifier = Modifier.fillMaxSize(),
        contentAlignment = Alignment.Center
      ) {
        BadgedBox(
          badge = {
            if (notificationCount > 0) {
              Badge(
                containerColor = OrangePrimary,
                contentColor = Color.White,
                modifier = Modifier.size(8.dp)
              )
            }
          }
        ) {
          Icon(
            imageVector = Icons.Rounded.Notifications,
            contentDescription = "Notifications",
            tint = TextPrimary,
            modifier = Modifier.size(22.dp)
          )
        }
      }
    }
  }
}

@Composable
private fun SearchAndFilterRow(
  query: String,
  onQueryChange: (String) -> Unit,
  onFilterClick: () -> Unit,
  onSearchDone: () -> Unit,
  modifier: Modifier = Modifier
) {
  Row(
    modifier = modifier.fillMaxWidth(),
    verticalAlignment = Alignment.CenterVertically,
    horizontalArrangement = Arrangement.spacedBy(12.dp)
  ) {
    // Rounded search bar with light gray background
    Box(
      modifier = Modifier
        .weight(1f)
        .height(50.dp)
        .clip(RoundedCornerShape(25.dp))
        .background(SurfaceLightGray)
        .padding(horizontal = 16.dp)
        .testTag("search_bar"),
      contentAlignment = Alignment.CenterStart
    ) {
      Row(
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(10.dp)
      ) {
        Icon(
          imageVector = Icons.Rounded.Search,
          contentDescription = "Search icon",
          tint = TextSecondary,
          modifier = Modifier.size(20.dp)
        )

        Box(modifier = Modifier.weight(1f)) {
          if (query.isEmpty()) {
            Text(
              text = "Search for sports products...",
              fontSize = 13.sp,
              color = TextSecondary.copy(alpha = 0.8f),
              maxLines = 1,
              overflow = TextOverflow.Ellipsis
            )
          }
          BasicTextField(
            value = query,
            onValueChange = onQueryChange,
            singleLine = true,
            textStyle = TextStyle(
              fontSize = 14.sp,
              fontWeight = FontWeight.Normal,
              color = TextPrimary
            ),
            cursorBrush = SolidColor(OrangePrimary),
            keyboardOptions = KeyboardOptions(imeAction = ImeAction.Search),
            keyboardActions = KeyboardActions(onSearch = { onSearchDone() }),
            modifier = Modifier
              .fillMaxWidth()
              .testTag("search_input_field")
          )
        }
      }
    }

    // Separate circular filter/settings button beside it
    Surface(
      modifier = Modifier
        .size(50.dp)
        .shadow(
          elevation = 4.dp,
          shape = CircleShape,
          ambientColor = Color(0x12000000),
          spotColor = Color(0x1A000000)
        )
        .clip(CircleShape)
        .clickable(
          interactionSource = remember { MutableInteractionSource() },
          indication = ripple(bounded = true),
          onClick = onFilterClick
        )
        .testTag("filter_button"),
      shape = CircleShape,
      color = Color.White
    ) {
      Box(
        modifier = Modifier.fillMaxSize(),
        contentAlignment = Alignment.Center
      ) {
        Icon(
          imageVector = Icons.Rounded.Tune,
          contentDescription = "Filter sports products",
          tint = TextPrimary,
          modifier = Modifier.size(21.dp)
        )
      }
    }
  }
}

@Composable
private fun PromoBannerCard(
  onShopNowClick: () -> Unit,
  modifier: Modifier = Modifier
) {
  Card(
    modifier = modifier
      .fillMaxWidth()
      .height(180.dp)
      .shadow(
        elevation = 10.dp,
        shape = RoundedCornerShape(24.dp),
        ambientColor = Color(0x331E1B6B),
        spotColor = Color(0x405B3FD9)
      )
      .testTag("promo_banner_card"),
    shape = RoundedCornerShape(24.dp),
    colors = CardDefaults.cardColors(containerColor = Color.Transparent)
  ) {
    Box(
      modifier = Modifier
        .fillMaxSize()
        .background(
          brush = Brush.linearGradient(
            colors = listOf(
              GradientStart,
              Color(0xFF3726A6),
              GradientEnd
            )
          )
        )
        .padding(horizontal = 20.dp, vertical = 18.dp)
    ) {
      // Left promotional copy & CTA
      Column(
        modifier = Modifier
          .fillMaxWidth(0.58f)
          .align(Alignment.CenterStart),
        verticalArrangement = Arrangement.Center
      ) {
        // Small uppercase label
        Text(
          text = "NEW SEASON COLLECTION",
          fontSize = 10.sp,
          fontWeight = FontWeight.Bold,
          letterSpacing = 1.2.sp,
          color = Color(0xFFC7B9FF),
          modifier = Modifier.testTag("banner_label")
        )

        Spacer(modifier = Modifier.height(4.dp))

        // Bold headline "Up to 30% OFF" with 30% highlighted
        val bannerHeadline = buildAnnotatedString {
          withStyle(
            style = SpanStyle(
              color = Color.White,
              fontWeight = FontWeight.ExtraBold,
              fontSize = 21.sp
            )
          ) {
            append("Up to ")
          }
          withStyle(
            style = SpanStyle(
              color = OrangeAccent,
              fontWeight = FontWeight.ExtraBold,
              fontSize = 22.sp
            )
          ) {
            append("30% OFF")
          }
        }
        Text(
          text = bannerHeadline,
          modifier = Modifier.testTag("banner_headline")
        )

        // Subtext "Premium Sports Wear"
        Text(
          text = "Premium Sports Wear",
          fontSize = 12.sp,
          fontWeight = FontWeight.Normal,
          color = Color.White.copy(alpha = 0.85f),
          modifier = Modifier.testTag("banner_subtext")
        )

        Spacer(modifier = Modifier.height(14.dp))

        // White rounded pill button "Shop Now"
        Surface(
          modifier = Modifier
            .clip(RoundedCornerShape(20.dp))
            .clickable(
              interactionSource = remember { MutableInteractionSource() },
              indication = ripple(bounded = true),
              onClick = onShopNowClick
            )
            .testTag("banner_shop_now_button"),
          shape = RoundedCornerShape(20.dp),
          color = Color.White,
          shadowElevation = 3.dp
        ) {
          Box(
            modifier = Modifier.padding(horizontal = 18.dp, vertical = 8.dp),
            contentAlignment = Alignment.Center
          ) {
            Text(
              text = "Shop Now",
              fontSize = 12.sp,
              fontWeight = FontWeight.Bold,
              color = GradientStart
            )
          }
        }
      }

      // Product imagery on the right arranged naturally
      Box(
        modifier = Modifier
          .fillMaxWidth(0.48f)
          .height(150.dp)
          .align(Alignment.CenterEnd)
          .testTag("banner_imagery")
      ) {
        Image(
          painter = painterResource(id = R.drawable.img_banner_hero),
          contentDescription = "Sports promotional gear showcase",
          contentScale = ContentScale.Crop,
          modifier = Modifier
            .fillMaxSize()
            .clip(RoundedCornerShape(16.dp))
        )
      }
    }
  }
}

@Composable
private fun CategoriesSection(
  categories: List<ProductCategory>,
  selectedCategoryId: String,
  onCategorySelected: (String) -> Unit,
  modifier: Modifier = Modifier
) {
  Column(
    modifier = modifier
      .fillMaxWidth()
      .testTag("categories_section")
  ) {
    Text(
      text = "Categories",
      fontSize = 18.sp,
      fontWeight = FontWeight.Bold,
      color = TextPrimary,
      modifier = Modifier
        .padding(horizontal = 20.dp)
        .testTag("categories_title")
    )

    Spacer(modifier = Modifier.height(14.dp))

    LazyRow(
      contentPadding = PaddingValues(horizontal = 20.dp),
      horizontalArrangement = Arrangement.spacedBy(16.dp),
      modifier = Modifier.testTag("categories_list")
    ) {
      items(categories) { category ->
        val isSelected = category.id == selectedCategoryId

        CategoryItem(
          category = category,
          isSelected = isSelected,
          onClick = { onCategorySelected(category.id) }
        )
      }
    }
  }
}

@Composable
private fun CategoryItem(
  category: ProductCategory,
  isSelected: Boolean,
  onClick: () -> Unit
) {
  val icon = when (category.id) {
    "all" -> Icons.Rounded.GridView
    "jersey" -> Icons.Rounded.Checkroom
    "trouser" -> Icons.Rounded.AccessibilityNew
    "football" -> Icons.Rounded.SportsSoccer
    "cricket" -> Icons.Rounded.SportsCricket
    "shoes" -> Icons.Rounded.DirectionsRun
    "accessories" -> Icons.Rounded.FitnessCenter
    else -> Icons.Rounded.GridView
  }

  val backgroundColor by animateColorAsState(
    targetValue = if (isSelected) OrangePrimary else Color(0xFFF1F3F7),
    animationSpec = tween(150),
    label = "cat_bg"
  )

  val iconColor by animateColorAsState(
    targetValue = if (isSelected) Color.White else TextPrimary,
    animationSpec = tween(150),
    label = "cat_icon"
  )

  val textColor by animateColorAsState(
    targetValue = if (isSelected) OrangePrimary else TextSecondary,
    animationSpec = tween(150),
    label = "cat_text"
  )

  Column(
    horizontalAlignment = Alignment.CenterHorizontally,
    modifier = Modifier
      .clickable(
        interactionSource = remember { MutableInteractionSource() },
        indication = ripple(bounded = false, radius = 28.dp),
        onClick = onClick
      )
      .testTag("category_item_${category.id}")
  ) {
    // Circular icon button
    Box(
      modifier = Modifier
        .size(56.dp)
        .shadow(
          elevation = if (isSelected) 6.dp else 0.dp,
          shape = CircleShape,
          ambientColor = Color(0x24FF6B00),
          spotColor = Color(0x33FF6B00)
        )
        .clip(CircleShape)
        .background(backgroundColor),
      contentAlignment = Alignment.Center
    ) {
      Icon(
        imageVector = icon,
        contentDescription = category.name,
        tint = iconColor,
        modifier = Modifier.size(24.dp)
      )
    }

    Spacer(modifier = Modifier.height(8.dp))

    // Label below
    Text(
      text = category.name,
      fontSize = 12.sp,
      fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium,
      color = textColor
    )
  }
}

@Composable
private fun PopularProductsSection(
  products: List<Product>,
  wishlistIds: Set<String>,
  onToggleWishlist: (String) -> Unit,
  onProductClick: (Product) -> Unit,
  onViewAllClick: () -> Unit,
  modifier: Modifier = Modifier
) {
  Column(
    modifier = modifier
      .fillMaxWidth()
      .testTag("popular_products_section")
  ) {
    // Title row with "View all"
    Row(
      modifier = Modifier
        .fillMaxWidth()
        .padding(horizontal = 20.dp),
      horizontalArrangement = Arrangement.SpaceBetween,
      verticalAlignment = Alignment.CenterVertically
    ) {
      Text(
        text = "Popular",
        fontSize = 18.sp,
        fontWeight = FontWeight.Bold,
        color = TextPrimary,
        modifier = Modifier.testTag("popular_title")
      )

      Text(
        text = "View all",
        fontSize = 13.sp,
        fontWeight = FontWeight.SemiBold,
        color = OrangePrimary,
        modifier = Modifier
          .clickable(
            interactionSource = remember { MutableInteractionSource() },
            indication = ripple(bounded = false),
            onClick = onViewAllClick
          )
          .testTag("popular_view_all_link")
      )
    }

    Spacer(modifier = Modifier.height(14.dp))

    // Horizontal scrollable product cards
    LazyRow(
      contentPadding = PaddingValues(horizontal = 20.dp),
      horizontalArrangement = Arrangement.spacedBy(16.dp),
      modifier = Modifier.testTag("popular_products_list")
    ) {
      items(products) { product ->
        val isWishlisted = wishlistIds.contains(product.id)

        ProductCard(
          product = product,
          isWishlisted = isWishlisted,
          onToggleWishlist = { onToggleWishlist(product.id) },
          onClick = { onProductClick(product) }
        )
      }
    }
  }
}

@Composable
private fun ProductCard(
  product: Product,
  isWishlisted: Boolean,
  onToggleWishlist: () -> Unit,
  onClick: () -> Unit
) {
  Card(
    modifier = Modifier
      .width(190.dp)
      .shadow(
        elevation = 6.dp,
        shape = RoundedCornerShape(22.dp),
        ambientColor = Color(0x12000000),
        spotColor = Color(0x1C000000)
      )
      .clip(RoundedCornerShape(22.dp))
      .clickable(
        interactionSource = remember { MutableInteractionSource() },
        indication = ripple(bounded = true),
        onClick = onClick
      )
      .testTag("product_card_${product.id}"),
    shape = RoundedCornerShape(22.dp),
    colors = CardDefaults.cardColors(containerColor = Color.White)
  ) {
    Column(
      modifier = Modifier
        .fillMaxWidth()
        .padding(12.dp)
    ) {
      // Product Image Container with Heart Icon in Top-Right
      Box(
        modifier = Modifier
          .fillMaxWidth()
          .height(150.dp)
          .clip(RoundedCornerShape(18.dp))
          .background(Color(0xFFF6F7FA))
      ) {
        // Product Photo
        Image(
          painter = painterResource(id = product.imageRes),
          contentDescription = product.name,
          contentScale = ContentScale.Crop,
          modifier = Modifier
            .fillMaxSize()
            .padding(4.dp)
            .clip(RoundedCornerShape(14.dp))
        )

        // Heart / Wishlist Icon Button (top-right corner)
        Surface(
          modifier = Modifier
            .size(34.dp)
            .align(Alignment.TopEnd)
            .padding(top = 8.dp, end = 8.dp)
            .shadow(2.dp, CircleShape)
            .clip(CircleShape)
            .clickable(
              interactionSource = remember { MutableInteractionSource() },
              indication = ripple(bounded = true),
              onClick = onToggleWishlist
            )
            .testTag("wishlist_button_${product.id}"),
          shape = CircleShape,
          color = Color.White
        ) {
          Box(
            modifier = Modifier.fillMaxSize(),
            contentAlignment = Alignment.Center
          ) {
            Icon(
              imageVector = if (isWishlisted) Icons.Rounded.Favorite else Icons.Rounded.FavoriteBorder,
              contentDescription = "Wishlist",
              tint = if (isWishlisted) Color(0xFFFF334B) else TextSecondary,
              modifier = Modifier.size(17.dp)
            )
          }
        }
      }

      Spacer(modifier = Modifier.height(12.dp))

      // Product Name
      Text(
        text = product.name,
        fontSize = 15.sp,
        fontWeight = FontWeight.Bold,
        color = TextPrimary,
        maxLines = 1,
        overflow = TextOverflow.Ellipsis,
        modifier = Modifier.testTag("product_name_${product.id}")
      )

      Spacer(modifier = Modifier.height(3.dp))

      // Subtitle / category
      Text(
        text = product.subtitle,
        fontSize = 12.sp,
        color = TextSecondary,
        maxLines = 1,
        overflow = TextOverflow.Ellipsis
      )

      Spacer(modifier = Modifier.height(8.dp))

      // Price in bold accent color
      Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
      ) {
        Text(
          text = product.formattedPrice,
          fontSize = 17.sp,
          fontWeight = FontWeight.ExtraBold,
          color = OrangePrimary,
          modifier = Modifier.testTag("product_price_${product.id}")
        )

        product.discountPrice?.let { oldPrice ->
          Text(
            text = oldPrice,
            fontSize = 12.sp,
            color = TextSecondary.copy(alpha = 0.6f),
            style = TextStyle(textDecoration = TextDecoration.LineThrough)
          )
        }
      }
    }
  }
}
