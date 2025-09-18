<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProjectImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'image_path',
        'alt_text',
        'is_primary',
        'sort_order',
    ];

    protected $casts = [
        'is_primary' => 'boolean',
        'sort_order' => 'integer',
    ];

    /**
     * Get the proper image URL - handle external URLs and local storage paths
     * 
     * This accessor supports:
     * - External URLs (http/https): Pexels, Unsplash, Pixabay, AWS S3, Cloudinary, etc.
     * - Local storage paths: Files uploaded via admin panel
     * - Data URLs: base64 encoded images
     * - CDN URLs: Any CDN service
     */
    public function getImageUrlAttribute()
    {
        if (!$this->image_path) {
            return null;
        }

        // Check if it's a data URL (base64 encoded image)
        if (str_starts_with($this->image_path, 'data:image/')) {
            return $this->image_path;
        }

        // Check if it's already a full URL (external image)
        if (filter_var($this->image_path, FILTER_VALIDATE_URL)) {
            return $this->image_path;
        }

        // Check if it starts with // (protocol-relative URL)
        if (str_starts_with($this->image_path, '//')) {
            return 'https:' . $this->image_path;
        }

        // Check if it's a relative URL starting with /
        if (str_starts_with($this->image_path, '/') && !str_starts_with($this->image_path, '//')) {
            return url($this->image_path);
        }

        // If none of the above, treat as local storage path
        return asset('storage/' . $this->image_path);
    }

    /**
     * Check if the image is an external URL
     */
    public function getIsExternalImageAttribute(): bool
    {
        if (!$this->image_path) {
            return false;
        }

        return filter_var($this->image_path, FILTER_VALIDATE_URL) || 
               str_starts_with($this->image_path, '//') ||
               str_starts_with($this->image_path, 'data:image/');
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }
}