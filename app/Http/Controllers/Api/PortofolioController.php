<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ProjectCategory;
use Illuminate\Http\Request;

class PortofolioController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::with(['category', 'images'])
            ->where('status', 'published');

        // Filter by category if provided
        if ($request->has('category') && $request->category !== 'all') {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        // Get featured projects only if requested
        if ($request->boolean('featured')) {
            $query->where('featured', true);
        }

        $projects = $query->orderBy('sort_order')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'data' => $projects->map(function ($project) {
                return [
                    'id' => $project->id,
                    'title' => $project->title,
                    'description' => strip_tags($project->description),
                    'category' => $project->category->name,
                    'category_slug' => $project->category->slug,
                    'category_color' => $project->category->color,
                    'image' => $project->image_url, // Menggunakan accessor
                    'project_url' => $project->project_url,
                    'technologies' => $project->technologies ?? [],
                    'featured' => $project->featured,
                    'completion_date' => $project->completion_date?->format('Y-m-d'),
                    'client_name' => $project->client_name,
                    'images' => $project->images->map(function ($image) {
                        return [
                            'id' => $image->id,
                            'url' => $image->image_url, // Menggunakan accessor
                            'alt_text' => $image->alt_text,
                            'is_primary' => $image->is_primary,
                        ];
                    }),
                ];
            }),
        ]);
    }

    public function categories()
    {
        $categories = ProjectCategory::where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        return response()->json([
            'data' => $categories->map(function ($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'slug' => $category->slug,
                    'color' => $category->color,
                    'projects_count' => $category->activeProjects()->count(),
                ];
            }),
        ]);
    }

    public function show($id)
    {
        $project = Project::with(['category', 'images'])
            ->where('status', 'published')
            ->findOrFail($id);

        return response()->json([
            'data' => [
                'id' => $project->id,
                'title' => $project->title,
                'description' => $project->description,
                'category' => $project->category->name,
                'category_color' => $project->category->color,
                'image' => $project->image_url, // Menggunakan accessor
                'project_url' => $project->project_url,
                'technologies' => $project->technologies ?? [],
                'featured' => $project->featured,
                'completion_date' => $project->completion_date?->format('F j, Y'),
                'client_name' => $project->client_name,
                'budget' => $project->budget,
                'images' => $project->images->orderBy('sort_order')->map(function ($image) {
                    return [
                        'id' => $image->id,
                        'url' => $image->image_url, // Menggunakan accessor
                        'alt_text' => $image->alt_text,
                        'is_primary' => $image->is_primary,
                    ];
                }),
            ],
        ]);
    }
}