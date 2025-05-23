# Pages

Pages zijn complete pagina-componenten die templates gebruiken en invullen met specifieke content. Ze zijn het hoogste niveau in de atomic design hiërarchie.

## Kenmerken van Pages

- Combineren templates met specifieke content
- Bevatten pagina-specifieke logica
- Managen data fetching en state voor de pagina
- Directe koppeling met routes
- Niet bedoeld om herbruikbaar te zijn

## Voorbeelden

- Homepage
- Login page
- User profile page
- Product detail page
- Settings page

## Gebruiksrichtlijnen

1. **Gebruik templates**: Pages moeten een template gebruiken voor hun structuur
2. **Data fetching**: Pages zijn verantwoordelijk voor het ophalen van data
3. **State management**: Pages beheren de state voor de gehele pagina
4. **Routing**: Pages zijn direct gekoppeld aan routes
5. **Overdracht aan components**: Data en functies worden doorgegeven aan onderliggende components

## Import

```tsx
import { HomePage, LoginPage, ProfilePage } from '@/components/pages';
```

Alle pages exporteren via de index.ts barrel file.

> Opmerking: In Next.js kun je ook de App Router gebruiken, waarbij pages in de app directory worden gedefinieerd. In dat geval kan deze map worden gebruikt voor pagina-componenten die herbruikbaar zijn tussen routes.
