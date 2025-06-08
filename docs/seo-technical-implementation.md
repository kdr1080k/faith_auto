# FlexCar SEO技术实施指南
*Django + React + Tailwind CSS技术栈*

## 🏗️ 技术架构SEO优化

### 1. Django后端SEO配置

#### 1.1 Django SEO应用创建

```python
# apps/seo/models.py
from django.db import models
from django.urls import reverse
from django.utils.text import slugify

class SEOMetadata(models.Model):
    """SEO元数据模型"""
    page_type = models.CharField(max_length=50, choices=[
        ('homepage', '首页'),
        ('car_detail', '车辆详情'),
        ('location', '位置页面'),
        ('blog', '博客文章'),
        ('category', '分类页面'),
    ])
    page_identifier = models.CharField(max_length=255, blank=True)  # 页面唯一标识
    
    # Meta标签
    title = models.CharField(max_length=60, help_text="页面标题 (建议50-60字符)")
    meta_description = models.TextField(max_length=160, help_text="页面描述 (建议150-160字符)")
    meta_keywords = models.CharField(max_length=255, blank=True)
    
    # Open Graph
    og_title = models.CharField(max_length=60, blank=True)
    og_description = models.TextField(max_length=160, blank=True)
    og_image = models.ImageField(upload_to='seo/og_images/', blank=True)
    og_type = models.CharField(max_length=20, default='website')
    
    # Twitter Card
    twitter_title = models.CharField(max_length=60, blank=True)
    twitter_description = models.TextField(max_length=160, blank=True)
    twitter_image = models.ImageField(upload_to='seo/twitter_images/', blank=True)
    
    # 结构化数据
    schema_markup = models.JSONField(blank=True, null=True)
    
    # SEO设置
    canonical_url = models.URLField(blank=True)
    robots_meta = models.CharField(max_length=100, default='index,follow')
    priority = models.FloatField(default=0.5, help_text="网站地图优先级 (0.0-1.0)")
    change_frequency = models.CharField(max_length=20, choices=[
        ('always', '总是'),
        ('hourly', '每小时'),
        ('daily', '每天'),
        ('weekly', '每周'),
        ('monthly', '每月'),
        ('yearly', '每年'),
        ('never', '从不'),
    ], default='weekly')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ['page_type', 'page_identifier']
        verbose_name = 'SEO元数据'
        verbose_name_plural = 'SEO元数据'
    
    def __str__(self):
        return f"{self.get_page_type_display()} - {self.title}"

class KeywordTracking(models.Model):
    """关键词跟踪模型"""
    keyword = models.CharField(max_length=255)
    target_url = models.URLField()
    current_rank = models.IntegerField(null=True, blank=True)
    previous_rank = models.IntegerField(null=True, blank=True)
    search_volume = models.IntegerField(null=True, blank=True)
    difficulty = models.IntegerField(null=True, blank=True)
    last_checked = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = '关键词跟踪'
        verbose_name_plural = '关键词跟踪'

class RedirectRule(models.Model):
    """重定向规则模型"""
    old_url = models.CharField(max_length=500, unique=True)
    new_url = models.CharField(max_length=500)
    redirect_type = models.IntegerField(choices=[
        (301, '永久重定向 (301)'),
        (302, '临时重定向 (302)'),
    ], default=301)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = '重定向规则'
        verbose_name_plural = '重定向规则'
```

#### 1.2 SEO中间件

```python
# apps/seo/middleware.py
from django.http import HttpResponsePermanentRedirect, HttpResponseRedirect
from django.shortcuts import redirect
from .models import RedirectRule

class SEOMiddleware:
    """SEO中间件"""
    
    def __init__(self, get_response):
        self.get_response = get_response
    
    def __call__(self, request):
        # 处理重定向
        response = self.process_redirects(request)
        if response:
            return response
        
        response = self.get_response(request)
        
        # 添加安全头
        response = self.add_security_headers(response)
        
        return response
    
    def process_redirects(self, request):
        """处理URL重定向"""
        try:
            redirect_rule = RedirectRule.objects.get(
                old_url=request.path,
                is_active=True
            )
            if redirect_rule.redirect_type == 301:
                return HttpResponsePermanentRedirect(redirect_rule.new_url)
            else:
                return HttpResponseRedirect(redirect_rule.new_url)
        except RedirectRule.DoesNotExist:
            pass
        
        # 处理尾部斜杠
        if not request.path.endswith('/') and request.path != '/':
            return HttpResponsePermanentRedirect(request.path + '/')
        
        return None
    
    def add_security_headers(self, response):
        """添加安全头"""
        response['X-Content-Type-Options'] = 'nosniff'
        response['X-Frame-Options'] = 'DENY'
        response['X-XSS-Protection'] = '1; mode=block'
        response['Referrer-Policy'] = 'strict-origin-when-cross-origin'
        return response
```

#### 1.3 SEO视图和模板标签

```python
# apps/seo/templatetags/seo_tags.py
from django import template
from django.utils.safestring import mark_safe
from django.conf import settings
import json

register = template.Library()

@register.inclusion_tag('seo/meta_tags.html', takes_context=True)
def render_seo_meta(context, page_type=None, page_id=None):
    """渲染SEO meta标签"""
    request = context['request']
    
    # 获取SEO元数据
    seo_data = get_seo_metadata(page_type, page_id)
    
    # 构建完整URL
    current_url = request.build_absolute_uri()
    
    return {
        'seo_data': seo_data,
        'current_url': current_url,
        'request': request,
    }

@register.simple_tag
def structured_data(schema_data):
    """输出结构化数据"""
    if schema_data:
        return mark_safe(f'<script type="application/ld+json">{json.dumps(schema_data, ensure_ascii=False)}</script>')
    return ''

def get_seo_metadata(page_type, page_id):
    """获取SEO元数据"""
    from .models import SEOMetadata
    
    try:
        return SEOMetadata.objects.get(
            page_type=page_type,
            page_identifier=page_id or ''
        )
    except SEOMetadata.DoesNotExist:
        # 返回默认SEO数据
        return {
            'title': 'FlexCar - 澳大利亚领先的汽车订阅服务',
            'meta_description': 'FlexCar提供灵活的汽车订阅服务，无需首付，包含保险维护。',
            'robots_meta': 'index,follow',
        }
```

```html
<!-- templates/seo/meta_tags.html -->
{% load static %}

<!-- 基础Meta标签 -->
<title>{{ seo_data.title|default:"FlexCar - 澳大利亚领先的汽车订阅服务" }}</title>
<meta name="description" content="{{ seo_data.meta_description|default:"FlexCar提供灵活的汽车订阅服务，无需首付，包含保险维护。" }}">
<meta name="robots" content="{{ seo_data.robots_meta|default:"index,follow" }}">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Canonical URL -->
<link rel="canonical" href="{{ seo_data.canonical_url|default:current_url }}">

<!-- Open Graph -->
<meta property="og:title" content="{{ seo_data.og_title|default:seo_data.title }}">
<meta property="og:description" content="{{ seo_data.og_description|default:seo_data.meta_description }}">
<meta property="og:type" content="{{ seo_data.og_type|default:"website" }}">
<meta property="og:url" content="{{ current_url }}">
<meta property="og:site_name" content="FlexCar">
{% if seo_data.og_image %}
<meta property="og:image" content="{{ request.scheme }}://{{ request.get_host }}{{ seo_data.og_image.url }}">
{% else %}
<meta property="og:image" content="{{ request.scheme }}://{{ request.get_host }}{% static 'images/flexcar-og-default.jpg' %}">
{% endif %}

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{{ seo_data.twitter_title|default:seo_data.title }}">
<meta name="twitter:description" content="{{ seo_data.twitter_description|default:seo_data.meta_description }}">
{% if seo_data.twitter_image %}
<meta name="twitter:image" content="{{ request.scheme }}://{{ request.get_host }}{{ seo_data.twitter_image.url }}">
{% else %}
<meta name="twitter:image" content="{{ request.scheme }}://{{ request.get_host }}{% static 'images/flexcar-twitter-default.jpg' %}">
{% endif %}

<!-- 结构化数据 -->
{% if seo_data.schema_markup %}
    {% structured_data seo_data.schema_markup %}
{% endif %}
```

#### 1.4 网站地图生成

```python
# apps/seo/sitemaps.py
from django.contrib.sitemaps import Sitemap
from django.urls import reverse
from apps.cars.models import Car
from apps.blog.models import BlogPost
from apps.locations.models import Location

class StaticViewSitemap(Sitemap):
    """静态页面网站地图"""
    priority = 0.8
    changefreq = 'weekly'
    
    def items(self):
        return ['home', 'browse_cars', 'about', 'contact', 'faq']
    
    def location(self, item):
        return reverse(item)

class CarSitemap(Sitemap):
    """车辆页面网站地图"""
    changefreq = 'daily'
    priority = 0.7
    
    def items(self):
        return Car.objects.filter(is_active=True)
    
    def lastmod(self, obj):
        return obj.updated_at
    
    def location(self, obj):
        return reverse('car_detail', kwargs={'slug': obj.slug})

class LocationSitemap(Sitemap):
    """位置页面网站地图"""
    changefreq = 'monthly'
    priority = 0.6
    
    def items(self):
        return Location.objects.filter(is_active=True)
    
    def location(self, obj):
        return reverse('location_detail', kwargs={'slug': obj.slug})

class BlogSitemap(Sitemap):
    """博客文章网站地图"""
    changefreq = 'weekly'
    priority = 0.5
    
    def items(self):
        return BlogPost.objects.filter(is_published=True)
    
    def lastmod(self, obj):
        return obj.updated_at
    
    def location(self, obj):
        return reverse('blog_detail', kwargs={'slug': obj.slug})

# urls.py
from django.contrib.sitemaps.views import sitemap
from apps.seo.sitemaps import StaticViewSitemap, CarSitemap, LocationSitemap, BlogSitemap

sitemaps = {
    'static': StaticViewSitemap,
    'cars': CarSitemap,
    'locations': LocationSitemap,
    'blog': BlogSitemap,
}

urlpatterns = [
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),
]
```

### 2. React前端SEO优化

#### 2.1 服务端渲染 (SSR) 配置

```javascript
// next.config.js (如果使用Next.js)
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['flexcar.com.au'],
    formats: ['image/webp', 'image/avif'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/old-path',
        destination: '/new-path',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
```

#### 2.2 SEO组件

```typescript
// components/SEO/SEOHead.tsx
import Head from 'next/head'
import { useRouter } from 'next/router'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
  ogType?: string
  twitterCard?: string
  canonical?: string
  noindex?: boolean
  structuredData?: object
}

export const SEOHead: React.FC<SEOProps> = ({
  title = 'FlexCar - 澳大利亚领先的汽车订阅服务',
  description = 'FlexCar提供灵活的汽车订阅服务，无需首付，包含保险维护。在悉尼、墨尔本等城市享受便捷用车体验。',
  keywords = '汽车订阅,车辆租赁,悉尼租车,墨尔本租车,灵活用车',
  ogImage = '/images/flexcar-og-default.jpg',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  canonical,
  noindex = false,
  structuredData,
}) => {
  const router = useRouter()
  const currentUrl = `https://flexcar.com.au${router.asPath}`
  const canonicalUrl = canonical || currentUrl

  return (
    <Head>
      {/* 基础Meta标签 */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="FlexCar" />
      <meta property="og:image" content={`https://flexcar.com.au${ogImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`https://flexcar.com.au${ogImage}`} />
      
      {/* 结构化数据 */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
  )
}
```

#### 2.3 结构化数据组件

```typescript
// components/SEO/StructuredData.tsx
export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "FlexCar",
  "url": "https://flexcar.com.au",
  "logo": "https://flexcar.com.au/images/logo.png",
  "description": "澳大利亚领先的汽车订阅服务提供商",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "AU",
    "addressRegion": "NSW",
    "addressLocality": "Sydney"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+61-x-xxxx-xxxx",
    "contactType": "customer service",
    "availableLanguage": ["English", "Chinese"]
  },
  "sameAs": [
    "https://www.facebook.com/flexcar",
    "https://www.instagram.com/flexcar",
    "https://www.linkedin.com/company/flexcar"
  ]
})

export const generateCarSchema = (car: Car) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": `${car.make} ${car.model} ${car.year}`,
  "description": car.description,
  "image": car.images.map(img => `https://flexcar.com.au${img.url}`),
  "brand": {
    "@type": "Brand",
    "name": car.make
  },
  "model": car.model,
  "vehicleModelDate": car.year.toString(),
  "offers": {
    "@type": "Offer",
    "price": car.weekly_price.toString(),
    "priceCurrency": "AUD",
    "availability": "https://schema.org/InStock",
    "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  },
  "aggregateRating": car.rating ? {
    "@type": "AggregateRating",
    "ratingValue": car.rating.toString(),
    "reviewCount": car.review_count.toString()
  } : undefined
})

export const generateLocalBusinessSchema = (location: Location) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": `FlexCar ${location.city}`,
  "description": `FlexCar汽车订阅服务 - ${location.city}`,
  "url": `https://flexcar.com.au/locations/${location.slug}`,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": location.address,
    "addressLocality": location.city,
    "addressRegion": location.state,
    "postalCode": location.postcode,
    "addressCountry": "AU"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": location.latitude,
    "longitude": location.longitude
  },
  "openingHours": "Mo-Su 00:00-23:59",
  "telephone": "+61-x-xxxx-xxxx",
  "priceRange": "$$"
})

export const generateFAQSchema = (faqs: FAQ[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
})
```

### 3. 性能优化

#### 3.1 图片优化

```typescript
// components/OptimizedImage.tsx
import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  className?: string
  sizes?: string
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
}) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoadingComplete={() => setIsLoading(false)}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  )
}
```

#### 3.2 懒加载组件

```typescript
// components/LazyLoad.tsx
import { useEffect, useRef, useState } from 'react'

interface LazyLoadProps {
  children: React.ReactNode
  threshold?: number
  rootMargin?: string
  fallback?: React.ReactNode
}

export const LazyLoad: React.FC<LazyLoadProps> = ({
  children,
  threshold = 0.1,
  rootMargin = '50px',
  fallback = <div className="h-32 bg-gray-200 animate-pulse" />,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return (
    <div ref={ref}>
      {isVisible ? children : fallback}
    </div>
  )
}
```

### 4. 监控和分析

#### 4.1 Google Analytics 4集成

```typescript
// lib/analytics.ts
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// 转化事件跟踪
export const trackEnquiryStart = () => {
  event({
    action: 'enquiry_start',
    category: 'engagement',
    label: 'enquiry_form',
  })
}

export const trackEnquiryComplete = () => {
  event({
    action: 'enquiry_complete',
    category: 'conversion',
    label: 'enquiry_form',
  })
}

export const trackCarView = (carId: string, carName: string) => {
  event({
    action: 'view_item',
    category: 'ecommerce',
    label: carName,
  })
}
```

#### 4.2 Core Web Vitals监控

```typescript
// lib/web-vitals.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

function sendToAnalytics(metric: any) {
  // 发送到Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    })
  }
  
  // 发送到自定义分析端点
  fetch('/api/analytics/web-vitals', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(metric),
  }).catch(console.error)
}

export function reportWebVitals() {
  getCLS(sendToAnalytics)
  getFID(sendToAnalytics)
  getFCP(sendToAnalytics)
  getLCP(sendToAnalytics)
  getTTFB(sendToAnalytics)
}
```

### 5. 部署和配置

#### 5.1 Nginx配置

```nginx
# /etc/nginx/sites-available/flexcar
server {
    listen 80;
    server_name flexcar.com.au www.flexcar.com.au;
    return 301 https://flexcar.com.au$request_uri;
}

server {
    listen 443 ssl http2;
    server_name www.flexcar.com.au;
    return 301 https://flexcar.com.au$request_uri;
    
    ssl_certificate /path/to/ssl/cert.pem;
    ssl_certificate_key /path/to/ssl/private.key;
}

server {
    listen 443 ssl http2;
    server_name flexcar.com.au;
    
    ssl_certificate /path/to/ssl/cert.pem;
    ssl_certificate_key /path/to/ssl/private.key;
    
    # SSL配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;
    
    # 安全头
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline';" always;
    
    # Gzip压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    # 缓存配置
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # robots.txt
    location = /robots.txt {
        alias /var/www/flexcar/static/robots.txt;
    }
    
    # sitemap.xml
    location = /sitemap.xml {
        proxy_pass http://127.0.0.1:8000;
    }
    
    # 静态文件
    location /static/ {
        alias /var/www/flexcar/static/;
    }
    
    location /media/ {
        alias /var/www/flexcar/media/;
    }
    
    # Django应用
    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### 5.2 Django设置

```python
# settings/production.py
import os

# SEO设置
ALLOWED_HOSTS = ['flexcar.com.au', 'www.flexcar.com.au']
SECURE_SSL_REDIRECT = True
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True
X_FRAME_OPTIONS = 'DENY'

# 缓存配置
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/1',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        }
    }
}

# 静态文件
STATIC_URL = '/static/'
STATIC_ROOT = '/var/www/flexcar/static/'
MEDIA_URL = '/media/'
MEDIA_ROOT = '/var/www/flexcar/media/'

# 中间件
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.middleware.cache.UpdateCacheMiddleware',
    'apps.seo.middleware.SEOMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.cache.FetchFromCacheMiddleware',
]

# 数据库优化
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DB_NAME'),
        'USER': os.environ.get('DB_USER'),
        'PASSWORD': os.environ.get('DB_PASSWORD'),
        'HOST': os.environ.get('DB_HOST'),
        'PORT': os.environ.get('DB_PORT'),
        'OPTIONS': {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
        },
    }
}
```

### 6. 监控脚本

```python
# management/commands/seo_monitor.py
from django.core.management.base import BaseCommand
from django.core.mail import send_mail
import requests
from bs4 import BeautifulSoup

class Command(BaseCommand):
    help = 'Monitor SEO metrics'
    
    def handle(self, *args, **options):
        self.check_page_speed()
        self.check_meta_tags()
        self.check_broken_links()
        self.check_sitemap()
    
    def check_page_speed(self):
        """检查页面速度"""
        urls = [
            'https://flexcar.com.au/',
            'https://flexcar.com.au/browse-cars/',
        ]
        
        for url in urls:
            # 使用PageSpeed Insights API
            api_url = f"https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url={url}&strategy=mobile"
            response = requests.get(api_url)
            data = response.json()
            
            score = data['lighthouseResult']['categories']['performance']['score'] * 100
            
            if score < 85:
                send_mail(
                    'SEO Alert: Low Page Speed',
                    f'Page speed for {url} is {score}',
                    'noreply@flexcar.com.au',
                    ['seo@flexcar.com.au'],
                )
    
    def check_meta_tags(self):
        """检查Meta标签"""
        urls = [
            'https://flexcar.com.au/',
            'https://flexcar.com.au/browse-cars/',
        ]
        
        for url in urls:
            response = requests.get(url)
            soup = BeautifulSoup(response.content, 'html.parser')
            
            title = soup.find('title')
            description = soup.find('meta', attrs={'name': 'description'})
            
            issues = []
            
            if not title or len(title.text) > 60:
                issues.append('Title tag missing or too long')
            
            if not description or len(description.get('content', '')) > 160:
                issues.append('Meta description missing or too long')
            
            if issues:
                send_mail(
                    'SEO Alert: Meta Tag Issues',
                    f'Issues found for {url}: {", ".join(issues)}',
                    'noreply@flexcar.com.au',
                    ['seo@flexcar.com.au'],
                )
```

这个技术实施指南提供了完整的Django + React技术栈SEO优化方案，包括：

1. **Django后端SEO配置** - SEO模型、中间件、模板标签
2. **React前端SEO优化** - SSR配置、SEO组件、结构化数据
3. **性能优化** - 图片优化、懒加载、缓存策略
4. **监控和分析** - Google Analytics、Core Web Vitals
5. **部署配置** - Nginx、Django设置
6. **自动化监控** - SEO指标监控脚本

这些技术实施将帮助FlexCar网站在搜索引擎中获得更好的排名和可见性。 