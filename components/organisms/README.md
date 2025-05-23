# Organisms

Organisms zijn complexe UI-componenten die bestaan uit een combinatie van molecules en atoms. Ze vormen een specifiek, volledig functioneel onderdeel van de gebruikersinterface.

## Kenmerken van Organisms

- Complexe componenten bestaande uit molecules en atoms
- Bevatten significante business logic
- Kunnen interactie met externe services/APIs hebben
- Vaak specifiek voor een bepaald domein of functionaliteit
- Kunnen een eigen state management hebben

## Voorbeelden

- Navigation bars
- Forms met validatie en submit-functionaliteit
- Tabellen met data en interactieve elementen
- Dashboards met meerdere widgets
- User profiles met meerdere secties
- Zoekinterfaces met filters en resultatenweergave

## Gebruiksrichtlijnen

1. **Samenstelling**: Bouw organisms op uit molecules en atoms, niet uit directe HTML-elementen
2. **Verantwoordelijkheid**: Organisms voeren een specifieke taak uit binnen de applicatie
3. **State management**: Kan complexe state bevatten, eventueel met hooks of context
4. **Data handling**: Interactie met APIs of andere data bronnen
5. **Documentatie**: Documenteer de werking en props duidelijk
6. **Testen**: Test functionaliteit inclusief state veranderingen

## Import

```tsx
import { DataTable, NavigationBar, UserProfile } from '@/components/organisms';
```

Alle organisms exporteren via de index.ts barrel file.
