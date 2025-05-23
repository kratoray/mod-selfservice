# Templates

Templates zijn pagina-level componenten die de structuur en layout definiëren. Ze bevatten geen specifieke content, maar wel placeholders voor organisms en molecules.

## Kenmerken van Templates

- Definiëren de overall structuur van een pagina
- Bevatten layout-logica (grids, flexbox, etc.)
- Zijn verantwoordelijk voor responsiveness
- Bevatten geen specifieke content of business logic
- Herbruikbaar voor meerdere pagina's

## Voorbeelden

- Dashboard template
- Landing page template
- Detail page template
- Admin panel template
- Authentication page template

## Gebruiksrichtlijnen

1. **Focus op layout**: Templates moeten zich concentreren op layout en structuur
2. **Geen API calls**: Geen directe data fetching in templates
3. **Responsiveness**: Zorg voor responsieve layouts voor verschillende schermgroottes
4. **Placeholders**: Gebruik props om content in te vullen
5. **Herbruikbaarheid**: Maak templates herbruikbaar voor verschillende pagina's

## Import

```tsx
import { DashboardTemplate, DetailPageTemplate } from '@/components/templates';
```

Alle templates exporteren via de index.ts barrel file.
