import { APP_INITIALIZER, type EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

import type { IconDefinition } from '../types.js';
import { IconService } from './icon.service.js';

export function provideIcons(icons: readonly IconDefinition[]): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [IconService],
      useFactory: (svc: IconService) => () => {
        svc.register(...icons);
      },
    },
  ]);
}
