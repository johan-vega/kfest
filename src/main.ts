import { bootstrapApplication } from '@angular/platform-browser';
import { IMAGE_CONFIG } from '@angular/common';
import { App } from './app/app';

bootstrapApplication(App, {
  providers: [
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true,
        disableImageLazyLoadWarning: true
      }
    }
  ]
})
  .catch((err) => console.error(err));