<?php

namespace App\Filament\Resources\ProjectCategories\Tables;

use Filament\Support\Enums\FontWeight;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\ViewAction;
use Filament\Tables\Columns\ColorColumn;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class ProjectCategoriesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Category')
                    ->searchable()
                    ->sortable()
                    ->weight(FontWeight::SemiBold)
                    ->description(fn ($record) => $record->slug),
                    
                TextColumn::make('description')
                    ->label('Description')
                    ->limit(50)
                    ->tooltip(function (TextColumn $column): ?string {
                        $state = $column->getState();
                        if (strlen($state) <= 50) {
                            return null;
                        }
                        return $state;
                    })
                    ->wrap(),
                    
                ColorColumn::make('color')
                    ->label('Color')
                    ->tooltip('Theme color'),
                    
                TextColumn::make('projects_count')
                    ->counts('projects')
                    ->label('Projects')
                    ->badge()
                    ->color('primary'),
                    
                TextColumn::make('sort_order')
                    ->label('Order')
                    ->numeric()
                    ->sortable()
                    ->alignCenter(),
                    
                IconColumn::make('is_active')
                    ->label('Status')
                    ->boolean()
                    ->trueIcon('heroicon-o-check-circle')
                    ->falseIcon('heroicon-o-x-circle')
                    ->trueColor('success')
                    ->falseColor('danger'),
                    
                TextColumn::make('created_at')
                    ->label('Created')
                    ->dateTime('M j, Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                    
                TextColumn::make('updated_at')
                    ->label('Updated')
                    ->dateTime('M j, Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                TernaryFilter::make('is_active')
                    ->label('Status')
                    ->placeholder('All categories')
                    ->trueLabel('Active only')
                    ->falseLabel('Inactive only'),
                    
                SelectFilter::make('has_projects')
                    ->label('Has Projects')
                    ->options([
                        'yes' => 'With Projects',
                        'no' => 'Without Projects',
                    ])
                    ->query(function ($query, array $data) {
                        if ($data['value'] === 'yes') {
                            return $query->has('projects');
                        } elseif ($data['value'] === 'no') {
                            return $query->doesntHave('projects');
                        }
                        return $query;
                    }),
            ])
            ->actions([
                \Filament\Actions\ViewAction::make()
                    ->iconButton(),
                \Filament\Actions\EditAction::make()
                    ->iconButton(),
            ])
            ->bulkActions([
                \Filament\Actions\BulkActionGroup::make([
                    \Filament\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('sort_order', 'asc')
            ->emptyStateHeading('No categories yet')
            ->emptyStateDescription('Create your first project category to get started.')
            ->emptyStateIcon('heroicon-o-tag');
    }
}