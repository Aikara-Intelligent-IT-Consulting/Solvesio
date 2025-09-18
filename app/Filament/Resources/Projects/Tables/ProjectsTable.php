<?php

namespace App\Filament\Resources\Projects\Tables;

use Filament\Support\Enums\FontWeight;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\ForceDeleteBulkAction;
use Filament\Tables\Actions\RestoreBulkAction;
use Filament\Tables\Actions\ViewAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Filters\TrashedFilter;
use Filament\Tables\Table;

class ProjectsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image')
                    ->label('Featured Image')
                    ->height(60)
                    ->width(80)
                    ->extraImgAttributes(['class' => 'rounded-lg object-cover'])
                    ->defaultImageUrl('/images/placeholder-project.png')
                    ->checkFileExistence(false),
                    
                TextColumn::make('title')
                    ->label('Project Title')
                    ->searchable()
                    ->sortable()
                    ->weight(FontWeight::SemiBold)
                    ->description(fn ($record) => $record->client_name ? "Client: {$record->client_name}" : null)
                    ->wrap(),
                    
                TextColumn::make('category.name')
                    ->label('Category')
                    ->badge()
                    ->color(fn ($record) => $record->category?->color ?? 'gray')
                    ->sortable(),
                    
                TextColumn::make('technologies')
                    ->label('Technologies')
                    ->formatStateUsing(function ($state) {
                        if (!$state || !is_array($state)) return '-';
                        return collect($state)->take(3)->implode(', ') . (count($state) > 3 ? '...' : '');
                    })
                    ->tooltip(function ($record) {
                        if (!$record->technologies || !is_array($record->technologies)) return null;
                        return implode(', ', $record->technologies);
                    })
                    ->wrap(),
                    
                TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'draft' => 'gray',
                        'published' => 'success',
                        'archived' => 'danger',
                    })
                    ->sortable(),
                    
                IconColumn::make('featured')
                    ->label('Featured')
                    ->boolean()
                    ->trueIcon('heroicon-o-star')
                    ->falseIcon('heroicon-o-star')
                    ->trueColor('warning')
                    ->falseColor('gray')
                    ->tooltip(fn ($record) => $record->featured ? 'Featured project' : 'Regular project'),
                    
                TextColumn::make('completion_date')
                    ->label('Completed')
                    ->date('M j, Y')
                    ->sortable()
                    ->toggleable(),
                    
                TextColumn::make('budget')
                    ->label('Budget')
                    ->money('USD')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                    
                TextColumn::make('project_url')
                    ->label('Live URL')
                    ->url(fn ($record) => $record->project_url)
                    ->openUrlInNewTab()
                    ->icon('heroicon-o-arrow-top-right-on-square')
                    ->iconColor('primary')
                    ->formatStateUsing(fn ($state) => $state ? 'View Live' : '-')
                    ->toggleable(),
                    
                TextColumn::make('sort_order')
                    ->label('Order')
                    ->numeric()
                    ->sortable()
                    ->alignCenter()
                    ->badge()
                    ->color('primary')
                    ->toggleable(),
                    
                TextColumn::make('created_at')
                    ->label('Created')
                    ->dateTime('M j, Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                    
                TextColumn::make('updated_at')
                    ->label('Updated')
                    ->dateTime('M j, Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('category')
                    ->label('Category')
                    ->relationship('category', 'name')
                    ->searchable()
                    ->preload(),
                    
                SelectFilter::make('status')
                    ->label('Status')
                    ->options([
                        'draft' => 'Draft',
                        'published' => 'Published',
                        'archived' => 'Archived',
                    ])
                    ->native(false),
                    
                TernaryFilter::make('featured')
                    ->label('Featured')
                    ->placeholder('All projects')
                    ->trueLabel('Featured only')
                    ->falseLabel('Regular only'),
                    
                SelectFilter::make('has_url')
                    ->label('Live URL')
                    ->options([
                        'yes' => 'Has live URL',
                        'no' => 'No live URL',
                    ])
                    ->query(function ($query, array $data) {
                        if ($data['value'] === 'yes') {
                            return $query->whereNotNull('project_url');
                        } elseif ($data['value'] === 'no') {
                            return $query->whereNull('project_url');
                        }
                        return $query;
                    }),
                
                TrashedFilter::make(),
            ])
            ->actions([
                \Filament\Actions\ViewAction::make()
                    ->iconButton()
                    ->tooltip('View project'),
                \Filament\Actions\EditAction::make()
                    ->iconButton()
                    ->tooltip('Edit project'),
            ])
            ->bulkActions([
                \Filament\Actions\BulkActionGroup::make([
                    \Filament\Actions\DeleteBulkAction::make(),
                    \Filament\Actions\ForceDeleteBulkAction::make(),
                    \Filament\Actions\RestoreBulkAction::make(),
                ]),
            ])
            ->defaultSort('sort_order', 'asc')
            ->emptyStateHeading('No projects yet')
            ->emptyStateDescription('Create your first project to showcase your portfolio.')
            ->emptyStateIcon('heroicon-o-briefcase')
            ->striped()
            ->paginated([10, 25, 50]);
    }
}