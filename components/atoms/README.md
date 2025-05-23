# Atoms

Atoms zijn de basiscomponenten die niet verder kunnen worden afgebroken. Dit zijn de meest elementaire bouwstenen van je interface.

## Kenmerken van Atoms

- Eenvoudig en zelfstandig
- Geen afhankelijkheid van andere componenten
- Geen business logic
- Hoog herbruikbaar
- Gestandaardiseerd

## Voorbeelden

- Buttons
- Inputs (text, checkbox, radio, etc.)
- Labels
- Icons
- Typography elementen (headings, paragraphs)
- Loaders/Spinners

## Gebruiksrichtlijnen

1. **Naamgeving**: Neem duidelijke, beschrijvende namen op in camelCase of PascalCase
2. **Styling**: Gebruik tailwind classes voor styling, geen inline CSS
3. **Props**: Definieer duidelijke interfaces voor alle props
4. **Documentatie**: Voeg JSDoc comments toe voor complexe componenten
5. **Testen**: Zorg voor unit tests voor elke component

## Import

```tsx
import { Avatar, Button, Input } from '@/components/atoms';
```

Alle atoms exporteren via de index.ts barrel file.
