<p align="center">
    <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="200" alt="Laravel Logo">
    <h1 align="center">Solvesio</h1>
</p>

<p align="center">
    <em>Modern Digital Agency Portfolio & Business Website</em>
</p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Solvesio

Solvesio is a modern, responsive digital agency portfolio website built with Laravel and React. It features a comprehensive portfolio management system, dynamic content management, and a beautiful user interface designed to showcase digital services and projects.

### Key Features

- 🎨 **Modern UI/UX Design** - Clean, responsive design with smooth animations
- 📱 **Mobile-First Approach** - Fully responsive across all devices
- 🚀 **Dynamic Portfolio** - Dynamic project showcase with category filtering
- 🔧 **Admin Panel** - Comprehensive content management system
- 🎯 **SEO Optimized** - Built with SEO best practices
- 📊 **Analytics Ready** - Google Analytics integration ready
- 🌐 **Multi-language Ready** - Prepared for internationalization
- 🔒 **Secure** - Built with Laravel security features

### Tech Stack

**Backend:**
- Laravel 10+
- MySQL/PostgreSQL
- PHP 8.2+
- Laravel Sanctum (API Authentication)

**Frontend:**
- React 18+
- TypeScript
- Tailwind CSS
- Vite
- React Router
- Lucide React (Icons)

**Development Tools:**
- Node.js 18+
- NPM/Yarn
- Git

## Screenshots

![Homepage](docs/screenshots/homepage.png)
![Portfolio](docs/screenshots/portfolio.png)
![Services](docs/screenshots/services.png)

## Installation & Setup

### Prerequisites

Make sure you have the following installed on your system:

- **PHP 8.2 or higher**
- **Composer**
- **Node.js 18+ and NPM**
- **MySQL/PostgreSQL**
- **Git**

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/solvesio.git
cd solvesio
```

### Step 2: Install PHP Dependencies

```bash
composer install
```

### Step 3: Environment Configuration

```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

### Step 4: Database Configuration

Edit your `.env` file with your database credentials:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=solvesio
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

### Step 5: Database Setup

```bash
# Run migrations
php artisan migrate

# Seed the database with sample data
php artisan db:seed
```

### Step 6: Storage Setup

```bash
# Create storage link for file uploads
php artisan storage:link
```

### Step 7: Install Node Dependencies

```bash
# Install frontend dependencies
npm install
```

### Step 8: Build Frontend Assets

```bash
# For development
npm run dev

# For production
npm run build
```

### Step 9: Start the Development Server

```bash
# Start Laravel development server
php artisan serve

# In another terminal, start Vite dev server (for hot reload)
npm run dev
```

Your application will be available at `http://127.0.0.1:8000`

## Development Workflow

### Running in Development Mode

```bash
# Terminal 1: Start Laravel server
php artisan serve

# Terminal 2: Start Vite dev server (hot reload)
npm run dev
```

### Building for Production

```bash
# Build optimized assets
npm run build

# Optimize Laravel
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## Project Structure

```
solvesio/
├── app/
│   ├── Http/Controllers/Api/     # API Controllers
│   ├── Models/                   # Eloquent Models
│   └── ...
├── database/
│   ├── migrations/               # Database migrations
│   ├── seeders/                  # Database seeders
│   └── ...
├── resources/
│   ├── js/
│   │   └── solvesio-frontend/    # React frontend app
│   │       ├── src/
│   │       │   ├── components/   # React components
│   │       │   ├── pages/        # Page components
│   │       │   └── ...
│   │       └── ...
│   └── views/                    # Laravel Blade views
├── routes/
│   ├── api.php                   # API routes
│   ├── web.php                   # Web routes
│   └── ...
└── public/                       # Public assets
```

## API Endpoints

### Portfolio API

```
GET  /api/portfolio/projects      # Get all projects
GET  /api/portfolio/projects/{id} # Get single project
GET  /api/portfolio/categories    # Get all categories
```

#### Query Parameters for Projects:

- `category` - Filter by category slug (e.g., `web-development`)
- `featured` - Show only featured projects (`true`/`false`)

#### Example API Responses:

**Projects:**
```json
{
  "data": [
    {
      "id": 1,
      "title": "E-Learning Platform",
      "description": "A comprehensive online learning platform...",
      "category": "Web Development",
      "category_slug": "web-development",
      "category_color": "#3B82F6",
      "image": "https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg",
      "project_url": "https://example-elearning.com",
      "technologies": ["React", "Laravel", "MySQL"],
      "featured": true,
      "client_name": "EduTech Solutions",
      "completion_date": "2024-07-18"
    }
  ]
}
```

## Database Structure

### Main Tables

- `projects` - Portfolio projects
- `project_categories` - Project categories
- `project_images` - Additional project images

### Sample Data

The project comes with comprehensive seeders that populate:

- **6 Project Categories** (Web Development, Mobile Development, E-Commerce, etc.)
- **12+ Sample Projects** with realistic data
- **Multiple Images** per project from Pexels

## Configuration

### Image Handling

The project supports multiple image sources:

- **External URLs** (Pexels, Unsplash, AWS S3, Cloudinary, etc.)
- **Local Storage** (uploaded via admin panel)
- **Base64 Data URLs**
- **CDN URLs**

### Environment Variables

Key environment variables to configure:

```env
APP_NAME=Solvesio
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=solvesio

# Mail (for contact forms)
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
```

## Deployment

### Production Deployment

1. **Server Requirements:**
   - PHP 8.2+
   - MySQL/PostgreSQL
   - Node.js 18+
   - Web server (Apache/Nginx)

2. **Deployment Steps:**

```bash
# Pull latest code
git pull origin main

# Install dependencies
composer install --optimize-autoloader --no-dev
npm ci

# Build assets
npm run build

# Optimize Laravel
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run migrations
php artisan migrate --force

# Set permissions
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache
```

### Environment Setup for Production

```bash
# Generate application key
php artisan key:generate

# Create storage link
php artisan storage:link

# Clear caches
php artisan cache:clear
php artisan config:clear
```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow PSR-12 coding standards for PHP
- Use TypeScript for React components
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## Testing

```bash
# Run PHP tests
php artisan test

# Run with coverage
php artisan test --coverage

# Run specific test
php artisan test --filter=PortfolioTest
```

## Troubleshooting

### Common Issues

**1. Permission Issues:**
```bash
sudo chown -R $USER:www-data storage
sudo chmod -R 775 storage bootstrap/cache
```

**2. Asset Build Issues:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**3. Database Connection Issues:**
- Check your `.env` database credentials
- Ensure your database server is running
- Verify database exists

**4. Storage Link Issues:**
```bash
rm public/storage
php artisan storage:link
```

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Support

For support, please open an issue on GitHub or contact us at [support@solvesio.com](mailto:support@solvesio.com).

## Changelog

### v1.0.0 (2024-09-18)
- Initial release
- Portfolio management system
- React frontend with TypeScript
- Dynamic image handling
- Responsive design
- Admin panel ready

---

**Built with ❤️ using Laravel and React**