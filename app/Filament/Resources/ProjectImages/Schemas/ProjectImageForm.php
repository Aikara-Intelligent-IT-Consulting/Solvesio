<?php

namespace App\Filament\Resources\ProjectImages\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ProjectImageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                \Filament\Schemas\Components\Section::make('Project Selection')
                    ->description('Select the project for this image')
                    ->icon('heroicon-o-briefcase')
                    ->components([
                        Select::make('project_id')
                            ->label('Project')
                            ->relationship('project', 'title')
                            ->required()
                            ->searchable()
                            ->preload()
                            ->getOptionLabelFromRecordUsing(fn ($record) => "{$record->title} ({$record->category->name})")
                            ->placeholder('Select a project')
                            ->columnSpanFull(),
                    ]),
                    
                \Filament\Schemas\Components\Section::make('Image Upload')
                    ->description('Upload and configure the project image')
                    ->icon('heroicon-o-photo')
                    ->components([
                        FileUpload::make('image_path')
                            ->label('Project Image')
                            ->image()
                            ->directory('project-images')
                            ->required()
                            ->imageEditor()
                            ->imageEditorMode(2)
                            ->imageCropAspectRatio('16:9')
                            ->imageResizeTargetWidth('1920')
                            ->imageResizeTargetHeight('1080')
                            ->maxSize(5120) // 5MB
                            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                            ->downloadable()
                            ->previewable()
                            ->columnSpanFull()
                            ->helperText('Recommended size: 1920x1080px. Max size: 5MB. Formats: JPG, PNG, WebP'),
                    ]),
                    
                \Filament\Schemas\Components\Section::make('Image Details')
                    ->description('Configure image properties and settings')
                    ->icon('heroicon-o-cog-6-tooth')
                    ->components([
                        Textarea::make('alt_text')
                            ->label('Alt Text')
                            ->maxLength(255)
                            ->rows(2)
                            ->placeholder('Describe the image for accessibility')
                            ->helperText('Important for SEO and accessibility')
                            ->columnSpanFull(),
                            
                        \Filament\Schemas\Components\Grid::make(2)
                            ->components([
                                Toggle::make('is_primary')
                                    ->label('Primary Image')
                                    ->default(false)
                                    ->inline(false)
                                    ->helperText('This will be the main image for the project'),
                                    
                                TextInput::make('sort_order')
                                    ->label('Display Order')
                                    ->numeric()
                                    ->default(0)
                                    ->minValue(0)
                                    ->step(1)
                                    ->helperText('Lower numbers appear first'),
                            ]),
                    ]),
            ]);
    }
}