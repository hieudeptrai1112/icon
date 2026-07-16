import { APP_INITIALIZER, type EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

import { type IconDefinition } from '@hieultra/icon';
import { IconService } from './icon.service';

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
