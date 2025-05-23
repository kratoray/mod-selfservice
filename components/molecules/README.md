# Molecules

Molecules zijn eenvoudige combinaties van atoms die samen een functionele eenheid vormen. Ze zijn complexer dan atoms, maar nog steeds relatief eenvoudig en hebben een enkelvoudige functie.

## Kenmerken van Molecules

- Combinaties van meerdere atoms
- Enkelvoudige, specifieke functionaliteit
- Beperkte business logic
- Herbruikbaar in verschillende contexten
- Relatief onafhankelijk van de data-structuur

## Voorbeelden

- Form fields (label + input + error message)
- Cards (container + titel + content)
- Search bars (input + button)
- Navigation items (link + icon)
- Alerts (icon + message + close button)

## Gebruiksrichtlijnen

1. **Samenstelling**: Gebruik atoms als bouwstenen, vermijd het direct gebruiken van HTML-elementen
2. **Verantwoordelijkheid**: Houd molecules verantwoordelijk voor één specifieke functie
3. **State**: Kan locale state bevatten voor eenvoudige interacties
4. **Props**: Definieer duidelijke interfaces voor alle props in types.ts
5. **Loose coupling**: Houd molecules onafhankelijk van specifieke data-structuren

## Import

```tsx
import { Card, Dialog, SearchField } from '@/components/molecules';
```

Alle molecules exporteren via de index.ts barrel file.
