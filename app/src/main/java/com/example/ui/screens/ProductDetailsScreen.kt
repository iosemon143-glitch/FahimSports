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
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.rounded.ArrowBack
import androidx.compose.material.icons.rounded.Air
import androidx.compose.material.icons.rounded.Add
import androidx.compose.material.icons.rounded.Favorite
import androidx.compose.material.icons.rounded.FavoriteBorder
import androidx.compose.material.icons.rounded.MoreVert
import androidx.compose.material.icons.rounded.Remove
import androidx.compose.material.icons.rounded.Security
import androidx.compose.material.icons.rounded.Speed
import androidx.compose.material.icons.rounded.WaterDrop
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.Icon
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.ripple
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.R
import com.example.model.Product
import com.example.ui.theme.OrangeAccent
import com.example.ui.theme.OrangePrimary
import com.example.ui.theme.SurfaceLightGray
import com.example.ui.theme.TextPrimary
import com.example.ui.theme.TextSecondary

@Composable
fun ProductDetailsScreen(
  product: Product,
  onBackClick: () -> Unit,
  onAddToCart: (product: Product, size: String, quantity: Int) -> Unit,
  isWishlisted: Boolean,
  onToggleWishlist: () -> Unit,
  modifier: Modifier = Modifier
) {
  var selectedSize by remember { mutableStateOf("M") }
  var quantity by remember { mutableIntStateOf(1) }
  var showMenu by remember { mutableStateOf(false) }

  val sizes = listOf("S", "M", "L", "XL", "XXL")

  Box(
    modifier = modifier
      .fillMaxSize()
      .background(Color(0xFFF9FAFC))
      .testTag("product_details_screen")
  ) {
    Column(
      modifier = Modifier
        .fillMaxSize()
        .verticalScroll(rememberScrollState())
        .padding(bottom = 100.dp) // space for bottom fixed action row
    ) {
      // Use the real Android status bar; no duplicate fake iOS status bar.
      Spacer(modifier = Modifier.height(18.dp))

      // Top Bar: circular back button (left), "Details" title (center), circular three-dot menu (right)
      DetailsTopBar(
        onBackClick = onBackClick,
        onMenuClick = { showMenu = !showMenu },
        isWishlisted = isWishlisted,
        onToggleWishlist = onToggleWishlist,
        showMenu = showMenu,
        onDismissMenu = { showMenu = false },
        modifier = Modifier.padding(horizontal = 20.dp)
      )

      Spacer(modifier = Modifier.height(18.dp))

      // 3. Large centered product image on a soft light-gray rounded background card
      ProductHeroImageCard(
        imageRes = product.imageRes,
        productName = product.name,
        modifier = Modifier.padding(horizontal = 20.dp)
      )

      Spacer(modifier = Modifier.height(20.dp))

      // 4. Product Name + Price aligned right, Subtitle "Premium Quality" below name
      ProductTitleAndPrice(
        name = product.name,
        subtitle = product.subtitle,
        price = product.formattedPrice,
        modifier = Modifier.padding(horizontal = 20.dp)
      )

      Spacer(modifier = Modifier.height(22.dp))

      // 5. Row of 4 feature icons in circular outlined containers: Breathable, Quick Dry, Light Weight, Durable
      FeatureIconsRow(
        modifier = Modifier.padding(horizontal = 20.dp)
      )

      Spacer(modifier = Modifier.height(24.dp))

      // 6. Description Section (Title + 2-3 line supporting paragraph in gray)
      DescriptionSection(
        description = product.description,
        modifier = Modifier.padding(horizontal = 20.dp)
      )

      Spacer(modifier = Modifier.height(24.dp))

      // 7. Select Size Section (5 rounded pill-shaped buttons: S, M, L, XL, XXL)
      SelectSizeSection(
        sizes = sizes,
        selectedSize = selectedSize,
        onSizeSelected = { selectedSize = it },
        modifier = Modifier.padding(horizontal = 20.dp)
      )

      Spacer(modifier = Modifier.height(16.dp))
    }

    // 8. Bottom Fixed Action Row: Quantity selector on left, Large orange Add to Cart button on right
    BottomActionRow(
      quantity = quantity,
      onDecrease = { if (quantity > 1) quantity-- },
      onIncrease = { quantity++ },
      onAddToCart = { onAddToCart(product, selectedSize, quantity) },
      modifier = Modifier
        .align(Alignment.BottomCenter)
        .testTag("details_bottom_action_row")
    )
  }
}

@Composable
private fun DetailsTopBar(
  onBackClick: () -> Unit,
  onMenuClick: () -> Unit,
  isWishlisted: Boolean,
  onToggleWishlist: () -> Unit,
  showMenu: Boolean,
  onDismissMenu: () -> Unit,
  modifier: Modifier = Modifier
) {
  Row(
    modifier = modifier
      .fillMaxWidth()
      .testTag("details_top_bar"),
    horizontalArrangement = Arrangement.SpaceBetween,
    verticalAlignment = Alignment.CenterVertically
  ) {
    // Circular back arrow button (left)
    Surface(
      modifier = Modifier
        .size(46.dp)
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
          onClick = onBackClick
        )
        .testTag("details_back_button"),
      shape = CircleShape,
      color = Color.White
    ) {
      Box(
        modifier = Modifier.fillMaxSize(),
        contentAlignment = Alignment.Center
      ) {
        Icon(
          imageVector = Icons.AutoMirrored.Rounded.ArrowBack,
          contentDescription = "Back to home",
          tint = TextPrimary,
          modifier = Modifier.size(22.dp)
        )
      }
    }

    // "Details" title (center, bold)
    Text(
      text = "Details",
      fontSize = 18.sp,
      fontWeight = FontWeight.Bold,
      color = TextPrimary,
      modifier = Modifier.testTag("details_screen_title")
    )

    // Circular three-dot menu button (right)
    Box {
      Surface(
        modifier = Modifier
          .size(46.dp)
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
            onClick = onMenuClick
          )
          .testTag("details_menu_button"),
        shape = CircleShape,
        color = Color.White
      ) {
        Box(
          modifier = Modifier.fillMaxSize(),
          contentAlignment = Alignment.Center
        ) {
          Icon(
            imageVector = Icons.Rounded.MoreVert,
            contentDescription = "More options",
            tint = TextPrimary,
            modifier = Modifier.size(22.dp)
          )
        }
      }

      DropdownMenu(
        expanded = showMenu,
        onDismissRequest = onDismissMenu
      ) {
        DropdownMenuItem(
          text = { Text(if (isWishlisted) "Remove from Wishlist" else "Save to Wishlist") },
          leadingIcon = {
            Icon(
              imageVector = if (isWishlisted) Icons.Rounded.Favorite else Icons.Rounded.FavoriteBorder,
              contentDescription = null,
              tint = if (isWishlisted) Color(0xFFFF334B) else TextPrimary
            )
          },
          onClick = {
            onToggleWishlist()
            onDismissMenu()
          }
        )
        DropdownMenuItem(
          text = { Text("Share Product") },
          onClick = onDismissMenu
        )
      }
    }
  }
}

@Composable
private fun ProductHeroImageCard(
  imageRes: Int,
  productName: String,
  modifier: Modifier = Modifier
) {
  Card(
    modifier = modifier
      .fillMaxWidth()
      .height(290.dp)
      .shadow(
        elevation = 6.dp,
        shape = RoundedCornerShape(26.dp),
        ambientColor = Color(0x12000000),
        spotColor = Color(0x1C000000)
      )
      .testTag("product_hero_image_card"),
    shape = RoundedCornerShape(26.dp),
    colors = CardDefaults.cardColors(containerColor = Color(0xFFF2F4F8))
  ) {
    Box(
      modifier = Modifier
        .fillMaxSize()
        .padding(16.dp),
      contentAlignment = Alignment.Center
    ) {
      Image(
        painter = painterResource(id = imageRes),
        contentDescription = productName,
        contentScale = ContentScale.Fit,
        modifier = Modifier
          .fillMaxSize()
          .clip(RoundedCornerShape(20.dp))
          .testTag("details_product_image")
      )
    }
  }
}

@Composable
private fun ProductTitleAndPrice(
  name: String,
  subtitle: String,
  price: String,
  modifier: Modifier = Modifier
) {
  Row(
    modifier = modifier
      .fillMaxWidth()
      .testTag("product_title_price_row"),
    horizontalArrangement = Arrangement.SpaceBetween,
    verticalAlignment = Alignment.Top
  ) {
    Column(modifier = Modifier.weight(1f)) {
      // Product Name (bold, large)
      Text(
        text = name,
        fontSize = 22.sp,
        fontWeight = FontWeight.Bold,
        color = TextPrimary,
        modifier = Modifier.testTag("details_product_name")
      )

      Spacer(modifier = Modifier.height(4.dp))

      // Small gray subtitle "Premium Quality" below the name
      Text(
        text = subtitle,
        fontSize = 13.sp,
        fontWeight = FontWeight.Medium,
        color = TextSecondary,
        modifier = Modifier.testTag("details_product_subtitle")
      )
    }

    // Price aligned right in accent orange color
    Text(
      text = price,
      fontSize = 24.sp,
      fontWeight = FontWeight.ExtraBold,
      color = OrangePrimary,
      modifier = Modifier.testTag("details_product_price")
    )
  }
}

@Composable
private fun FeatureIconsRow(
  modifier: Modifier = Modifier
) {
  val features = listOf(
    Pair("Breathable", Icons.Rounded.Air),
    Pair("Quick Dry", Icons.Rounded.WaterDrop),
    Pair("Light Weight", Icons.Rounded.Speed),
    Pair("Durable", Icons.Rounded.Security)
  )

  Row(
    modifier = modifier
      .fillMaxWidth()
      .testTag("feature_icons_row"),
    horizontalArrangement = Arrangement.SpaceBetween,
    verticalAlignment = Alignment.CenterVertically
  ) {
    features.forEach { (label, icon) ->
      FeatureItem(label = label, icon = icon)
    }
  }
}

@Composable
private fun FeatureItem(
  label: String,
  icon: ImageVector
) {
  Column(
    horizontalAlignment = Alignment.CenterHorizontally,
    modifier = Modifier.testTag("feature_item_$label")
  ) {
    // Circular outlined container
    Box(
      modifier = Modifier
        .size(54.dp)
        .clip(CircleShape)
        .background(Color.White)
        .border(1.5.dp, Color(0xFFE2E5EC), CircleShape),
      contentAlignment = Alignment.Center
    ) {
      Icon(
        imageVector = icon,
        contentDescription = label,
        tint = OrangePrimary,
        modifier = Modifier.size(24.dp)
      )
    }

    Spacer(modifier = Modifier.height(7.dp))

    // Label below container
    Text(
      text = label,
      fontSize = 11.sp,
      fontWeight = FontWeight.Medium,
      color = TextSecondary
    )
  }
}

@Composable
private fun DescriptionSection(
  description: String,
  modifier: Modifier = Modifier
) {
  Column(
    modifier = modifier
      .fillMaxWidth()
      .testTag("description_section")
  ) {
    Text(
      text = "Description",
      fontSize = 17.sp,
      fontWeight = FontWeight.Bold,
      color = TextPrimary,
      modifier = Modifier.testTag("description_title")
    )

    Spacer(modifier = Modifier.height(8.dp))

    Text(
      text = description,
      fontSize = 13.5.sp,
      lineHeight = 20.sp,
      fontWeight = FontWeight.Normal,
      color = TextSecondary,
      modifier = Modifier.testTag("description_text")
    )
  }
}

@Composable
private fun SelectSizeSection(
  sizes: List<String>,
  selectedSize: String,
  onSizeSelected: (String) -> Unit,
  modifier: Modifier = Modifier
) {
  Column(
    modifier = modifier
      .fillMaxWidth()
      .testTag("select_size_section")
  ) {
    Text(
      text = "Select Size",
      fontSize = 17.sp,
      fontWeight = FontWeight.Bold,
      color = TextPrimary,
      modifier = Modifier.testTag("select_size_title")
    )

    Spacer(modifier = Modifier.height(12.dp))

    Row(
      modifier = Modifier.fillMaxWidth(),
      horizontalArrangement = Arrangement.spacedBy(10.dp),
      verticalAlignment = Alignment.CenterVertically
    ) {
      sizes.forEach { size ->
        val isSelected = size == selectedSize

        val backgroundColor by animateColorAsState(
          targetValue = if (isSelected) OrangePrimary else SurfaceLightGray,
          animationSpec = tween(150),
          label = "size_bg"
        )

        val textColor by animateColorAsState(
          targetValue = if (isSelected) Color.White else TextPrimary,
          animationSpec = tween(150),
          label = "size_text"
        )

        Box(
          modifier = Modifier
            .weight(1f)
            .height(44.dp)
            .shadow(
              elevation = if (isSelected) 4.dp else 0.dp,
              shape = RoundedCornerShape(22.dp),
              ambientColor = Color(0x33FF6B00),
              spotColor = Color(0x40FF6B00)
            )
            .clip(RoundedCornerShape(22.dp))
            .background(backgroundColor)
            .clickable(
              interactionSource = remember { MutableInteractionSource() },
              indication = ripple(bounded = true),
              onClick = { onSizeSelected(size) }
            )
            .testTag("size_button_$size"),
          contentAlignment = Alignment.Center
        ) {
          Text(
            text = size,
            fontSize = 14.sp,
            fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium,
            color = textColor
          )
        }
      }
    }
  }
}

@Composable
private fun BottomActionRow(
  quantity: Int,
  onDecrease: () -> Unit,
  onIncrease: () -> Unit,
  onAddToCart: () -> Unit,
  modifier: Modifier = Modifier
) {
  Surface(
    modifier = modifier
      .fillMaxWidth()
      .shadow(
        elevation = 16.dp,
        ambientColor = Color(0x14000000),
        spotColor = Color(0x1F000000)
      )
      .testTag("bottom_action_surface"),
    color = Color.White,
    tonalElevation = 8.dp
  ) {
    Row(
      modifier = Modifier
        .fillMaxWidth()
        .padding(horizontal = 20.dp, vertical = 14.dp),
      horizontalArrangement = Arrangement.spacedBy(16.dp),
      verticalAlignment = Alignment.CenterVertically
    ) {
      // Quantity Selector (rounded pill with minus icon, number, plus icon)
      Row(
        modifier = Modifier
          .height(52.dp)
          .clip(RoundedCornerShape(26.dp))
          .background(SurfaceLightGray)
          .padding(horizontal = 6.dp)
          .testTag("quantity_selector"),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(8.dp)
      ) {
        // Minus icon button
        Box(
          modifier = Modifier
            .size(36.dp)
            .clip(CircleShape)
            .background(Color.White)
            .clickable(
              interactionSource = remember { MutableInteractionSource() },
              indication = ripple(bounded = true, radius = 18.dp),
              onClick = onDecrease
            )
            .testTag("quantity_minus_button"),
          contentAlignment = Alignment.Center
        ) {
          Icon(
            imageVector = Icons.Rounded.Remove,
            contentDescription = "Decrease quantity",
            tint = if (quantity > 1) TextPrimary else TextSecondary.copy(alpha = 0.4f),
            modifier = Modifier.size(18.dp)
          )
        }

        // Number
        Text(
          text = quantity.toString(),
          fontSize = 16.sp,
          fontWeight = FontWeight.Bold,
          color = TextPrimary,
          modifier = Modifier
            .padding(horizontal = 4.dp)
            .testTag("quantity_value")
        )

        // Plus icon button
        Box(
          modifier = Modifier
            .size(36.dp)
            .clip(CircleShape)
            .background(Color.White)
            .clickable(
              interactionSource = remember { MutableInteractionSource() },
              indication = ripple(bounded = true, radius = 18.dp),
              onClick = onIncrease
            )
            .testTag("quantity_plus_button"),
          contentAlignment = Alignment.Center
        ) {
          Icon(
            imageVector = Icons.Rounded.Add,
            contentDescription = "Increase quantity",
            tint = TextPrimary,
            modifier = Modifier.size(18.dp)
          )
        }
      }

      // Large rounded orange "Add to Cart" button (white bold text) taking most of the width
      Surface(
        modifier = Modifier
          .weight(1f)
          .height(52.dp)
          .shadow(
            elevation = 8.dp,
            shape = RoundedCornerShape(26.dp),
            ambientColor = Color(0x33FF6B00),
            spotColor = Color(0x4DFF6B00)
          )
          .clip(RoundedCornerShape(26.dp))
          .clickable(
            interactionSource = remember { MutableInteractionSource() },
            indication = ripple(bounded = true),
            onClick = onAddToCart
          )
          .testTag("add_to_cart_button"),
        shape = RoundedCornerShape(26.dp),
        color = OrangePrimary
      ) {
        Box(
          modifier = Modifier.fillMaxSize(),
          contentAlignment = Alignment.Center
        ) {
          Text(
            text = "Add to Cart",
            fontSize = 16.sp,
            fontWeight = FontWeight.Bold,
            color = Color.White
          )
        }
      }
    }
  }
}
