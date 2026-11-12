import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ImageViewer } from './image-viewer';

describe('ImageViewer', () => {
  beforeEach(async () => {
    // jsdom does not implement native dialog methods; browser QA covers real focus behaviour.
    Object.defineProperties(HTMLDialogElement.prototype, {
      showModal: { configurable: true, value: vi.fn(function(this: HTMLDialogElement) { this.setAttribute('open', ''); }) },
      close: { configurable: true, value: vi.fn(function(this: HTMLDialogElement) { this.removeAttribute('open'); }) }
    });
    await TestBed.configureTestingModule({ imports: [ImageViewer] }).compileComponents();
  });

  function openViewer() {
    const fixture = TestBed.createComponent(ImageViewer);
    fixture.componentRef.setInput('src', 'images/carta/2.png');
    fixture.componentRef.setInput('title', 'Carta · página 2');
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();
    return fixture;
  }

  it('locks scrolling only while open and restores the previous overflow', () => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'clip';
    const fixture = openViewer();
    expect(fixture.nativeElement.querySelector('dialog').open).toBe(true);
    expect(document.body.style.overflow).toBe('hidden');
    fixture.componentRef.setInput('isOpen', false);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('dialog').open).toBe(false);
    expect(document.body.style.overflow).toBe('clip');
    document.body.style.overflow = previous;
  });

  it('fits the image, enlarges actual layout dimensions, clamps zoom and resets it', () => {
    const fixture = openViewer();
    const element = fixture.nativeElement as HTMLElement;
    const image = element.querySelector('img')!;
    const viewport = element.querySelector('.viewer-viewport')!;
    Object.defineProperties(image, { naturalWidth: { value: 1200 }, naturalHeight: { value: 1600 } });
    Object.defineProperties(viewport, { clientWidth: { value: 800 }, clientHeight: { value: 600 } });
    image.dispatchEvent(new Event('load'));
    fixture.detectChanges();
    const fitWidth = parseFloat(image.style.width);
    expect(fitWidth).toBe(426);
    const plus = element.querySelector<HTMLButtonElement>('[aria-label="Aumentar zoom"]')!;
    for (let i = 0; i < 14; i++) { plus.click(); fixture.detectChanges(); }
    expect(element.querySelector('output')?.textContent).toContain('400');
    expect(parseFloat(image.style.width)).toBe(fitWidth * 4);
    expect(plus.disabled).toBe(true);
    element.querySelector<HTMLButtonElement>('.viewer-fit')!.click();
    fixture.detectChanges();
    expect(element.querySelector('output')?.textContent).toContain('100');
    expect(parseFloat(image.style.width)).toBe(fitWidth);
    expect(element.querySelector<HTMLButtonElement>('[aria-label="Reducir zoom"]')?.disabled).toBe(true);
    fixture.componentInstance.setZoom(NaN);
    expect(fixture.componentInstance.zoom).toBe(1);
  });

  it('resets magnification and image errors when the selected page changes', () => {
    const fixture = openViewer();
    fixture.componentInstance.setZoom(3);
    fixture.nativeElement.querySelector('img').dispatchEvent(new Event('error'));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="alert"]')).not.toBeNull();
    fixture.componentRef.setInput('src', 'images/carta/3.png');
    fixture.detectChanges();
    expect(fixture.componentInstance.zoom).toBe(1);
    expect(fixture.componentInstance.imageFailed).toBe(false);
    expect(fixture.nativeElement.querySelector('[role="alert"]')).toBeNull();
  });

  it('navigates with arrows at fit size, leaving arrows for scrolling when enlarged', () => {
    const fixture = openViewer();
    fixture.componentRef.setInput('navigation', true);
    fixture.detectChanges();
    const next = vi.fn();
    fixture.componentInstance.next.subscribe(next);
    const dialog = fixture.nativeElement.querySelector('dialog') as HTMLDialogElement;
    dialog.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    expect(next).toHaveBeenCalledTimes(1);
    fixture.componentInstance.setZoom(2);
    dialog.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('emits close on native Escape cancellation and translates the controls', () => {
    const fixture = openViewer();
    fixture.componentRef.setInput('language', 'en');
    fixture.detectChanges();
    const close = vi.fn();
    fixture.componentInstance.closed.subscribe(close);
    fixture.nativeElement.querySelector('dialog').dispatchEvent(new Event('cancel', { cancelable: true }));
    expect(close).toHaveBeenCalledOnce();
    expect(fixture.nativeElement.querySelector('[aria-label="Close enlarged view"]')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('[aria-label="Zoom in"]')).not.toBeNull();
  });

  it('does not open dialogs or lock body scrolling during SSR', () => {
    TestBed.overrideProvider(PLATFORM_ID, { useValue: 'server' });
    const previous = document.body.style.overflow;
    const fixture = openViewer();
    expect(fixture.nativeElement.querySelector('dialog').open).toBe(false);
    expect(HTMLDialogElement.prototype.showModal).not.toHaveBeenCalled();
    expect(document.body.style.overflow).toBe(previous);
  });

  it('restores scrolling when destroyed while open', () => {
    const previous = document.body.style.overflow;
    const fixture = openViewer();
    fixture.destroy();
    expect(document.body.style.overflow).toBe(previous);
  });
});
