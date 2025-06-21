# BaseTemplate Builder - Modern Blogger Template

Template Blogger modern dan responsif dengan desain yang bersih dan fitur-fitur canggih.

## 📋 Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Instalasi](#instalasi)
- [Struktur File](#struktur-file)
- [Kustomisasi](#kustomisasi)
- [Browser Support](#browser-support)
- [Dokumentasi](#dokumentasi)

## ✨ Fitur Utama

### 🎨 Desain & UI
- **Modern & Clean Design** - Desain minimalis dan profesional
- **Fully Responsive** - Optimal di semua perangkat (desktop, tablet, mobile)
- **Dark/Light Mode** - Toggle tema dengan penyimpanan preferensi
- **Smooth Animations** - Animasi halus dan transisi yang menarik
- **Typography** - Font system yang optimal untuk keterbacaan

### 🚀 Performa & SEO
- **Fast Loading** - Optimasi performa dengan lazy loading
- **SEO Optimized** - Meta tags, Open Graph, Twitter Cards
- **Schema.org Markup** - Structured data untuk search engines
- **Mobile-First** - Pendekatan mobile-first dalam development

### 📱 Responsivitas
- **Mobile Menu** - Hamburger menu untuk perangkat mobile
- **Flexible Grid** - Layout grid yang adaptif
- **Touch-Friendly** - Interface yang ramah sentuhan
- **Print Styles** - Optimasi untuk pencetakan

### 🛠️ Fungsionalitas
- **Search Function** - Pencarian artikel terintegrasi
- **Social Media Integration** - Tombol share media sosial
- **Reading Progress** - Progress bar membaca artikel
- **Back to Top** - Tombol kembali ke atas
- **Lazy Loading** - Pemuatan gambar yang efisien

## 📦 Instalasi

### Opsi 1: Template dengan File Terpisah (Recommended)

1. **Upload File CSS dan JS**
   ```bash
   # Upload file ke hosting atau CDN
   - style.css
   - script.js
   ```

2. **Update Link di Template**
   ```xml
   <!-- Ganti URL dengan lokasi file Anda -->
   <link href='https://your-domain.com/style.css' rel='stylesheet'/>
   <script src='https://your-domain.com/script.js' defer='defer'/>
   ```

3. **Install Template**
   - Buka Blogger Dashboard
   - Pergi ke Theme > Backup/Restore
   - Upload `BaseTemplate-Builder-External.xml`

### Opsi 2: Template All-in-One

1. **Install Template**
   - Upload `BaseTemplate Builder.xml` langsung ke Blogger
   - Semua CSS dan JS sudah terintegrasi

## 📁 Struktur File

```
BaseTemplate-Builder/
├── BaseTemplate Builder.xml          # Template all-in-one
├── BaseTemplate-Builder-External.xml # Template dengan file terpisah
├── style.css                        # File CSS terpisah
├── script.js                        # File JavaScript terpisah
├── template-test.html               # File testing desktop
├── mobile-test.html                 # File testing mobile
└── README.md                        # Dokumentasi
```

## 🎨 Kustomisasi

### CSS Variables

Template menggunakan CSS custom properties untuk kemudahan kustomisasi:

```css
:root {
  /* Colors */
  --primary-color: #2563eb;
  --secondary-color: #64748b;
  --accent-color: #f59e0b;
  
  /* Background Colors */
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --bg-tertiary: #e2e8f0;
  
  /* Text Colors */
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --text-muted: #94a3b8;
  
  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
}
```

### Mengubah Warna Tema

```css
/* Contoh kustomisasi warna */
:root {
  --primary-color: #7c3aed;    /* Ungu */
  --accent-color: #06b6d4;     /* Cyan */
}
```

### Mengubah Font

```css
:root {
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

## 🌐 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 60+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📖 Dokumentasi

### JavaScript API

Template menyediakan API JavaScript untuk interaksi:

```javascript
// Toggle tema
BaseTemplate.toggleTheme();

// Toggle mobile menu
BaseTemplate.toggleMobileMenu();

// Scroll ke atas
BaseTemplate.scrollToTop();

// Share ke media sosial
BaseTemplate.shareOnFacebook(url, title);
BaseTemplate.shareOnTwitter(url, title);
BaseTemplate.shareOnWhatsApp(url, title);
```

### Event Listeners

```javascript
// Listen untuk perubahan tema
document.addEventListener('themeChanged', function(e) {
  console.log('Theme changed to:', e.detail.theme);
});
```

### Widget Blogger yang Didukung

- ✅ Blog Posts
- ✅ Profile
- ✅ Search
- ✅ Labels
- ✅ Popular Posts
- ✅ Archive
- ✅ HTML/JavaScript

## 🔧 Troubleshooting

### CSS/JS Tidak Termuat

1. **Periksa URL file**
   - Pastikan URL CSS dan JS dapat diakses
   - Test dengan membuka URL langsung di browser

2. **CORS Issues**
   - Gunakan CDN yang mendukung CORS
   - Atau host file di domain yang sama

3. **Cache Issues**
   - Clear cache browser
   - Tambahkan version parameter: `style.css?v=1.0`

### Mobile Menu Tidak Berfungsi

1. **Periksa JavaScript**
   - Pastikan script.js termuat dengan benar
   - Check console untuk error

2. **Viewport Meta Tag**
   - Pastikan meta viewport sudah benar

### Dark Mode Tidak Tersimpan

1. **Local Storage**
   - Pastikan browser mendukung localStorage
   - Check privacy settings browser

## 📝 Changelog

### Version 1.0
- ✅ Initial release
- ✅ Responsive design
- ✅ Dark/Light mode
- ✅ SEO optimization
- ✅ Mobile menu
- ✅ Search functionality
- ✅ Social media integration

## 🤝 Contributing

Kontribusi sangat diterima! Silakan:

1. Fork repository
2. Buat feature branch
3. Commit perubahan
4. Push ke branch
5. Buat Pull Request

## 📄 License

Template ini gratis untuk digunakan untuk proyek personal dan komersial.

## 🙏 Credits

- **Icons**: Emoji Unicode
- **Fonts**: System fonts
- **Inspiration**: Modern web design trends

## 📞 Support

Jika Anda memiliki pertanyaan atau butuh bantuan:

- 📧 Email: support@example.com
- 💬 Issues: Buat issue di repository
- 📖 Documentation: Baca dokumentasi lengkap

---

**BaseTemplate Builder** - Template Blogger Modern untuk Era Digital 🚀
