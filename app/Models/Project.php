<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'description',
        'category_id',
        'image',
        'technologies',
        'client_name',
        'project_url',
        'completion_date',
        'budget',
        'status',
        'featured',
        'sort_order'
    ];

    protected $casts = [
        'technologies' => 'array',
        'completion_date' => 'date',
        'budget' => 'decimal:2',
        'featured' => 'boolean',
        'sort_order' => 'integer'
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
        if (!$this->image) {
            return $this->getDefaultImageUrl();
        }

        // Check if it's a data URL (base64 encoded image)
        if (str_starts_with($this->image, 'data:image/')) {
            return $this->image;
        }

        // Check if it's already a full URL (external image)
        // This covers: http://, https://, ftp://, etc.
        if (filter_var($this->image, FILTER_VALIDATE_URL)) {
            return $this->image;
        }

        // Check if it starts with // (protocol-relative URL)
        if (str_starts_with($this->image, '//')) {
            return 'https:' . $this->image;
        }

        // Check if it's a relative URL starting with /
        if (str_starts_with($this->image, '/') && !str_starts_with($this->image, '//')) {
            return url($this->image);
        }

        // If none of the above, treat as local storage path
        return asset('storage/' . $this->image);
    }

    /**
     * Get default placeholder image URL
     */
    private function getDefaultImageUrl(): string
    {
        // You can change this to any default image service or local placeholder
        return 'https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800';
    }

    /**
     * Check if the image is an external URL
     */
    public function getIsExternalImageAttribute(): bool
    {
        if (!$this->image) {
            return false;
        }

        return filter_var($this->image, FILTER_VALIDATE_URL) || 
               str_starts_with($this->image, '//') ||
               str_starts_with($this->image, 'data:image/');
    }

    /**
     * Get image source type for debugging/display purposes
     */
    public function getImageSourceTypeAttribute(): string
    {
        if (!$this->image) {
            return 'default';
        }

        if (str_starts_with($this->image, 'data:image/')) {
            return 'base64';
        }

        if (filter_var($this->image, FILTER_VALIDATE_URL)) {
            $host = parse_url($this->image, PHP_URL_HOST);
            
            // Detect common image services
            if (str_contains($host, 'pexels.com')) return 'pexels';
            if (str_contains($host, 'unsplash.com')) return 'unsplash';
            if (str_contains($host, 'pixabay.com')) return 'pixabay';
            if (str_contains($host, 'amazonaws.com')) return 'aws-s3';
            if (str_contains($host, 'cloudinary.com')) return 'cloudinary';
            if (str_contains($host, 'imgur.com')) return 'imgur';
            if (str_contains($host, 'github.com') || str_contains($host, 'githubusercontent.com')) return 'github';
            
            return 'external';
        }

        if (str_starts_with($this->image, '//')) {
            return 'protocol-relative';
        }

        if (str_starts_with($this->image, '/')) {
            return 'absolute-path';
        }

        return 'local-storage';
    }

    /**
     * Get the category that owns the project
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(ProjectCategory::class);
    }

    /**
     * Get all images for this project
     */
    public function images(): HasMany
    {
        return $this->hasMany(ProjectImage::class);
    }

    /**
     * Get the primary image for this project
     */
    public function primaryImage()
    {
        return $this->hasOne(ProjectImage::class)->where('is_primary', true);
    }

    /**
     * Scope to get only published projects
     */
    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    /**
     * Scope to get only featured projects
     */
    public function scopeFeatured($query)
    {
        return $query->where('featured', true);
    }

    /**
     * Scope to order by sort_order
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order');
    }

    /**
     * Scope to filter by category
     */
    public function scopeByCategory($query, $categoryId)
    {
        return $query->where('category_id', $categoryId);
    }
}