package com.example.model

import androidx.annotation.DrawableRes
import androidx.compose.ui.graphics.vector.ImageVector
import com.example.R

data class Product(
  val id: String,
  val name: String,
  val subtitle: String = "Premium Quality",
  val price: Double,
  val formattedPrice: String,
  val discountPrice: String? = null,
  val categoryId: String,
  @DrawableRes val imageRes: Int,
  val rating: Float = 4.9f,
  val reviewCount: Int = 128,
  val description: String,
  val features: List<ProductFeature> = defaultFeatures
)

data class ProductFeature(
  val title: String,
  val description: String,
  val iconName: String
)

val defaultFeatures = listOf(
  ProductFeature(title = "Breathable", description = "Micro-mesh airflow", iconName = "air"),
  ProductFeature(title = "Quick Dry", description = "Moisture wicking", iconName = "water"),
  ProductFeature(title = "Light Weight", description = "Aerodynamic cut", iconName = "feather"),
  ProductFeature(title = "Durable", description = "Reinforced stitch", iconName = "shield")
)

data class ProductCategory(
  val id: String,
  val name: String,
  val iconName: String
)

val sampleCategories = listOf(
  ProductCategory(id = "all", name = "All", iconName = "all"),
  ProductCategory(id = "jersey", name = "Jersey", iconName = "jersey"),
  ProductCategory(id = "trouser", name = "Trouser", iconName = "trouser"),
  ProductCategory(id = "football", name = "Football", iconName = "football"),
  ProductCategory(id = "cricket", name = "Cricket", iconName = "cricket"),
  ProductCategory(id = "shoes", name = "Shoes", iconName = "shoes"),
  ProductCategory(id = "accessories", name = "Accessories", iconName = "accessories")
)

val sampleProducts = listOf(
  Product(
    id = "prod_jersey",
    name = "Football Jersey",
    subtitle = "Premium Quality",
    price = 65.00,
    formattedPrice = "$65.00",
    discountPrice = "$85.00",
    categoryId = "jersey",
    imageRes = R.drawable.img_football_jersey,
    rating = 4.9f,
    reviewCount = 248,
    description = "Engineered with ultra-breathable moisture-wicking fabric to keep you cool and dry during intense performance. Ergonomic athletic fit with four-way stretch seams for unrestricted mobility."
  ),
  Product(
    id = "prod_shoes",
    name = "Football Shoes",
    subtitle = "Elite Grip Edition",
    price = 120.00,
    formattedPrice = "$120.00",
    discountPrice = "$149.00",
    categoryId = "shoes",
    imageRes = R.drawable.img_football_shoes,
    rating = 4.8f,
    reviewCount = 184,
    description = "Designed for explosive acceleration and agile ball control on firm ground surfaces. Features lightweight synthetic upper with micro-textured strike zones and responsive conical studs."
  ),
  Product(
    id = "prod_bat",
    name = "Cricket Bat",
    subtitle = "English Willow Pro",
    price = 150.00,
    formattedPrice = "$150.00",
    discountPrice = "$190.00",
    categoryId = "cricket",
    imageRes = R.drawable.img_cricket_bat,
    rating = 5.0f,
    reviewCount = 92,
    description = "Handcrafted from grade-1 English willow with an expansive mid-to-low sweet spot and balanced pickup. Complete with ergonomic multi-piece cane handle and anti-slip chevron rubber grip."
  )
)
