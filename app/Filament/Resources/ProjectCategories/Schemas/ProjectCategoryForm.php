<?php

namespace App\Filament\Resources\ProjectCategories\Schemas;

use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class ProjectCategoryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                \Filament\Schemas\Components\Section::make('Category Information')
                    ->description('Manage your project category details')
                    ->icon('heroicon-o-tag')
                    ->components([
                        \Filament\Schemas\Components\Grid::make(2)
                            ->components([
                                TextInput::make('name')
                                    ->label('Category Name')
                                    ->required()
                                    ->maxLength(255)
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(function (string $context, $state, callable $set) {
                                        if ($context === 'create') {
                                            $set('slug', Str::slug($state));
                                        }
                                    })
                                    ->placeholder('Enter category name'),
                                    
                                TextInput::make('slug')
                                    ->label('URL Slug')
                                    ->required()
                                    ->maxLength(255)
                                    ->unique(ignoreRecord: true)
                                    ->alphaDash()
                                    ->placeholder('auto-generated-slug'),
                            ]),
                            
                        Textarea::make('description')
                            ->label('Description')
                            ->maxLength(65535)
                            ->rows(3)
                            ->placeholder('Brief description of this category')
                            ->columnSpanFull(),
                    ]),
                    
                \Filament\Schemas\Components\Section::make('Display Settings')
                    ->description('Configure how this category appears')
                    ->icon('heroicon-o-paint-brush')
                    ->components([
                        \Filament\Schemas\Components\Grid::make(3)
                            ->components([
                                ColorPicker::make('color')
                                    ->label('Theme Color')
                                    ->default('#3B82F6')
                                    ->hex()
                                    ->rgba()
                                    ->hsl(),
                                    
                                TextInput::make('sort_order')
                                    ->label('Sort Order')
                                    ->numeric()
                                    ->default(0)
                                    ->minValue(0)
                                    ->step(1)
                                    ->helperText('Lower numbers appear first'),
                                    
                                Toggle::make('is_active')
                                    ->label('Active')
                                    ->default(true)
                                    ->inline(false)
                                    ->helperText('Toggle category visibility'),
                            ]),
                    ]),
            ]);
    }
}