<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\ProjectCategory;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $categories = ProjectCategory::all();
        
        $projects = [
            // Web Development Projects
            [
                'title' => 'E-Learning Platform',
                'description' => 'A comprehensive online learning platform with video streaming, interactive quizzes, progress tracking, and certification system. Built with modern web technologies to provide seamless learning experience.',
                'category_id' => $categories->where('slug', 'web-development')->first()->id,
                'image' => 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=800',
                'technologies' => ['React', 'Laravel', 'MySQL', 'Tailwind CSS', 'Redis'],
                'client_name' => 'EduTech Solutions',
                'project_url' => 'https://example-elearning.com',
                'completion_date' => Carbon::now()->subMonths(2),
                'budget' => 15000.00,
                'status' => 'published',
                'featured' => true,
                'sort_order' => 1,
            ],
            [
                'title' => 'Corporate Website',
                'description' => 'Professional corporate website with content management system, blog functionality, contact forms, and responsive design. Optimized for search engines and performance.',
                'category_id' => $categories->where('slug', 'web-development')->first()->id,
                'image' => 'https://images.pexels.com/photos/326508/pexels-photo-326508.jpeg?auto=compress&cs=tinysrgb&w=800',
                'technologies' => ['WordPress', 'PHP', 'MySQL', 'Bootstrap', 'jQuery'],
                'client_name' => 'Global Corp Inc.',
                'project_url' => 'https://example-corporate.com',
                'completion_date' => Carbon::now()->subMonths(1),
                'budget' => 8000.00,
                'status' => 'published',
                'featured' => false,
                'sort_order' => 2,
            ],
            [
                'title' => 'Real Estate Portal',
                'description' => 'Advanced real estate platform with property listings, search filters, virtual tours, mortgage calculator, and agent management system.',
                'category_id' => $categories->where('slug', 'web-development')->first()->id,
                'image' => 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800',
                'technologies' => ['Vue.js', 'Laravel', 'PostgreSQL', 'Nuxt.js', 'Mapbox'],
                'client_name' => 'Property Masters',
                'project_url' => 'https://example-realestate.com',
                'completion_date' => Carbon::now()->subMonths(3),
                'budget' => 20000.00,
                'status' => 'published',
                'featured' => true,
                'sort_order' => 3,
            ],

            // Mobile Development Projects
            [
                'title' => 'Food Delivery App',
                'description' => 'Cross-platform mobile application for food delivery with real-time tracking, payment integration, ratings system, and push notifications.',
                'category_id' => $categories->where('slug', 'mobile-development')->first()->id,
                'image' => 'https://images.pexels.com/photos/4393668/pexels-photo-4393668.jpeg?auto=compress&cs=tinysrgb&w=800',
                'technologies' => ['React Native', 'Node.js', 'MongoDB', 'Socket.io', 'Stripe'],
                'client_name' => 'QuickEats',
                'project_url' => 'https://play.google.com/store/apps/details?id=com.quickeats',
                'completion_date' => Carbon::now()->subMonth(),
                'budget' => 25000.00,
                'status' => 'published',
                'featured' => true,
                'sort_order' => 4,
            ],
            [
                'title' => 'Fitness Tracker',
                'description' => 'Native iOS and Android fitness tracking application with workout plans, progress monitoring, social features, and wearable device integration.',
                'category_id' => $categories->where('slug', 'mobile-development')->first()->id,
                'image' => 'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=800',
                'technologies' => ['Flutter', 'Firebase', 'Dart', 'HealthKit', 'Google Fit'],
                'client_name' => 'FitLife Inc.',
                'project_url' => 'https://apps.apple.com/us/app/fitlife-tracker',
                'completion_date' => Carbon::now()->subMonths(2),
                'budget' => 18000.00,
                'status' => 'published',
                'featured' => false,
                'sort_order' => 5,
            ],

            // E-Commerce Projects
            [
                'title' => 'Fashion Store',
                'description' => 'Modern e-commerce platform for fashion retail with inventory management, multiple payment gateways, wishlist, reviews, and admin dashboard.',
                'category_id' => $categories->where('slug', 'e-commerce')->first()->id,
                'image' => 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=800',
                'technologies' => ['Shopify', 'Liquid', 'JavaScript', 'SCSS', 'PayPal'],
                'client_name' => 'StyleHub Fashion',
                'project_url' => 'https://example-fashion.com',
                'completion_date' => Carbon::now()->subMonths(4),
                'budget' => 12000.00,
                'status' => 'published',
                'featured' => true,
                'sort_order' => 6,
            ],
            [
                'title' => 'Electronics Store',
                'description' => 'Comprehensive e-commerce solution for electronics retail with product comparison, technical specifications, warranty tracking, and customer support.',
                'category_id' => $categories->where('slug', 'e-commerce')->first()->id,
                'image' => 'https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg?auto=compress&cs=tinysrgb&w=800',
                'technologies' => ['WooCommerce', 'WordPress', 'PHP', 'MySQL', 'Stripe'],
                'client_name' => 'TechMart',
                'project_url' => 'https://example-electronics.com',
                'completion_date' => Carbon::now()->subMonths(3),
                'budget' => 16000.00,
                'status' => 'published',
                'featured' => false,
                'sort_order' => 7,
            ],

            // CMS & Admin Panels
            [
                'title' => 'Hospital Management System',
                'description' => 'Complete hospital management system with patient records, appointment scheduling, billing, inventory management, and staff management.',
                'category_id' => $categories->where('slug', 'cms-admin-panels')->first()->id,
                'image' => 'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=800',
                'technologies' => ['Laravel', 'Vue.js', 'MySQL', 'Bootstrap', 'Chart.js'],
                'client_name' => 'City General Hospital',
                'project_url' => null,
                'completion_date' => Carbon::now()->subMonths(6),
                'budget' => 30000.00,
                'status' => 'published',
                'featured' => true,
                'sort_order' => 8,
            ],
            [
                'title' => 'School Management Portal',
                'description' => 'Comprehensive school management system with student information, gradebook, attendance tracking, parent portal, and financial management.',
                'category_id' => $categories->where('slug', 'cms-admin-panels')->first()->id,
                'image' => 'https://images.pexels.com/photos/289740/pexels-photo-289740.jpeg?auto=compress&cs=tinysrgb&w=800',
                'technologies' => ['Django', 'Python', 'PostgreSQL', 'React', 'Material-UI'],
                'client_name' => 'Greenwood Academy',
                'project_url' => null,
                'completion_date' => Carbon::now()->subMonths(5),
                'budget' => 22000.00,
                'status' => 'published',
                'featured' => false,
                'sort_order' => 9,
            ],

            // API Development
            [
                'title' => 'Payment Gateway API',
                'description' => 'Secure and scalable payment processing API with multiple payment methods, fraud detection, webhooks, and comprehensive documentation.',
                'category_id' => $categories->where('slug', 'api-development')->first()->id,
                'image' => 'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=800',
                'technologies' => ['Node.js', 'Express', 'MongoDB', 'Redis', 'JWT'],
                'client_name' => 'PaySecure Solutions',
                'project_url' => 'https://api.paysecure.com/docs',
                'completion_date' => Carbon::now()->subMonths(4),
                'budget' => 35000.00,
                'status' => 'published',
                'featured' => true,
                'sort_order' => 10,
            ],

            // UI/UX Design
            [
                'title' => 'Banking App Redesign',
                'description' => 'Complete UI/UX redesign of mobile banking application focusing on user experience, accessibility, and modern design principles.',
                'category_id' => $categories->where('slug', 'ui-ux-design')->first()->id,
                'image' => 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=800',
                'technologies' => ['Figma', 'Adobe XD', 'Principle', 'InVision', 'Sketch'],
                'client_name' => 'SecureBank',
                'project_url' => 'https://figma.com/securebank-redesign',
                'completion_date' => Carbon::now()->subMonths(2),
                'budget' => 10000.00,
                'status' => 'published',
                'featured' => false,
                'sort_order' => 11,
            ],
            [
                'title' => 'SaaS Dashboard Design',
                'description' => 'Modern and intuitive dashboard design for SaaS application with data visualization, responsive layout, and dark mode support.',
                'category_id' => $categories->where('slug', 'ui-ux-design')->first()->id,
                'image' => 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800',
                'technologies' => ['Figma', 'Adobe Creative Suite', 'Zeplin', 'Marvel', 'Miro'],
                'client_name' => 'DataFlow Analytics',
                'project_url' => 'https://figma.com/dataflow-dashboard',
                'completion_date' => Carbon::now()->subMonth(),
                'budget' => 8500.00,
                'status' => 'published',
                'featured' => true,
                'sort_order' => 12,
            ],
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }
    }
}