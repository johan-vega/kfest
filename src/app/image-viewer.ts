import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import {
  AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener,
  inject, Input, OnChanges, OnDestroy, Output, PLATFORM_ID, SimpleChanges, ViewChild
} from '@angular/core';

/** Shared, SSR-safe viewer. Native dialog provides focus trapping and focus return. */
@Component({
  selector: 'app-image-viewer',
  standalone: true,
  templateUrl: './image-viewer.html',
  styleUrl: './image-viewer.css'
})
export class ImageViewer implements AfterViewInit, OnChanges, OnDestroy {
  @Input() isOpen = false;
  @Input() src = '';
  @Input() title = '';
  @Input() subtitle = '';
  @Input() language: 'es' | 'en' = 'es';
  @Input() navigation = false;
  @Input() counter = '';
  @Input() whatsAppLink = '';
  @Output() closed = new EventEmitter<void>();
  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @ViewChild('dialog') private dialog?: ElementRef<HTMLDialogElement>;
  @ViewChild('viewport') private viewport?: ElementRef<HTMLDivElement>;
  @ViewChild('image') private image?: ElementRef<HTMLImageElement>;

  zoom = 1;
  fitWidth = 0;
  imageFailed = false;
  dragging = false;
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly document = inject(DOCUMENT);
  private readonly cdr = inject(ChangeDetectorRef);
  private previousOverflow: string | null = null;
  private resizeObserver?: ResizeObserver;
  private zoomFrame: number | null = null;
  private pointerStart: { id: number; x: number; y: number; left: number; top: number } | null = null;

  get zoomPercent(): number { return Math.round(this.zoom * 100); }

  ngAfterViewInit(): void {
    this.syncDialog();
    if (this.browser && typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.measureImage();
        this.cdr.markForCheck();
      });
      this.resizeObserver.observe(this.viewport!.nativeElement);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['src']) {
      this.imageFailed = false;
      this.fitWidth = 0;
      this.resetZoom();
    }
    if (changes['isOpen']) {
      if (this.isOpen) this.resetZoom();
      this.syncDialog();
    }
  }

  private syncDialog(): void {
    if (!this.browser || !this.dialog) return;
    const dialog = this.dialog.nativeElement;
    if (this.isOpen && !dialog.open) {
      this.previousOverflow = this.document.body.style.overflow;
      this.document.body.style.overflow = 'hidden';
      dialog.showModal();
      this.measureImage();
    } else if (!this.isOpen && dialog.open) {
      dialog.close();
      this.unlockScroll();
    }
  }

  onImageLoad(): void {
    this.imageFailed = false;
    this.measureImage();
  }

  @HostListener('window:resize')
  measureImage(): void {
    const image = this.image?.nativeElement;
    const viewport = this.viewport?.nativeElement;
    if (!image?.naturalWidth || !image.naturalHeight || !viewport?.clientWidth || !viewport.clientHeight) return;
    this.fitWidth = Math.max(1, Math.min(viewport.clientWidth - 32,
      (viewport.clientHeight - 32) * image.naturalWidth / image.naturalHeight,
      image.naturalWidth));
  }

  setZoom(value: number): void {
    if (!Number.isFinite(value)) return;
    const next = Math.min(4, Math.max(1, Math.round(value * 4) / 4));
    const viewport = this.viewport?.nativeElement;
    const ratio = next / this.zoom;
    const left = viewport ? (viewport.scrollLeft + viewport.clientWidth / 2) * ratio - viewport.clientWidth / 2 : 0;
    const top = viewport ? (viewport.scrollTop + viewport.clientHeight / 2) * ratio - viewport.clientHeight / 2 : 0;
    this.zoom = next;
    if (this.browser && viewport) {
      if (this.zoomFrame !== null) cancelAnimationFrame(this.zoomFrame);
      this.zoomFrame = requestAnimationFrame(() => {
        viewport.scrollLeft = left;
        viewport.scrollTop = top;
        this.zoomFrame = null;
      });
    }
  }

  resetZoom(): void {
    this.zoom = 1;
    this.pointerStart = null;
    this.dragging = false;
    if (this.zoomFrame !== null && this.browser) cancelAnimationFrame(this.zoomFrame);
    this.zoomFrame = null;
    if (this.viewport) {
      this.viewport.nativeElement.scrollLeft = 0;
      this.viewport.nativeElement.scrollTop = 0;
    }
  }

  onPointerDown(event: PointerEvent): void {
    if (this.zoom <= 1 || event.pointerType !== 'mouse' || event.button !== 0) return;
    const viewport = this.viewport!.nativeElement;
    this.pointerStart = { id: event.pointerId, x: event.clientX, y: event.clientY,
      left: viewport.scrollLeft, top: viewport.scrollTop };
    viewport.setPointerCapture(event.pointerId);
    this.dragging = true;
    event.preventDefault();
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.pointerStart || this.pointerStart.id !== event.pointerId) return;
    const viewport = this.viewport!.nativeElement;
    viewport.scrollLeft = this.pointerStart.left - (event.clientX - this.pointerStart.x);
    viewport.scrollTop = this.pointerStart.top - (event.clientY - this.pointerStart.y);
  }

  onPointerEnd(): void {
    this.pointerStart = null;
    this.dragging = false;
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.navigation && this.zoom === 1 && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
      event.preventDefault();
      event.key === 'ArrowLeft' ? this.previous.emit() : this.next.emit();
    }
    // Do not let the page's catalog shortcuts run behind the modal.
    event.stopPropagation();
  }

  onCancel(event: Event): void {
    event.preventDefault();
    this.closed.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target !== this.dialog?.nativeElement) return;
    const bounds = this.dialog.nativeElement.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) this.closed.emit();
  }

  private unlockScroll(): void {
    if (this.previousOverflow !== null) this.document.body.style.overflow = this.previousOverflow;
    this.previousOverflow = null;
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    if (this.zoomFrame !== null && this.browser) cancelAnimationFrame(this.zoomFrame);
    if (this.dialog?.nativeElement.open) this.dialog.nativeElement.close();
    this.unlockScroll();
  }
}
