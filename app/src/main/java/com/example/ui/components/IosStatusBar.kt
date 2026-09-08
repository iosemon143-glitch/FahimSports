package com.example.ui.components

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.CornerRadius
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.theme.TextPrimary

@Composable
fun IosStatusBar(
  modifier: Modifier = Modifier,
  timeText: String = "9:41",
  contentColor: Color = TextPrimary,
  showDynamicIsland: Boolean = true
) {
  Box(
    modifier = modifier
      .fillMaxWidth()
      .height(44.dp)
      .padding(horizontal = 24.dp)
      .testTag("ios_status_bar"),
    contentAlignment = Alignment.Center
  ) {
    // Left: Time "9:41"
    Text(
      text = timeText,
      fontSize = 15.sp,
      fontWeight = FontWeight.SemiBold,
      color = contentColor,
      modifier = Modifier
        .align(Alignment.CenterStart)
        .testTag("status_bar_time")
    )

    // Center: Dynamic Island notch pill
    if (showDynamicIsland) {
      Box(
        modifier = Modifier
          .width(110.dp)
          .height(26.dp)
          .background(Color.Black, shape = RoundedCornerShape(13.dp))
          .align(Alignment.Center)
          .testTag("dynamic_island")
      ) {
        // Subtle camera lens & sensor hints inside dynamic island
        Row(
          modifier = Modifier
            .fillMaxWidth()
            .height(26.dp)
            .padding(horizontal = 14.dp),
          horizontalArrangement = Arrangement.End,
          verticalAlignment = Alignment.CenterVertically
        ) {
          Box(
            modifier = Modifier
              .size(9.dp)
              .background(Color(0xFF161616), shape = RoundedCornerShape(5.dp))
          )
        }
      }
    }

    // Right: Signal, Wi-Fi, and Battery
    Row(
      modifier = Modifier
        .align(Alignment.CenterEnd)
        .testTag("status_bar_icons"),
      verticalAlignment = Alignment.CenterVertically,
      horizontalArrangement = Arrangement.spacedBy(6.dp)
    ) {
      // 4-Bar Signal Indicator
      SignalIcon(color = contentColor)

      // Wi-Fi Waves
      WifiIcon(color = contentColor)

      // Battery Icon with level
      BatteryIcon(color = contentColor, chargePercent = 0.88f)
    }
  }
}

@Composable
fun SignalIcon(color: Color, modifier: Modifier = Modifier) {
  Canvas(modifier = modifier.size(width = 17.dp, height = 11.dp)) {
    val barWidth = 3.dp.toPx()
    val gap = 1.6.dp.toPx()
    val barHeights = listOf(3.5.dp.toPx(), 5.5.dp.toPx(), 8.dp.toPx(), 11.dp.toPx())

    barHeights.forEachIndexed { index, h ->
      val x = index * (barWidth + gap)
      val y = size.height - h
      drawRoundRect(
        color = color,
        topLeft = Offset(x, y),
        size = Size(barWidth, h),
        cornerRadius = CornerRadius(1.2.dp.toPx(), 1.2.dp.toPx())
      )
    }
  }
}

@Composable
fun WifiIcon(color: Color, modifier: Modifier = Modifier) {
  Canvas(modifier = modifier.size(15.dp)) {
    val strokeWidth = 1.8.dp.toPx()
    val center = Offset(size.width / 2f, size.height * 0.82f)

    // Center dot
    drawCircle(
      color = color,
      radius = 1.5.dp.toPx(),
      center = center
    )

    // Inner wave
    drawArc(
      color = color,
      startAngle = 220f,
      sweepAngle = 100f,
      useCenter = false,
      topLeft = Offset(center.x - 5.dp.toPx(), center.y - 5.dp.toPx()),
      size = Size(10.dp.toPx(), 10.dp.toPx()),
      style = Stroke(width = strokeWidth, cap = StrokeCap.Round)
    )

    // Outer wave
    drawArc(
      color = color,
      startAngle = 220f,
      sweepAngle = 100f,
      useCenter = false,
      topLeft = Offset(center.x - 9.dp.toPx(), center.y - 9.dp.toPx()),
      size = Size(18.dp.toPx(), 18.dp.toPx()),
      style = Stroke(width = strokeWidth, cap = StrokeCap.Round)
    )
  }
}

@Composable
fun BatteryIcon(color: Color, chargePercent: Float = 0.85f, modifier: Modifier = Modifier) {
  Canvas(modifier = modifier.size(width = 24.dp, height = 11.5.dp)) {
    val corner = 3.dp.toPx()
    val stroke = 1.3.dp.toPx()
    val bodyWidth = size.width - 3.5.dp.toPx()
    val bodyHeight = size.height

    // Main Battery Outer Shell
    drawRoundRect(
      color = color,
      topLeft = Offset(0f, 0f),
      size = Size(bodyWidth, bodyHeight),
      cornerRadius = CornerRadius(corner, corner),
      style = Stroke(width = stroke)
    )

    // Battery Positive Terminal Pin
    val pinHeight = 4.5.dp.toPx()
    val pinWidth = 2.dp.toPx()
    val pinY = (bodyHeight - pinHeight) / 2f
    drawRoundRect(
      color = color.copy(alpha = 0.65f),
      topLeft = Offset(bodyWidth + 1.2.dp.toPx(), pinY),
      size = Size(pinWidth, pinHeight),
      cornerRadius = CornerRadius(1.dp.toPx(), 1.dp.toPx())
    )

    // Inner Battery Fill
    val padding = 2.dp.toPx()
    val maxFillWidth = bodyWidth - (padding * 2)
    val fillWidth = maxFillWidth * chargePercent.coerceIn(0.1f, 1.0f)
    val fillHeight = bodyHeight - (padding * 2)

    drawRoundRect(
      color = color,
      topLeft = Offset(padding, padding),
      size = Size(fillWidth, fillHeight),
      cornerRadius = CornerRadius(1.5.dp.toPx(), 1.5.dp.toPx())
    )
  }
}
