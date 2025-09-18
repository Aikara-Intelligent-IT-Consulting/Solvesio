<?php

namespace App\Filament\Resources\ProjectImages;

use App\Filament\Resources\ProjectImages\Pages\CreateProjectImage;
use App\Filament\Resources\ProjectImages\Pages\EditProjectImage;
use App\Filament\Resources\ProjectImages\Pages\ListProjectImages;
use App\Filament\Resources\ProjectImages\Schemas\ProjectImageForm;
use App\Filament\Resources\ProjectImages\Tables\ProjectImagesTable;
use App\Models\ProjectImage;
use BackedEnum;
use Filament\Resources\Resource;
use UnitEnum;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ProjectImageResource extends Resource
{
    protected static ?string $model = ProjectImage::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-photo';

    protected static string|UnitEnum|null $navigationGroup = 'Portfolio Management';
    protected static ?int $navigationSort = 3;

    protected static ?string $recordTitleAttribute = 'alt_text';

    protected static ?string $modelLabel = 'Project Image';

    protected static ?string $pluralModelLabel = 'Project Images';

    public static function form(Schema $schema): Schema
    {
        return ProjectImageForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ProjectImagesTable::configure($table);
    }

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::count();
    }

    public static function getNavigationBadgeColor(): string|array|null
    {
        return static::getModel()::count() > 10 ? 'warning' : 'primary';
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListProjectImages::route('/'),
            'create' => CreateProjectImage::route('/create'),
            'edit' => EditProjectImage::route('/{record}/edit'),
        ];
    }
}