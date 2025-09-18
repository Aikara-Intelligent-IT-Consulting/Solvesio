<?php

namespace App\Filament\Resources\Projects\Schemas;

use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;



class ProjectForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                \Filament\Schemas\Components\Section::make('Project Information')
                    ->description('Basic information about your project')
                    ->icon('heroicon-o-information-circle')
                    ->components([
                        TextInput::make('title')
                            ->label('Project Title')
                            ->required()
                            ->maxLength(255)
                            ->placeholder('Enter project title')
                            ->columnSpanFull(),
                            
                        RichEditor::make('description')
                            ->label('Project Description')
                            ->required()
                            ->maxLength(65535)
                            ->placeholder('Describe your project in detail...')
                            ->toolbarButtons([
                                'bold',
                                'italic',
                                'underline',
                                'strike',
                                'link',
                                'bulletList',
                                'orderedList',
                                'h2',
                                'h3',
                                'blockquote',
                                'codeBlock',
                            ])
                            ->columnSpanFull(),
                            
                        \Filament\Schemas\Components\Grid::make(2)
                            ->components([
                                Select::make('category_id')
                                    ->label('Project Category')
                                    ->relationship('category', 'name')
                                    ->required()
                                    ->searchable()
                                    ->preload()
                                    ->createOptionForm([
                                        TextInput::make('name')
                                            ->required()
                                            ->maxLength(255),
                                        TextInput::make('slug')
                                            ->required(),
                                        ColorPicker::make('color')
                                            ->default('#3B82F6'),
                                    ])
                                    ->placeholder('Select category'),
                                    
                                Select::make('status')
                                    ->label('Project Status')
                                    ->options([
                                        'draft' => 'Draft',
                                        'published' => 'Published',
                                        'archived' => 'Archived',
                                    ])
                                    ->default('draft')
                                    ->required()
                                    ->native(false),
                            ]),
                    ]),
                    
                \Filament\Schemas\Components\Section::make('Project Media')
                    ->description('Upload project images and media files')
                    ->icon('heroicon-o-photo')
                    ->components([
                        FileUpload::make('image')
                            ->label('Featured Image')
                            ->image()
                            ->directory('projects')
                            ->imageEditor()
                            ->imageEditorMode(2)
                            ->imageCropAspectRatio('16:9')
                            ->imageResizeTargetWidth('1200')
                            ->imageResizeTargetHeight('675')
                            ->maxSize(5120)
                            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                            ->downloadable()
                            ->previewable()
                            ->columnSpanFull()
                            ->helperText('Recommended size: 1200x675px. Max size: 5MB'),
                    ]),
                    
                \Filament\Schemas\Components\Section::make('Project Details')
                    ->description('Additional project information and metadata')
                    ->icon('heroicon-o-cog-6-tooth')
                    ->columns(2)
                    ->components([
                        TagsInput::make('technologies')
                            ->label('Technologies Used')
                            ->placeholder('Add technologies (e.g., React, Laravel, MySQL)')
                            ->suggestions([
                                'React', 'Vue.js', 'Angular', 'Laravel', 'Django', 'Express.js',
                                'MySQL', 'PostgreSQL', 'MongoDB', 'Redis',
                                'HTML', 'CSS', 'JavaScript', 'TypeScript', 'PHP', 'Python',
                                'Tailwind CSS', 'Bootstrap', 'Figma', 'WordPress'
                            ])
                            ->columnSpanFull(),
                            
                        TextInput::make('client_name')
                            ->label('Client Name')
                            ->maxLength(255)
                            ->placeholder('Enter client or company name'),
                            
                        TextInput::make('project_url')
                            ->label('Project URL')
                            ->url()
                            ->maxLength(255)
                            ->placeholder('https://example.com')
                            ->suffixIcon('heroicon-o-link'),
                            
                        DatePicker::make('completion_date')
                            ->label('Completion Date')
                            ->native(false)
                            ->displayFormat('F j, Y'),
                        
                        TextInput::make('budget')
                            ->label('Project Budget')
                            ->numeric()
                            ->prefix('$')
                            ->placeholder('0.00')
                            ->inputMode('decimal'),
                    ]),
                    
                \Filament\Schemas\Components\Section::make('Display Settings')
                    ->description('Configure how this project appears on your portfolio')
                    ->icon('heroicon-o-eye')
                    ->columns(3)
                    ->components([
                        Toggle::make('featured')
                            ->label('Featured Project')
                            ->default(false)
                            ->inline(false)
                            ->helperText('Highlight this project on homepage'),
                            
                        TextInput::make('sort_order')
                            ->label('Display Order')
                            ->numeric()
                            ->default(0)
                            ->minValue(0)
                            ->step(1)
                            ->helperText('Lower numbers appear first'),
                            
                        Toggle::make('show_on_homepage')
                            ->label('Show on Homepage')
                            ->default(true)
                            ->inline(false)
                            ->helperText('Display in portfolio grid'),
                    ]),
            ]);
    }
}