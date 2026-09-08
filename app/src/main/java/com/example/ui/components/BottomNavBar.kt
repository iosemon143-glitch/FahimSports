package com.example.ui.components

import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.ChatBubbleOutline
import androidx.compose.material.icons.rounded.Favorite
import androidx.compose.material.icons.rounded.FavoriteBorder
import androidx.compose.material.icons.rounded.Home
import androidx.compose.material.icons.rounded.MailOutline
import androidx.compose.material.icons.rounded.Public
import androidx.compose.material3.Badge
import androidx.compose.material3.BadgedBox
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
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.theme.OrangePrimary
import com.example.ui.theme.TextPrimary
import com.example.ui.theme.TextSecondary

enum class NavItem(
  val title: String,
  val tag: String
) {
  HOME("Home", "nav_home"),
  MESSAGES("Messages", "nav_messages"),
  WISHLIST("Wishlist", "nav_wishlist"),
  CHAT("Chat", "nav_chat"),
  SOCIAL("Social", "nav_social")
}

@Composable
fun FloatingBottomNavBar(
  selectedItem: NavItem,
  onItemSelected: (NavItem) -> Unit,
  wishlistCount: Int = 0,
  unreadMessagesCount: Int = 2,
  modifier: Modifier = Modifier
) {
  Surface(
    modifier = modifier
      .fillMaxWidth()
      .padding(horizontal = 20.dp, vertical = 10.dp)
      .shadow(
        elevation = 16.dp,
        shape = RoundedCornerShape(32.dp),
        ambientColor = Color(0x1A000000),
        spotColor = Color(0x24000000)
      )
      .testTag("floating_bottom_nav_bar"),
    shape = RoundedCornerShape(32.dp),
    color = Color.White,
    tonalElevation = 6.dp
  ) {
    Row(
      modifier = Modifier
        .fillMaxWidth()
        .height(64.dp)
        .padding(horizontal = 10.dp),
      horizontalArrangement = Arrangement.SpaceAround,
      verticalAlignment = Alignment.CenterVertically
    ) {
      NavItem.values().forEach { item ->
        val isSelected = item == selectedItem
        val icon = when (item) {
          NavItem.HOME -> Icons.Rounded.Home
          NavItem.MESSAGES -> Icons.Rounded.MailOutline
          NavItem.WISHLIST -> if (isSelected || wishlistCount > 0) Icons.Rounded.Favorite else Icons.Rounded.FavoriteBorder
          NavItem.CHAT -> Icons.Rounded.ChatBubbleOutline
          NavItem.SOCIAL -> Icons.Rounded.Public
        }

        val badgeCount = when (item) {
          NavItem.WISHLIST -> wishlistCount
          NavItem.MESSAGES -> unreadMessagesCount
          else -> 0
        }

        BottomNavButton(
          item = item,
          icon = icon,
          isSelected = isSelected,
          badgeCount = badgeCount,
          onClick = { onItemSelected(item) }
        )
      }
    }
  }
}

@Composable
private fun BottomNavButton(
  item: NavItem,
  icon: ImageVector,
  isSelected: Boolean,
  badgeCount: Int,
  onClick: () -> Unit
) {
  val iconColor by animateColorAsState(
    targetValue = if (isSelected) Color.White else TextSecondary,
    animationSpec = tween(durationMillis = 200),
    label = "nav_icon_color"
  )

  val backgroundColor by animateColorAsState(
    targetValue = if (isSelected) OrangePrimary else Color.Transparent,
    animationSpec = tween(durationMillis = 200),
    label = "nav_bg_color"
  )

  Box(
    modifier = Modifier
      .size(48.dp)
      .clip(CircleShape)
      .background(backgroundColor)
      .clickable(
        interactionSource = remember { MutableInteractionSource() },
        indication = ripple(bounded = true, radius = 24.dp),
        onClick = onClick
      )
      .testTag(item.tag),
    contentAlignment = Alignment.Center
  ) {
    BadgedBox(
      badge = {
        if (badgeCount > 0 && !isSelected) {
          Badge(
            containerColor = OrangePrimary,
            contentColor = Color.White,
            modifier = Modifier.testTag("${item.tag}_badge")
          ) {
            Text(
              text = if (badgeCount > 9) "9+" else badgeCount.toString(),
              fontSize = 9.sp
            )
          }
        }
      }
    ) {
      Icon(
        imageVector = icon,
        contentDescription = item.title,
        tint = iconColor,
        modifier = Modifier.size(23.dp)
      )
    }
  }
}
