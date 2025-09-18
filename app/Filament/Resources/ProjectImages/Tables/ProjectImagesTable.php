<?php

namespace App\Filament\Resources\ProjectImages\Tables;

use Filament\Support\Enums\FontWeight;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\ViewAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class ProjectImagesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image_path')
                    ->label('Preview')
                    ->height(60)
                    ->width(80)
                    ->extraImgAttributes(['class' => 'rounded-lg object-cover'])
                    ->checkFileExistence(false),
                    
                TextColumn::make('project.title')
                    ->label('Project')
                    ->searchable()
                    ->sortable()
                    ->weight(FontWeight::SemiBold)
                    ->description(fn ($record) => $record->project?->category?->name)
                    ->wrap(),
                    
                TextColumn::make('alt_text')
                    ->label('Alt Text')
                    ->searchable()
                    ->limit(40)
                    ->tooltip(function (TextColumn $column): ?string {
                        $state = $column->getState();
                        if (strlen($state) <= 40) {
                            return null;
                        }
                        return $state;
                    })
                    ->wrap()
                    ->placeholder('No alt text'),
                    
                IconColumn::make('is_primary')
                    ->label('Primary')
                    ->boolean()
                    ->trueIcon('heroicon-o-star')
                    ->falseIcon('heroicon-o-photo')
                    ->trueColor('warning')
                    ->falseColor('gray')
                    ->tooltip(fn ($record) => $record->is_primary ? 'Primary image' : 'Secondary image'),
                    
                TextColumn::make('sort_order')
                    ->label('Order')
                    ->numeric()
                    ->sortable()
                    ->alignCenter()
                    ->badge()
                    ->color('primary'),
                    
                TextColumn::make('project.status')
                    ->label('Project Status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'draft' => 'gray',
                        'published' => 'success',
                        'archived' => 'danger',
                        default => 'gray',
                    }),
                    
                TextColumn::make('created_at')
                    ->label('Uploaded')
                    ->dateTime('M j, Y H:i')
                    ->sortable()
                    ->toggleable(),
                    
                TextColumn::make('updated_at')
                    ->label('Updated')
                    ->dateTime('M j, Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('project')
                    ->label('Project')
                    ->relationship('project', 'title')
                    ->searchable()
                    ->preload(),
                    
                TernaryFilter::make('is_primary')
                    ->label('Image Type')
                    ->placeholder('All images')
                    ->trueLabel('Primary images only')
                    ->falseLabel('Secondary images only'),
                    
                SelectFilter::make('project_status')
                    ->label('Project Status')
                    ->options([
                        'draft' => 'Draft',
                        'published' => 'Published',
                        'archived' => 'Archived',
                    ])
                    ->query(function ($query, array $data) {
                        if ($data['value']) {
                            return $query->whereHas('project', function ($q) use ($data) {
                                $q->where('status', $data['value']);
                            });
                        }
                        return $query;
                    }),
            ])
            ->actions([
                \Filament\Actions\ViewAction::make()
                    ->iconButton()
                    ->tooltip('View image'),
                \Filament\Actions\EditAction::make()
                    ->iconButton()
                    ->tooltip('Edit image'),
            ])
            ->bulkActions([
                \Filament\Actions\BulkActionGroup::make([
                    \Filament\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('sort_order', 'asc')
            ->emptyStateHeading('No project images yet')
            ->emptyStateDescription('Upload your first project image to showcase your work.')
            ->emptyStateIcon('heroicon-o-photo')
            ->striped();
    }
}