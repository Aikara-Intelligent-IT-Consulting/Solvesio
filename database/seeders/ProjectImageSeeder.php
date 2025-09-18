<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\ProjectImage;
use Illuminate\Database\Seeder;

class ProjectImageSeeder extends Seeder
{
    public function run(): void
    {
        $projects = Project::all();

        $additionalImages = [
            'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800',
        ];

        foreach ($projects as $project) {
            // Primary image (same as project main image)
            ProjectImage::create([
                'project_id' => $project->id,
                'image_path' => $project->image,
                'alt_text' => $project->title . ' - Main Image',
                'is_primary' => true,
                'sort_order' => 1,
            ]);

            // Add 2-3 additional images for each project
            $numAdditionalImages = rand(2, 3);
            for ($i = 0; $i < $numAdditionalImages; $i++) {
                ProjectImage::create([
                    'project_id' => $project->id,
                    'image_path' => $additionalImages[array_rand($additionalImages)],
                    'alt_text' => $project->title . ' - Screenshot ' . ($i + 2),
                    'is_primary' => false,
                    'sort_order' => $i + 2,
                ]);
            }
        }
    }
}